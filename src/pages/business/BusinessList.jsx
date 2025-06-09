import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { deleteBusiness, getAllBusinesses } from '../../redux/actions/businessAction';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getActiveBusinessUsers } from '../../redux/actions/userAction';

const BusinessList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const [show, setShow] = useState(false);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);

    const { loading, error, businesses } = useSelector((state) => state.allBusinesses);
    const { loading: activeUsersLoading, businessUsers } = useSelector((state) => state.businessUserReducer);


    const handleClose = () => setShow(false);

    const handleShow = (businessId) => {
        setSelectedBusinessId(businessId);
        setShow(true);
    };

    const deleteBusinessHandler = async () => {
        dispatch(deleteBusiness(selectedBusinessId));
        setShow(false);
        toast.success("Business Deleted Successfully!");
        // dispatch(getAllBusinesses());
        setCurrentPage(1)
    };


    //set global business limit 
    const addGlobalBusinessWallLimit = () => {
        navigate("/global-business-limit")
    }

    useEffect(() => {
        dispatch(getAllBusinesses());
        dispatch(getActiveBusinessUsers()); // Fetch active users
    }, [dispatch]);


    const filteredBusinesses = businesses?.filter((business) =>
        business.business_name.toLowerCase().includes(searchText.toLowerCase()) ||
        business?.user_id?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        business?.user_id?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        business?._id?.toLowerCase().includes(searchText.toLowerCase()) // ID se search
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
            name: 'S.No',
            selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
            sortable: true,
            width: '50px',
        },
        {
            name: 'Business Name',
            selector: (row) => row.business_name || 'N/A',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Owner',
            selector: (row) => row.user_id?.username || 'N/A',
            sortable: true,
            minWidth: '120px',
        },
        {
            name: 'Email',
            selector: (row) => row.user_id?.email || 'N/A',
            sortable: true,
            minWidth: '250px',
        },
        {
            name: 'Like',
            selector: (row) => row.total_like || '0',
            sortable: true,
            minWidth: '10px',
        },
        {
            name: 'Views',
            selector: (row) => row.total_view || '0',
            sortable: true,
            minWidth: '10px',
        },
        {
            name: 'Actions',
            minWidth: '150px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button
                        variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'
                    >
                        <Link to={`/business-details/${row._id}`}>
                            <i className='bi bi-eye-fill fs-18'></i>
                        </Link>
                    </Button>

                    <Button
                        variant='outline-warning'
                        className='focus-ring focus-ring-warning rounded-circle'
                        title='Edit'
                    >
                        <Link to={`/edit-business/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button>

                    <Button
                        variant='outline-danger'
                        className='focus-ring focus-ring-danger rounded-circle'
                        title='Delete'
                        onClick={() => handleShow(row._id)}
                    >
                        <i className='bi bi-trash3-fill'></i>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="BusinessList-page py-3">
            <div className="container-fluid">

                <div className="row mb-1">

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Daily Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{businessUsers?.dailyActiveUsers || 0}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Weekly Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{businessUsers?.weeklyActiveUsers || 0}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>Monthly Active Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{businessUsers?.monthlyActiveUsers || 0}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card shadow-sm border-0 rounded-3 bg-white">
                            <div className="card-body text-center p-3">
                                <h6 className="text-uppercase fw-semibold mb-2" style={{ color: '#6c757d', fontSize: '0.875rem' }}>New Users</h6>
                                <h4 className="fw-bold text-primary mb-0" style={{ fontSize: '1.5rem', color: '#007bff' }}>{businessUsers?.newUsers || 0}</h4>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="BusinessList-wrapper bg-white rounded-3 p-3">
                    <div className="heading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Businesses List - </h5>
                        <Button variant="success" className='px-3' onClick={addGlobalBusinessWallLimit}><i className="bi bi-person-add fs-18 lh-sm"></i> Set Global Business Profile Photo Limit </Button>
                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search businesses..."
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
                                // data={businesses}
                                data={filteredBusinesses}
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
            <Modal
                show={show}
                centered
                onHide={handleClose}
                dialogClassName=""
                contentClassName="border-0 rounded-4"
            >
                <Modal.Body className="text-center px-md-5 py-5">
                    <div
                        className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                        style={{ height: '50px', width: '50px' }}
                    >
                        <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                    </div>
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">
                        Are you sure you want to delete this business?
                    </div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={deleteBusinessHandler}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BusinessList;






// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchCategories, createCategory } from "../actions/categoryActions";
// // import { fetchSubcategories, createSubcategory } from "../actions/subCategoryActions";

// const CategorySubCategoryForm = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const dispatch = useDispatch();
// //   const { categories } = useSelector((state) => state.categories);
// //   const { subcategories } = useSelector((state) => state.subcategories);

// //   useEffect(() => {
// //     dispatch(fetchCategories());
// //   }, [dispatch]);

//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     // dispatch(createCategory(categoryName));
//     setCategoryName("");
//   };

//   const handleAddSubcategory = (e) => {
//     e.preventDefault();
//     if (!selectedCategory) {
//       alert("Please select a category!");
//       return;
//     }
//     // dispatch(createSubcategory(selectedCategory, subcategoryName));
//     // setSubcategoryName("");
//   };

//   return (
//     <div>
//       <h3>Category Management</h3>

//       <form>
//         <input
//           type="text"
//           placeholder="Category Name"
       
//         />
//         <button type="submit">Add Category</button>
//       </form>

//       <h3>Subcategory Management</h3>
//       <form >
//         <select
         
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">Select Category</option>
         
//         </select>

//         <input
//           type="text"
//           placeholder="Subcategory Name"
          
         
//         />
//         <button type="submit">Add Subcategory</button>
//       </form>
//     </div>
//   );
// };

// export default CategorySubCategoryForm;
