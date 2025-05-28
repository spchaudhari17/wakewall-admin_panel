import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { toast } from 'react-toastify';
import { Loader } from '../../lib/loader';
import { createCategory, createSubCategory, deleteCategory, deleteSubCategory, fetchCategories, getCategory, updateCategory } from '../../redux/actions/CategoryAction';

const CategoryList = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [show, setShow] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubCategoryName, setNewSubCategoryName] = useState("");

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [updateName, setUpdateName] = useState("");

    const { loading, error, categories, category } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
       
    }, [dispatch]);

    const fetchUpdatedData = async () => {
        await dispatch(fetchCategories());
    };

    const handleClose = () => setShow(false);

    const handleShow = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShow(true);
    };

    const deleteCategoryHandler = async () => {
        await dispatch(deleteCategory(selectedCategoryId));
        toast.success("Category Deleted Successfully!");
        setShow(false);
        fetchUpdatedData();
        setCurrentPage(1);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewCategoryName("");
    };

    const handleAddModalShow = () => setShowAddModal(true);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.error("Category name cannot be empty.");
            return;
        }

        await dispatch(createCategory(newCategoryName));
        toast.success("Category added successfully!");
        handleAddModalClose();
        setNewCategoryName('');
        await dispatch(fetchCategories());
        setCurrentPage(1);
    };

    // handle subCategory modal and funct
    const handleAddSubCategoryModalClose = () => {
        setShowAddSubCategoryModal(false);
        setNewSubCategoryName("");
    };

    const handleAddSubCategoryModalShow = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShowAddSubCategoryModal(true);
    };

    const handleAddSubCategory = async () => {
        if (!newSubCategoryName.trim()) {
            toast.error("Subcategory name cannot be empty.");
            return;
        }

        dispatch(createSubCategory(selectedCategoryId, newSubCategoryName));
        toast.success("Subcategory added successfully!");
        handleAddSubCategoryModalClose();
        setNewSubCategoryName('');
        setCurrentPage(1);
        fetchUpdatedData();
    };



    //update category modal and function
    const handleUpdateCategoryModalClose = () => setShowUpdateCategoryModal(false);
    const handleUpdateCategoryModalShow = (categoryId, name) => {
        setSelectedCategoryId(categoryId);
        setUpdateName(name);
        setShowUpdateCategoryModal(true);
        dispatch(getCategory(categoryId))
    };

    const handleUpdateCategory = async () => {
        if (!updateName.trim()) {
            toast.error("Category name cannot be empty.");
            return;
        }
        await dispatch(updateCategory(selectedCategoryId, updateName));
        toast.success("Category updated successfully!");
        handleUpdateCategoryModalClose();
        setUpdateName('');
        setCurrentPage(1);
        fetchUpdatedData();
    };
  


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
            name: 'Category Name',
            selector: (row) => row.name || 'N/A',
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Total Subcategories',
            selector: (row) => row.subcategories?.length || 0,
            sortable: true,
        },
        {
            name: 'Actions',
            minWidth: '160px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button
                        variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='Add Subcategory'
                        onClick={() => handleAddSubCategoryModalShow(row._id)}
                    >
                        <i className="bi bi-plus-circle"></i>
                    </Button>

                    {/* <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit'>
                        <Link to={`/edit-category/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button> */}

                    <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit Category' onClick={() => handleUpdateCategoryModalShow(row._id, row.name)}>
                        <i className='bi bi-pencil-square'></i>
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

    const ExpandableSubcategories = ({ data }) => {
        const deleteSubcategoryHandler = async (subCatId) => {
            await dispatch(deleteSubCategory(subCatId));
            toast.success("Subcategory Deleted Successfully!");
            fetchUpdatedData();
        };

        return (
            <div className="expandable-row">
                {data.subcategories.length > 0 ? (
                    <ul className="list-group">
                        {data.subcategories.map((sub, index) => (
                            <li key={sub._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    {index + 1}. {sub.name}
                                </span>
                                <Button
                                    variant="outline-danger"
                                    className="focus-ring focus-ring-danger rounded-circle"
                                    title="Delete Subcategory"
                                    onClick={() => deleteSubcategoryHandler(sub._id)}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-muted">No Subcategories Available</div>
                )}
            </div>
        );
    };

    return (
        <div className="CategoryList-page py-3">
            <div className="container-fluid">
                <div className="CategoryList-wrapper bg-white rounded-3 p-3">
                    <div className="heading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Business Categories with Subcategories</h5>
                        <Button variant="success" className='px-3' onClick={handleAddModalShow}>
                            <i className="bi bi-plus-circle fs-18 lh-sm"></i> Add Category
                        </Button>
                    </div>
                    <div className='table-responsive table-custom-wrapper'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={categories}
                                dense
                                pagination
                                expandableRows
                                expandableRowsComponent={({ data }) => <ExpandableSubcategories data={data} />}
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
                <Modal.Body className="text-center">
                    <div
                        className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                        style={{ height: '50px', width: '50px' }}
                    >
                        <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                    </div>
                    <div className="fs-18 fw-semibold lh-sm mb-3">Are you sure you want to delete this category?</div>
                    <div className="btn-wrapper d-flex justify-content-center gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={deleteCategoryHandler}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add Category Modal */}
            <Modal show={showAddModal} centered onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoryName"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter category name"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Subcategory Modal */}
            <Modal show={showAddSubCategoryModal} centered onHide={handleAddSubCategoryModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Subcategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="subcategoryName" className="form-label">Subcategory Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subcategoryName"
                            value={newSubCategoryName}
                            onChange={(e) => setNewSubCategoryName(e.target.value)}
                            placeholder="Enter subcategory name"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddSubCategoryModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddSubCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* update category modal */}
            <Modal show={showUpdateCategoryModal} centered onHide={handleUpdateCategoryModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="updateCategoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="updateCategoryName"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                            placeholder="Enter updated category name"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateCategoryModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCategory} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CategoryList;
