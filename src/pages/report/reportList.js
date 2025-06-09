import React, { useEffect, useState } from 'react';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReport, getAllReports, reviewReport } from '../../redux/actions/report';
import { toast } from 'react-toastify';

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

    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (userId) => {
        setSelectedUserId(userId);
        setShow(true);
    };


    const handleDeleteReport = async () => {
        dispatch(deleteReport(selectedUserId));
        setShow(false);
        toast.success("User Deleted Successfully!");
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
            selector: (row) => row.is_urgent,
            sortable: true,
            width: '100px',
        },
        // {
        //     name: 'Status',
        //     selector: (row) => row.status,
        //     sortable: true,
        //     width: '120px',
        // },
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
                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShow(row._id)}><i className='bi bi-trash3-fill'></i></Button>
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
                                // onRowClicked={reportDetails}
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
            <Modal show={show} centered onHide={handleClose}>
                <Modal.Body className="text-center px-md-5 py-5">
                    <div
                        className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                        style={{ height: '50px', width: '50px' }}
                    >
                        <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                    </div>
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this report?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={handleDeleteReport}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ReportList;
