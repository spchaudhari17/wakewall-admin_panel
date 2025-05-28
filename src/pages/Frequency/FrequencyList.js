import React, { useEffect, useState } from 'react';
import { Modal, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrequency, createFrequency, deleteFrequency } from '../../redux/actions/frequencyAction';
import { toast } from 'react-toastify';

const FrequencyList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const { frequency, loading, error } = useSelector((state) => state.frequencyReducer);

    useEffect(() => {
        dispatch(getAllFrequency());
    }, [dispatch]);

    // const handleAddFrequency = async () => {
    //     if (!categoryName.trim()) return;
    //     await dispatch(createFrequency(categoryName));

    //     dispatch(getAllFrequency());
    //     setCategoryName("");
    //     setShowModal(false);
    // };

    const handleAddFrequency = async () => {
    if (!categoryName.trim()) return;

    const formattedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
    
    await dispatch(createFrequency(formattedName));
    toast.success("Frequency added successfully!");
    dispatch(getAllFrequency());
    setCategoryName("");
    setShowModal(false);
};



    const handleShowDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };


    const handleCloseDelete = () => {
        setSelectedId(null);
        setShowDeleteModal(false);
    };


    const deleteWallHandler = async () => {
        await dispatch(deleteFrequency(selectedId));
        dispatch(getAllFrequency());
        setShowDeleteModal(false);
        toast.success("Frequency Deleted Successfully!");
        setCurrentPage(1);
    };


    const columns = [
        {
            name: 'Sr. No',
            selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
            width: '100px',
        },
        {
            name: 'Frequency Name',
            selector: (row) => row.name,
            sortable: true,
            minWidth: '700px',
        },
        {
            name: 'Actions',
            minWidth: '150px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShowDelete(row._id)}>
                        <i className='bi bi-trash3-fill'></i>
                    </Button>
                </div>
            ),
        },
    ];

    const customStyles = {
        rows: { style: { fontSize: "14px" } },
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

    const filteredReports = Array.isArray(frequency)
        ? frequency.filter((f) =>
            (f.name?.toLowerCase() || "").includes(searchText.toLowerCase())
        )
        : [];

    return (
        <div className="UsersList-page py-3">
            <div className="container-fluid">
                <div className="ReportsList-wrapper bg-white rounded-3 p-3">
                    <div className="hrading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Frequency List - </h5>

                        <Button variant="success" className='px-3' onClick={() => setShowModal(true)}>
                            <i className="bi bi-person-add fs-18 lh-sm"></i> Add Frequency
                        </Button>

                        {/* <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search reports..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </InputGroup> */}
                    </div>

                    <div className='table-responsive table-custom-wrapper'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={frequency || []}
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

            {/* Modal for Add Frequency */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Frequency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Category Name</Form.Label>
                        <FormControl
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter frequency name"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddFrequency}>Add</Button>
                </Modal.Footer>
            </Modal>



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


        </div>
    );
};

export default FrequencyList;
