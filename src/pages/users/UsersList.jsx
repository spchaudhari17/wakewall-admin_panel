import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteUser } from "../../redux/actions/userAction";
import { Loader } from '../../lib/loader';
import { toast } from 'react-toastify';
import { fecthUsersActiveUsers, fetchDashboardData } from '../../redux/actions/dashboard';


export const UsersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const statistics = useSelector((state) => state.dashboard);
    console.log("statistics ", statistics)

    useEffect(() => {
        dispatch(fetchDashboardData())
        dispatch(fecthUsersActiveUsers())
    }, [])

    const { users, loading, error } = useSelector((state) => state.users);

    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (userId) => {
        setSelectedUserId(userId);
        setShow(true);
    };

    const addNewUser = () => {
        navigate('/add-user');
    };

    const userDetails = (row) => {
        navigate('/user-details', { state: row });
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(selectedUserId));
        setShow(false);
        toast.success("User Deleted Successfully!");

        dispatch(fetchData());
        setCurrentPage(1)
    };

    const addGlobalWallLimit = () => {
        navigate("/global-wall-limit")
    }

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const filteredUsers = users.filter((user) =>
        (user.username?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (user.role?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (user._id?.toString().toLowerCase() || "").includes(searchText.toLowerCase())
    );

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

    const columns = [
        {
            name: 'Sr.No',
            selector: (row, index) => {
                return (currentPage - 1) * rowsPerPage + (index + 1);
            },
            sortable: true,
            width: '100px',
        },
        {
            name: 'User Name',
            selector: (row) => row.username,
            sortable: true,
            minWidth: '170px',
            cell: (row) => (
                <div className='d-flex align-items-center gap-2'>
                    <img src={row.profile_pic || require('../../assets/images/dummy-user.jpeg')} alt="User" className='img-fluid border border-white rounded-circle shadow' style={{ height: '35px', width: '35px' }} />
                    <div className='user-name fw-medium text-capitalize'>{row.username}</div>
                </div>
            ),
        },
        {
            name: 'Email ID',
            selector: (row) => row.email,
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Note Limit',
            selector: (row) => row.dailyNoteLimit || 'N/A',
            sortable: true,
            minWidth: '50px',
        },
        {
            name: 'Reminder Limit',
            selector: (row) => row.dailyReminderLimit || 'N/A',
            sortable: true,
            minWidth: '50px',
        },
        {
            name: 'Role',
            selector: (row) => row.role || 'N/A',
            sortable: true,
            minWidth: '50px',
        },
        {
            name: 'Actions',
            minWidth: '160px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>

                    <Button variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'>
                        <Link to={`/user-details/${row._id}`}>
                            <i className='bi bi-eye-fill fs-18'></i>
                        </Link>
                    </Button>

                    <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit'>
                        <Link to={`/edit-user/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button>

                    {
                        row.role !== 'admin' && (
                            <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShow(row._id)}><i className='bi bi-trash3-fill'></i></Button>
                        )
                    }
                </div>
            ),
        },
    ];

    return (
        <div className="UsersList-page py-3">
            <div className="container-fluid">

                <div className="row mb-1">

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{statistics.activeUsers.daily}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Weekly Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{statistics.activeUsers.weekly}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Monthly Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{statistics.activeUsers.monthly}</h4>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>New Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{statistics.newUsersLast30Days}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="UsersList-wrapper bg-white rounded-3 p-3">
                    <div className="hrading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Users List - </h5>
                        {/* <Button variant="success" className='px-3' onClick={addNewUser}><i className="bi bi-person-add fs-18 lh-sm"></i> Add User</Button> */}
                        <Button variant="success" className='px-3' onClick={addGlobalWallLimit}><i className="bi bi-person-add fs-18 lh-sm"></i> Add Global Wall Limit</Button>

                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search users..."
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
                                // data={users || []}
                                data={filteredUsers || []}
                                // onRowClicked={userDetails}
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
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this user?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
