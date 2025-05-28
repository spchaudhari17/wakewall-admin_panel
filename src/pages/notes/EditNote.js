import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { fetchNoteDetails, fetchNotes, getNote, updateNote } from '../../redux/actions/noteAction';
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from '../../lib/loader';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const EditNode = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

   
    const { loading, note, error } = useSelector((state) => state.allNotes);

 
    const [formValues, setFormValues] = useState({
        note_id:id, 
        title: '',
        description: '',
        image: ''
    });

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNote(formValues))
        toast.success("Update Note Sucessfully !")
        // dispatch(fetchNotes());
        setTimeout(() => {
            navigate("/note-list")
        }, 1000);
        
    };

    useEffect(() => {
        if (id) {
            dispatch(getNote(id))
        }
    }, [dispatch, id]);

    
    useEffect(() => {
        if (note) {
            setFormValues({
                note_id:id, 
                title: note.title || '',
                description: note.description || '',
                image: note.image || ''
            });
        }
    }, [note]);

  
    if (loading) {
        return <Loader />;
    }

  
    if (error) {
        toast.error(error);
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="editNode-page py-3">
                <div className="container-xl">
                    <div className="form-wrapper bg-white w-100 border rounded-4 mx-auto px-3 px-md-5 py-4" style={{ maxWidth: "850px" }}>
                        <Form onSubmit={handleSubmit} className="mt-2 mb-3">
                            <div className="detail-wrapper mb-4">
                                <div className="node-img bg-primary bg-opacity-25 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle shadow position-relative mx-auto mb-4" style={{ height: '110px', width: '110px' }}>
                                    <img src={note?.image || require('../../assets/images/dummy-user.jpeg')} alt="node" className="img-fluid w-100 h-100 rounded-circle object-fit-cover" />
                                    <Form.Group controlId="uploadImage" className="upload-cover position-absolute end-0 bottom-0 z-1">
                                        <Form.Label className="bg-primary d-flex align-items-center justify-content-center rounded-circle pointer m-1" style={{ height: '30px', width: '30px' }}>
                                            <i className="bi bi-pencil-fill text-white"></i>
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            onChange={(e) => setFormValues((prevValues) => ({ ...prevValues, image: e.target.files[0] }))}
                                            hidden
                                        />
                                    </Form.Group>
                                </div>
                                <div className="bg-primary bg-opacity-10 fs-6 fw-semibold mb-3 px-3 py-2 rounded">
                                    <i className="bi bi-node-plus-fill me-1"></i> Edit Node
                                </div>
                                <Row className="g-3">
                                    <Col xs={12}>
                                        <Form.Group controlId="nodeTitle">
                                            <Form.Label>Node Title<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter node title"
                                                name="title"
                                                value={formValues.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="nodeDescription">
                                            <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                placeholder="Enter description"
                                                name="description"
                                                value={formValues.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="btn-wrapper">
                                <Button type="submit" variant="primary" className="w-100 btn-custom">Update Note</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditNode;
