import React, { useEffect, useState } from 'react';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReports, reviewReport } from '../../redux/actions/report';

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
        </div>
    );
};

export default ReportList;
