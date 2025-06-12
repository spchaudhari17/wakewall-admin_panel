import React, { useEffect, useState } from 'react';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReport, getAllReports, reviewReport } from '../../redux/actions/report';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ReportList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const { reports, loading, error } = useSelector((state) => state.reports);

    // Fetch all reports on mount
    useEffect(() => {
        dispatch(getAllReports());
    }, [dispatch]);

    // Handle review button click
    const handleReviewReport = async (reportId) => {
        await dispatch(reviewReport(reportId, "fulfilled"));
        dispatch(getAllReports()); // Refresh list
    };

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // View modal state
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);
    const handleShowViewModal = (report) => {
        setSelectedReport(report);
        setShowViewModal(true);
    };

    const handleDeleteReport = async () => {
        dispatch(deleteReport(selectedUserId));
        setShowDeleteModal(false);
        toast.success("Report Deleted Successfully!");
        await dispatch(getAllReports());
        setCurrentPage(1)
    };

    // Table columns
    const columns = [
        {
            name: 'Sr. No',
            selector: (row, index) => {
                return (currentPage - 1) * rowsPerPage + (index + 1);
            },
            width: '80px',
        },
        {
            name: 'Username',
            selector: (row) => row.user_id?.username || 'N/A',
            sortable: true,
            minWidth: '100px',
        },
        {
            name: 'Title',
            selector: (row) => row.title,
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Report ID',
            selector: (row) => row.report_id,
            sortable: true,
            minWidth: '230px',
        },
        {
            name: 'Report Type',
            selector: (row) => row.report_type,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Urgent?',
            selector: (row) => row.is_urgent ? 'Yes' : 'No',
            sortable: true,
            width: '100px',
        },
        {
            name: 'Action',
            cell: (row) => (
                row.status === 'pending' ? (
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleReviewReport(row._id)}
                    >
                        Pending
                    </Button>
                ) : (
                    <span className="text-muted">Fulfilled</span>
                )
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
            minWidth: "200px",
        },
        {
            name: 'Actions',
            minWidth: '160px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button
                        variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'
                        onClick={() => handleShowViewModal(row)}
                    >
                        <i className='bi bi-eye-fill fs-18'></i>
                    </Button>
                    <Button
                        variant='outline-danger'
                        className='focus-ring focus-ring-danger rounded-circle'
                        title='Delete'
                        onClick={() => handleShowDeleteModal(row._id)}
                    >
                        <i className='bi bi-trash3-fill'></i>
                    </Button>
                </div>
            ),
        },
    ];

    // Table custom style
    const customStyles = {
        rows: {
            style: {
                fontSize: "14px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: '700',
                padding: "12px",
                color: "#fff",
                backgroundColor: 'var(--bs-primary)',
            },
        },
        cells: {
            style: {
                color: '#31373d',
                fontSize: "14px",
                padding: "5px 12px",
            },
        },
    };

    const filteredReports = reports.filter((report) =>
        (report.title?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (report.createdBy?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (report.user_id?.username?.toLowerCase() || "").includes(searchText.toLowerCase()) || // username
        (report.report_id?.toLowerCase() || "").includes(searchText.toLowerCase()) || // reportId
        (report._id?.toString().toLowerCase() || "").includes(searchText.toLowerCase()) // MongoDB _id
    );

    return (
        <div className="UsersList-page py-3">
            <div className="container-fluid">
                <div className="ReportsList-wrapper bg-white rounded-3 p-3">
                    <div className="hrading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Reports List - </h5>
                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search reports..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    <div className='table-responsive table-custom-wrapper'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={filteredReports || []}
                                dense
                                pagination
                                highlightOnHover
                                responsive
                                customStyles={customStyles}
                                noDataComponent={<NoDataComponent />}
                                onChangePage={(page) => setCurrentPage(page)}
                                onChangeRowsPerPage={(perPage) => setRowsPerPage(perPage)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} centered onHide={handleCloseDeleteModal}>
                <Modal.Body className="text-center px-md-5 py-5">
                    <div
                        className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                        style={{ height: '50px', width: '50px' }}
                    >
                        <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                    </div>
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this report?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={handleDeleteReport}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* View Modal */}
            <Modal show={showViewModal} centered onHide={handleCloseViewModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Report Details</Modal.Title>
                </Modal.Header>


                


                <Modal.Body>
                    {selectedReport && (
                        <div className="report-details row">
                            {/* Left Side - Reporter */}
                            <div className="col-md-6 border-end">
                                <h6 className="fw-bold mb-3">Reporter</h6>

                                <p><strong>Full Name:</strong> {selectedReport.user_id?.full_name || 'N/A'}</p>
                                <p><strong>Username:</strong> {selectedReport.user_id?.username || 'N/A'}</p>
                                <p><strong>Email:</strong> {selectedReport.user_id?.email || 'N/A'}</p>
                                <p><strong>Title:</strong> {selectedReport.title}</p>
                                <p><strong>Description:</strong></p>
                                <div className="border p-2 rounded bg-light">{selectedReport.description}</div>
                                <p className="mt-3"><strong>Is Urgent:</strong> {selectedReport.is_urgent ? 'Yes' : 'No'}</p>
                                <p><strong>Status:</strong> {selectedReport.status}</p>
                                <p><strong>Report Type:</strong> {selectedReport.report_type}</p>
                                <p><strong>Created At:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>
                            </div>

                            {/* Right Side - Reported Against */}
                            <div className="col-md-6">
                                <h6 className="fw-bold mb-3">Reported Against</h6>
                                {selectedReport.report_type === 'user' && selectedReport.reported_user ? (
                                    <>
                                        <p><strong>Full Name:</strong> {selectedReport.reported_user.full_name}</p>
                                        <p><strong>Username:</strong> {selectedReport.reported_user.username}</p>
                                        <p><strong>User ID:</strong> {selectedReport.reported_user._id}</p>
                                        {/* <p><strong>Report ID:</strong> {selectedReport.report_id}</p> */}
                                        <Link to={`/user-details/${selectedReport.reported_user._id}`} className="text-primary fw-medium fs-12">
                                            View User Details
                                        </Link>

                                        <div className="mb-3">
                                            <img
                                                // src={selectedReport.reported_user.profile_pic}
                                                src={
                                                    selectedReport.reported_user.profile_pic
                                                        ? selectedReport.reported_user.profile_pic
                                                        : require('../../assets/images/dummy_profile.png')
                                                }
                                                alt="Reporter"
                                                className="img-fluid rounded"
                                                style={{ maxWidth: "150px", height: "auto" }}
                                            />
                                        </div>

                                    </>
                                ) : selectedReport.report_type === 'business' && selectedReport.reported_business ? (
                                    <>
                                        <p><strong>Business Name:</strong> {selectedReport.reported_business.business_name}</p>
                                        <p><strong>Username:</strong> {selectedReport.reported_business.business_username}</p>
                                        <p><strong>Business ID:</strong> {selectedReport.reported_business._id}</p>
                                        {/* <p><strong>Report ID:</strong> {selectedReport.report_id}</p> */}
                                        <Link to={`/business-details/${selectedReport.reported_business._id}`} className="text-primary fw-medium fs-12">
                                            View Business Details
                                        </Link>

                                        <div className="mb-3">
                                            <img
                                                src={
                                                    selectedReport.reported_business?.profile_pic
                                                        ? selectedReport.reported_business.profile_pic
                                                        : require('../../assets/images/dummy_profile.png')
                                                }
                                                alt="Reporter"
                                                className="img-fluid rounded"
                                                style={{ maxWidth: "150px", height: "auto" }}
                                            />
                                        </div>
                                    </>
                                ) : selectedReport.report_type === 'wall' && selectedReport.reported_wall ? (
                                    <>
                                        <p><strong>Wall Title:</strong> {selectedReport.reported_wall.title}</p>
                                        <p><strong>Wall Details:</strong></p>
                                        <div className="border p-2 rounded bg-light">{selectedReport.reported_wall.details}</div>
                                        <p className="mt-3"><strong>Wall ID:</strong> {selectedReport.reported_wall._id}</p>
                                        <p><strong>Wall Type:</strong> {selectedReport.reported_wall.wall_type}</p>
                                        {/* <p><strong>Report ID:</strong> {selectedReport.report_id}</p> */}
                                        <p><strong>Created By User:</strong> {selectedReport.reported_wall.user_id.username}</p>
                                        <Link to={`/wall-details/${selectedReport.reported_wall._id}`} className="text-primary fw-medium fs-12">
                                            View Wall Details
                                        </Link> <br />
                                        <Link to={`/user-details/${selectedReport.reported_wall.user_id._id}`} className="text-primary fw-medium fs-12">
                                            View User Details
                                        </Link>

                                        <div className="mb-3">
                                            <img
                                                // src={selectedReport.reported_wall.file}
                                                src={
                                                    selectedReport.reported_wall.file
                                                        ? selectedReport.reported_wall.file
                                                        : require('../../assets/images/dummy_profile.png')
                                                }
                                                alt="Reporter"
                                                className="img-fluid rounded"
                                                style={{ maxWidth: "150px", height: "auto" }}
                                            />
                                        </div>

                                    </>
                                ) : (
                                    <p className="text-muted">No data available</p>
                                )}
                            </div>
                        </div>
                    )}
                </Modal.Body>



                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>
                        Close
                    </Button>
                </Modal.Footer> */}


            </Modal>



        </div>
    );
};

export default ReportList;