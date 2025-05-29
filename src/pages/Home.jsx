import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PatientsChart from '../components/PatientsChart';
import MonthlyRevenueChart from '../components/MonthlyRevenueChart';
// import PetTypeChart from '../components/PetTypeChart';
import { NoDataComponent } from '../components/NoDataComponent';
import { useSelector, useDispatch } from "react-redux"
import { fecthUsersActiveUsers, fetchDashboardData } from '../redux/actions/dashboard';
import { Link } from "react-router-dom"
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteWall, fetchWallList } from '../redux/actions/wallAction';
import { useNavigate } from "react-router-dom";
import { fetchCategories } from '../redux/actions/CategoryAction';

export const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const statistics = useSelector((state) => state.dashboard);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedWallId, setSelectedWallId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { loading, error, categories } = useSelector((state) => state.category);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [navigate, user]);

    const { walls } = useSelector((state) => state.allWalls);
    // console.log("statistics ", statistics)

    const topCategories = categories.slice(0, 10).map((category) => ({
        name: category.name,
        subcategoryCount: category.subcategories.length, // Assuming 'subcategories' is an array
        totalItems: category.totalItems, // Example additional field
    }));

    useEffect(() => {
        dispatch(fetchDashboardData())
        dispatch(fecthUsersActiveUsers())
        dispatch(fetchCategories())
        dispatch(fetchWallList())
    }, [])

    const handleShowDelete = (wallId) => {
        setSelectedWallId(wallId);
        setShowDeleteModal(true);
    };



    const handleCloseDelete = () => {
        setSelectedWallId(null);
        setShowDeleteModal(false);
    };


    //delete wall 
    const deleteWallHandler = async () => {
        dispatch(deleteWall(selectedWallId));
        setShowDeleteModal(false);
        toast.success("Wall Deleted Successfully!");
        setCurrentPage(1);
    };


    const limitedWalls = walls.slice(0, 5);


    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Title',
            selector: (row) => row.title || 'N/A',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Details',
            selector: (row) => row.details || 'N/A',
            sortable: true,
            minWidth: '180px',
        },
        {
            name: 'Username',
            selector: (row) => row.user_id?.username || 'N/A',
            sortable: true,
            minWidth: '130px',
        },
        // {
        //     name: 'Type',
        //     selector: (row) => row.media_type || 'N/A',
        //     sortable: true,
        //     minWidth: '100px',
        // },

        {
            name: 'Actions',
            minWidth: '150px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'>
                        <Link to={`/wall-details/${row._id}`}>
                            <i className='bi bi-eye-fill fs-18'></i>
                        </Link>
                    </Button>
                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShowDelete(row._id)}>
                        <i className='bi bi-trash3-fill'></i>
                    </Button>
                </div>
            ),
        },

    ];


    // Style Customization for Data Table
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

    return (
        <div className="homePage py-3">
            <div className="container-fluid">
                <section className="info-card-sec mb-3">
                    {/* <div className="fs-5 fw-bold mb-2">Dashboard</div> */}
                    <div className="row g-2 g-md-3">
                        <div className="col-sm-6 col-xl-3">
                            <div className="card-1 bg-white rounded-3 pointer h-100 p-3 py-xl-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="card-icon bg-primary bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-bar-chart text-primary fs-4"></i>
                                    </div>

                                    <div className="card-details">
                                        <div className="label-value fs-18 fw-semibold lh-1 mb-1">{statistics.totalUsers}</div>
                                        <div className="label-title text-secondary text-opacity-75 fs-14 fw-medium lh-sm mb-1">Total Users</div>
                                        <div className="fs-14 d-flex flex-wrap column-gap-2">
                                            <div className="progress-points d-flex gap-1 text-green"><i className="bi bi-graph-up-arrow"></i> 4.07%</div>
                                            <div className="month text-secondary text-opacity-75">Last Month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card-2 bg-white rounded-3 pointer h-100 p-3 py-xl-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="card-icon bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-file-earmark text-warning fs-4"></i>
                                    </div>

                                    <div className="card-details">
                                        <div className="label-value fs-18 fw-semibold lh-1 mb-1">{statistics.newUsersLast30Days}</div>
                                        <div className="label-title text-secondary text-opacity-50 fs-14 fw-medium lh-sm mb-1">Total New Users Last 30Days</div>
                                        <div className="fs-14 d-flex flex-wrap column-gap-2">
                                            <div className="progress-points d-flex gap-1 text-green"><i className="bi bi-graph-up-arrow"></i> 0.24%</div>
                                            <div className="month text-secondary text-opacity-75">Last Month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card-3 bg-white rounded-3 pointer h-100 p-3 py-xl-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="card-icon d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-file-earmark fs-4"></i>
                                    </div>

                                    <div className="card-details">
                                        <div className="label-value fs-18 fw-semibold lh-1 mb-1">{statistics.totalBusinesses}</div>
                                        <div className="label-title text-secondary text-opacity-50 fs-14 fw-medium lh-sm mb-1">Total Businesses</div>
                                        <div className="fs-14 d-flex flex-wrap column-gap-2">
                                            <div className="progress-points d-flex gap-1 text-danger"><i className="bi bi-graph-up-arrow"></i> 0.24%</div>
                                            <div className="month text-secondary text-opacity-75">Last Month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card-4 bg-white rounded-3 pointer h-100 p-3 py-xl-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="card-icon d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-feather2 text-green fs-3" style={{ transform: 'rotate(45deg)' }}></i>
                                    </div>

                                    <div className="card-details">
                                        <div className="label-value fs-18 fw-semibold lh-1 mb-1">{statistics.newBusinessesLast30Days}</div>
                                        <div className="label-title text-secondary text-opacity-50 fs-14 fw-medium lh-sm mb-1">Total New Businesses Last 30 Days</div>
                                        <div className="fs-14 d-flex flex-wrap column-gap-2">
                                            <div className="progress-points d-flex gap-1 text-warning"><i className="bi bi-graph-up-arrow"></i> 0.00%</div>
                                            <div className="month text-secondary text-opacity-75">Last Month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booked Appointment section */}
                <section className="doctors-list-wrapper">
                    <div className="row g-3">
                        <div className="col-xl-8 col-xxl-9">
                            <div className="chart-wrapper card border-0 mb-3">
                                <div className="fs-18 fw-bold p-3 pb-0">User Statistics - <span className='fs-6 d-block'>Jan - Dec</span></div>
                                <PatientsChart />
                            </div>
                            <div className="card border-0 p-3">
                                {/* <h5 className="fs-18 fw-bold">Patients List - </h5> */}
                                <div className='table-responsive table-custom-wrapper'>
                                    <DataTable
                                        columns={columns}
                                        data={limitedWalls}
                                        // selectableRows
                                        // striped
                                        dense
                                        pagination
                                        highlightOnHover
                                        responsive
                                        customStyles={customStyles}
                                        noDataComponent={<NoDataComponent />}

                                    />
                                    <div className="">
                                        <Link to="/walls-list" className="text-primary fw-medium fs-12">
                                            View All Media
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-xxl-3">
                            <div className="chart-wrapper card border-0 mb-3" style={{ backgroundColor: '#5f2eea' }}>
                                <div className="text-light fs-18 fw-bold p-3 pb-0">New Customers <span className='fs-6 d-block'>28 Daily Avg.</span> </div>
                                <MonthlyRevenueChart />
                            </div>
                            <div className="card border-0 p-3">
                                <div className="header mb-2">
                                    <div className="title fs-6 fw-bold">Top Categories</div>
                                    <div className="subtitle fs-12 fw-medium text-secondary">{categories.length} Categories</div>
                                </div>
                                <div className="card-wrapper">
                                    {topCategories.map((category, index) => (
                                        <div key={index} className="data-card fs-12 border-bottom mt-2 pb-2">
                                            <div className="data-label d-flex flex-wrap align-items-center justify-content-between gap-2 text-body fw-medium">
                                                <span className="fw-semibold">{category.name}</span>
                                                <span className="bg-primary bg-opacity-10 text-primary fs-10 fw-medium rounded-1 px-1">
                                                    +{category.subcategoryCount}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Link to="/category-list" className="text-primary fw-medium fs-12">
                                        View All Categories
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>




                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} centered onHide={handleCloseDelete} dialogClassName="" contentClassName="border-0 rounded-4">
                        <Modal.Body className="text-center px-md-5 py-5">
                            <div
                                className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                                style={{ height: '50px', width: '50px' }}
                            >
                                <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                            </div>
                            <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this wall?</div>
                            <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                                <Button variant="secondary" className="px-4 py-2" onClick={handleCloseDelete}>
                                    Cancel
                                </Button>
                                <Button variant="danger" className="px-4 py-2" onClick={deleteWallHandler}>
                                    Delete
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>


                </section>
            </div>
        </div>






    )
}
