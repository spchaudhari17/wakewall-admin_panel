import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { deleteWall, fetchWallList, deleteWallFile, updateWallFile } from '../../redux/actions/wallAction';
import { Loader } from '../../lib/loader';
import { NoDataComponent } from '../../components/NoDataComponent';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';

const WallList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [selectedWallId, setSelectedWallId] = useState(null);

    const { loading, error, walls } = useSelector((state) => state.allWalls);

    const handleShowFilePreview = (file, type, wallId) => {
        setSelectedFile(file);
        setSelectedFileType(type);
        setShowFilePreviewModal(true);
        setSelectedWallId(wallId);
    };

    const handleCloseFilePreview = () => {
        setSelectedFile(null);
        setSelectedFileType(null);
        setShowFilePreviewModal(false);
        setSelectedWallId(null);
    };

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


    // delete only image and video 
    const deleteMediaHandler = async () => {
        console.log("selectedWallId", selectedWallId)
        if (!selectedWallId) return;


        dispatch(deleteWallFile(selectedWallId))
            .then(() => {
                toast.success("Media deleted successfully!");
                handleCloseFilePreview();
            })
            .catch(() => {
                toast.error("Failed to delete media.");
            });
    };

    //update image and video 
    const handleMediaUpdate = (wallId, fileType) => {
        if (!wallId) {
            toast.error("No wall selected for update.");
            return;
        }

        const fileInput = document.createElement("input");
        fileInput.type = "file";

        // Set accept based on fileType
        if (fileType === "image") {
            fileInput.accept = "image/*";
        } else if (fileType === "video") {
            fileInput.accept = "video/*";
        } else {
            fileInput.accept = "*/*";
        }

        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) {
                toast.error("No file selected.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("wallId", wallId);

                dispatch(updateWallFile(wallId, file));

                toast.success("Media updated successfully!");
                handleCloseFilePreview();
            } catch (error) {
                toast.error("Failed to update media.");
            }
        };

        fileInput.click();
    };



    useEffect(() => {
        dispatch(fetchWallList());
    }, [dispatch]);



    const filteredWalls = walls.filter((wall) =>
        wall.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        wall.details?.toLowerCase().includes(searchText.toLowerCase()) ||
        (wall.user_id?.username?.toLowerCase().includes(searchText.toLowerCase()))
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
            width: '100px',
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
            minWidth: '200px',
        },
        {
            name: 'Username',
            // selector: (row) => row.user_id.email || 'N/A',
            selector: (row) => row.user_id && row.user_id.username ? row.user_id.username : 'N/A',
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Type',
            selector: (row) => row.media_type || 'N/A',
            sortable: true,
            minWidth: '100px',
        },
        {
            name: 'File',
            selector: (row) => (
                row.file ? (
                    <Button
                        variant="link"
                        onClick={() => handleShowFilePreview(row.file, row.media_type, row._id)}
                        className="p-0"
                    >
                        Preview File
                    </Button>
                ) : 'N/A'
            ),
            sortable: false,
            minWidth: '100px',
        },
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
                    {/* <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle' title='Edit'>
                        <Link to={`/edit-wall/${row._id}`}>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                    </Button> */}
                    <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle' title='Delete' onClick={() => handleShowDelete(row._id)}>
                        <i className='bi bi-trash3-fill'></i>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="WallList-page py-3">
            <div className="container-fluid">
                <div className="WallList-wrapper bg-white rounded-3 p-3">
                    <div className="heading-wrapper d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <h5 className="fw-bold m-0">All Walls</h5>
                        <InputGroup className="search-bar">
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="Search walls..."
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
                                // data={walls}
                                data={filteredWalls}
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

            {/* File Preview Modal */}
            <Modal show={showFilePreviewModal} onHide={handleCloseFilePreview} centered>
                <Modal.Body>
                    {selectedFileType === 'image' ? (
                        <img src={selectedFile} alt="Preview" className="img-fluid" />
                    ) : selectedFileType === 'video' ? (
                        <video controls className="w-100">
                            <source src={selectedFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div>Unsupported file type</div>
                    )}
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleCloseFilePreview}>
                        Close
                    </Button>
                    <div>
                        <Button variant='outline-warning' className='focus-ring focus-ring-warning rounded-circle  me-2' title='Update Image/Video'
                            onClick={() => handleMediaUpdate(selectedWallId, selectedFileType)} >

                            <i className='bi bi-pencil-square'></i>

                        </Button>
                        <Button variant='outline-danger' className='focus-ring focus-ring-danger rounded-circle ' title='Delete Image/Video' onClick={deleteMediaHandler}>
                            <i className='bi bi-trash3-fill'></i>
                        </Button>
                    </div>
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

export default WallList;
