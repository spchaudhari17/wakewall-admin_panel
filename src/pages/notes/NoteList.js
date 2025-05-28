import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { Loader } from '../../lib/loader';
import { fetchNotes, deleteNote } from '../../redux/actions/noteAction';


const NoteList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");

    const [show, setShow] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const { loading, error, notes } = useSelector((state) => state.allNotes);

    const handleClose = () => setShow(false);

    const handleShow = (noteId) => {
        setSelectedNoteId(noteId);
        setShow(true);
    };

    const deleteNoteHandler = async () => {
        dispatch(deleteNote(selectedNoteId))
        setShow(false);
        toast.success("Note Deleted Sucessfully!")

        // dispatch(fetchNotes());
        setCurrentPage(1)
    };

    const addGlobalLimit = () => {
        navigate("/global-note-limit")
    }

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);


    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.description.toLowerCase().includes(searchText.toLowerCase()) ||
        (note.user_id?.username || "N/A").toLowerCase().includes(searchText.toLowerCase())
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
                return (currentPage - 1) * rowsPerPage + (index + 1); // Calculate S.No based on current page and rows per page
            },
            sortable: true,
            width: '70px',
        },
        {
            name: 'Title',
            selector: (row) => row.title || 'N/A',
            sortable: true,
            minWidth: '180px',
        },
        {
            name: 'Username',
            selector: (row) => row.user_id?.username || 'N/A',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Description',
            selector: (row) => row.description || 'N/A',
            sortable: true,
            minWidth: '240px',
        },
        {
            name: 'Total Views',
            selector: (row) => row.total_view || 0,
            sortable: true,
            minWidth: '10px',
        },
        {
            name: 'Total Likes',
            selector: (row) => row.total_like || 0,
            sortable: true,
            minWidth: '10px',
        },
        {
            name: 'Actions',
            minWidth: '160px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    {/* <Link
                        to={`/note-details/${row._id}`}
                        className='btn btn-outline-success focus-ring focus-ring-success rounded-circle'
                        title='View'
                    >
                        <i className='bi bi-eye-fill fs-18'></i>
                    </Link>

                    <Link
                        to={`/edit-note/${row._id}`}
                        className='btn btn-outline-warning focus-ring focus-ring-warning rounded-circle'
                        title='Edit'
                    >
                        <i className='bi bi-pencil-square'></i>
                    </Link>

                    <Button
                        variant='outline-danger'
                        className='focus-ring focus-ring-danger rounded-circle'
                        title='Delete'
                        onClick={() => handleShow(row._id)}
                    >
                        <i className='bi bi-trash3-fill'></i>
                    </Button> */}

                    <Button variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'>
                        <Link to={`/note-details/${row._id}`}>
                            <i className='bi bi-eye-fill fs-18'></i>
                        </Link>
                    </Button>

                    <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit'>
                        <Link to={`/edit-note/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button>

                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShow(row._id)}><i className='bi bi-trash3-fill'></i></Button>


                </div>
            ),
        },
    ];

    return (
        <div className="NoteList-page py-3">
            <div className="container-fluid">
                <div className="NoteList-wrapper bg-white rounded-3 p-3">
                    <div className="hrading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Notes</h5>
                        <Button variant="success" className='px-3' onClick={addGlobalLimit}><i className="bi bi-person-add fs-18 lh-sm"></i> Add Global Note Limit</Button>

                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search notes..."
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
                                // data={notes}
                                data={filteredNotes}
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
            <Modal show={show} centered onHide={handleClose} dialogClassName="" contentClassName="border-0 rounded-4">
                <Modal.Body className="text-center px-md-5 py-5">
                    <div
                        className="icon-cover d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-3"
                        style={{ height: '50px', width: '50px' }}
                    >
                        <i className="bi bi-exclamation-triangle fs-4 text-danger"></i>
                    </div>
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this note?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={deleteNoteHandler}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NoteList;
