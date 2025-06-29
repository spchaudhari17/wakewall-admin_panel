import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { deleteAnnouncement, fetchAnnouncementList } from '../../redux/actions/announcement';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Loader } from '../../lib/loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnnouncementList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
    const [show, setShow] = useState(false);

    const { announcements, loading, error } = useSelector((state) => state.announcementReducer);

    useEffect(() => {
        dispatch(fetchAnnouncementList());
    }, [dispatch]);

    const handleClose = () => setShow(false);

    const handleShow = (annoucementId) => {
        setSelectedAnnouncementId(annoucementId);
        setShow(true);
    };

    const addGlobalLimit = () => {
        navigate("/app-anouncement")
    }

    const deleteAnnouncementHandler = async () => {
        console.log(selectedAnnouncementId)
        dispatch(deleteAnnouncement(selectedAnnouncementId))
        setShow(false);
        toast.success("Announcement Deleted Sucessfully!")

        // dispatch(fetchNotes());
        setCurrentPage(1)
    };

    const filteredAnnouncements = announcements?.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.body.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase())
    );

    const customStyles = {
        rows: {
            style: { fontSize: '14px' }
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '700',
                padding: '12px',
                color: '#fff',
                backgroundColor: 'var(--bs-primary)'
            }
        },
        cells: {
            style: {
                color: '#31373d',
                fontSize: '14px',
                padding: '5px 12px'
            }
        }
    };

    const columns = [
        {
            name: 'Sr.No',
            selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
            width: '70px'
        },
        {
            name: 'Title',
            selector: (row) => row.title || 'N/A',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Body',
            selector: (row) => row.body || 'N/A',
            sortable: true,
            minWidth: '300px'
        },
        {
            name: 'Annoucement Type',
            selector: (row) => row.type || 'N/A',
            sortable: true,
            width: '180px'
        },
        {
            name: 'Created At',
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
            minWidth: '180px'
        },

        {
            name: 'Actions',
            minWidth: '50px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>
                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShow(row._id)}><i className='bi bi-trash3-fill'></i></Button>
                </div>
            ),
        },
    ];

    return (
        <div className="AnnouncementList-page py-3">
            <div className="container-fluid">
                <div className="AnnouncementList-wrapper bg-white rounded-3 p-3">
                    <div className="heading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Announcements</h5>
                        <Button variant="success" className='px-3' onClick={addGlobalLimit}><i className="bi bi-person-add fs-18 lh-sm"></i> Send All Users Announcement</Button>

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

                    <div className="table-responsive table-custom-wrapper">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <div className="text-danger">{error}</div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={filteredAnnouncements}
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
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this announcement?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={deleteAnnouncementHandler}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AnnouncementList;
