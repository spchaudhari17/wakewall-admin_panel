import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { NoDataComponent } from "../components/NoDataComponent";
import { fetchAllActivityLogs } from "../redux/actions/userAction";
import { Loader } from "../lib/loader";

const UsersActivityLogs = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { loading, error, activityLogs } = useSelector((state) => state.activityLogs);

    useEffect(() => {
        dispatch(fetchAllActivityLogs());
    }, [dispatch]);


    const customStyles = {
        rows: {
            style: {
                fontSize: "14px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "700",
                padding: "12px",
                color: "#fff",
                backgroundColor: "var(--bs-primary)",
            },
        },
        cells: {
            style: {
                color: "#31373d",
                fontSize: "14px",
                padding: "5px 12px",
            },
        },
    };


    const columns = [
        {
            name: 'Sr.No',
            selector: (row, index) => {
                return (currentPage - 1) * rowsPerPage + (index + 1); // Calculate S.No based on current page and rows per page
            },
            sortable: true,
            width: '100px',
        },
        {
            name: "Username",
            selector: (row) => row.userDetails?.username || "N/A",
            sortable: true,
            minWidth: "150px",
            cell: (row) => (
                <div className='d-flex align-items-center gap-2'>
                    <img src={row.profile_pic || require('./../assets/images/dummy-user.jpeg')} alt="User" className='img-fluid border border-white rounded-circle shadow' style={{ height: '35px', width: '35px' }} />
                    <div className='user-name fw-medium text-capitalize'>{row.userDetails?.username || "N/A"}</div>
                </div>
            ),
        },
        {
            name: "Email",
            selector: (row) => row.userDetails?.email || "N/A",
            sortable: true,
            minWidth: "100px",
        },
        // {
        //     name: "Username",
        //     selector: (row) => row.userDetails?.username || "N/A",
        //     sortable: true,
        //     minWidth: "100px",
        // },
        {
            name: "Action",
            selector: (row) => row.action,
            sortable: true,
            minWidth: "100px",
        },
        {
            name: "Action Details",
            selector: (row) => row.action_details,
            sortable: true,
            minWidth: "100px",
            cell: (row) => (
                <div title={row.action_details} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {row.action_details?.slice(0, 50) + (row.action_details?.length > 50 ? "..." : "") || "N/A"}
                </div>
            ),
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
            minWidth: "200px",
        },
    ];


    return (
        <div className="UsersList-page py-3">
            <div className="container-fluid">
                <div className="UsersList-wrapper bg-white rounded-3 p-3">
                    <div className="hrading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Users Activity Logs</h5>
                    </div>
                    <div className="table-responsive table-custom-wrapper">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <p className="text-danger">Failed to load activity logs: {error}</p>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={activityLogs || []}
                                customStyles={customStyles}
                                pagination
                                highlightOnHover
                                responsive
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

export default UsersActivityLogs;
