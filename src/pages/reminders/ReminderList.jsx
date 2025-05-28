import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { deleteReminder, fetchReminders } from '../../redux/actions/reminderAction';
import { NoDataComponent } from '../../components/NoDataComponent';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"
import { Loader } from '../../lib/loader';

const ReminderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [show, setShow] = useState(false);
    const [selectedReminderId, setSelectedReminderId] = useState(null);

    const { loading, error, reminders } = useSelector((state) => state.allReminders);
    console.log("reminders -", reminders)
    console.log("reminders error -", error)


    const handleClose = () => setShow(false);

    const handleShow = (reminderId) => {
        setSelectedReminderId(reminderId);
        setShow(true);
    };

    const deleteReminderHandler = async () => {

        dispatch(deleteReminder(selectedReminderId));
        setShow(false);
        toast.success("Reminder Deleted Successfully!");

        // dispatch(fetchReminders());

        console.log()
        setCurrentPage(1)
    };

    const addGlobalReminderLimit = () => {
        navigate("/global-reminder-limit")
    }

    useEffect(() => {
        dispatch(fetchReminders());
    }, [dispatch]);



    const filteredReminders = reminders.filter((reminder) =>
        (reminder.reminder_title?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (reminder.reminder_description?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (reminder.userDetails?.username?.toLowerCase() || "").includes(searchText.toLowerCase())
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
            name: 'Title',
            selector: (row) => row.reminder_title || 'N/A',
            sortable: true,
            minWidth: '200px',
        },
        {
            name: 'Username',
            selector: (row) => row?.userDetails?.username || 'N/A',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Description',
            selector: (row) => row.reminder_description || 'N/A',
            sortable: true,
            minWidth: '250px',
        },
        // {
        //     name: 'Sub Category',
        //     selector: (row) => row.sub_category || 'N/A',
        //     sortable: true,
        //     minWidth: '150px',
        // },
        {
            name: 'Frequency',
            selector: (row) => row.frequency || 'N/A',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Actions',
            minWidth: '160px',
            cell: (row) => (
                <div className='action-wrapper d-flex flex-wrap gap-2'>

                    <Button variant='outline-success'
                        className='focus-ring focus-ring-success rounded-circle'
                        title='View'>
                        <Link to={`/reminder-details/${row._id}`}>
                            <i className='bi bi-eye-fill fs-18'></i>
                        </Link>
                    </Button>

                    <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit'>
                        <Link to={`/edit-reminder/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button>

                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShow(row._id)}><i className='bi bi-trash3-fill'></i></Button>

                </div>
            ),
        },
    ];

    return (
        <div className="ReminderList-page py-3">
            <div className="container-fluid">
                <div className="ReminderList-wrapper bg-white rounded-3 p-3">
                    <div className="heading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Reminders</h5>
                        <Button variant="success" className='px-3' onClick={addGlobalReminderLimit}><i className="bi bi-person-add fs-18 lh-sm"></i> Add Global Reminder Limit</Button>
                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search reminders..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                    <div className='table-responsive table-custom-wrapper'>
                        {loading ? (
                            <Loader />
                        )
                            : (
                                <DataTable
                                    columns={columns}
                                    // data={reminders}
                                    data={filteredReminders}
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
                    <div className="fs-18 fw-semibold lh-sm mb-3 pb-1">Are you sure you want to delete this reminder?</div>
                    <div className="btn-wrapper d-flex flex-wrap justify-content-center gap-2">
                        <Button variant="secondary" className="px-4 py-2" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4 py-2" onClick={deleteReminderHandler}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ReminderList;

