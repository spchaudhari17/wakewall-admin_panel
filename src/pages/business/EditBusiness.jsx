import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getBusiness, updateBusiness } from '../../redux/actions/businessAction';
import { Loader } from '../../lib/loader';
import { toast } from 'react-toastify';
import PlaceholderImage from "../../assets/images/bg-banner1.jpg";

const EditBusiness = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, business, error } = useSelector((state) => state.allBusinesses);

    const [formData, setFormData] = useState({
        business_id: id,
        business_name: '',
        business_username: '',
        business_type: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(getBusiness(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (business) {
            setFormData({
                business_id: id,
                business_name: business.business_name || '',
                business_username: business.business_username || '',
                business_type: business.business_type || '',
                description: business.description || '',
            });
        }
    }, [business]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateBusiness(formData));

        toast.success("Business updated successfully!");

        setTimeout(() => {
            navigate("/business-list");
        }, 1000);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="addUser-page py-3">
                <div className="container-xl">
                    <div className="form-wrapper bg-white w-100 border rounded-4 mx-auto px-3 px-md-5 py-4" style={{ maxWidth: "850px" }}>
                        <Form onSubmit={handleSubmit} className="mt-2 mb-3">
                            <div className="detail-wrapper mb-4">
                                <div className="user-img bg-primary bg-opacity-25 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle shadow position-relative mx-auto mb-4" style={{ height: '110px', width: '110px' }}>
                                    <img src={business?.profile_pic || PlaceholderImage} alt="business" className="img-fluid w-100 h-100 rounded-circle object-fit-cover" />
                                </div>
                                <div className="bg-primary bg-opacity-10 fs-6 fw-semibold mb-3 px-3 py-2 rounded">
                                    <i className="bi bi-briefcase-fill me-1"></i> Edit Business
                                </div>
                                <Row className="g-3">
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="businessName">
                                            <Form.Label>Business Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter business name"
                                                name="business_name"
                                                value={formData.business_name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="businessUsername">
                                            <Form.Label>Business Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter business username"
                                                name="business_username"
                                                value={formData.business_username}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="businessType">
                                            <Form.Label>Business Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter business type"
                                                name="business_type"
                                                value={formData.business_type}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"

                                                placeholder="Enter business description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </div>

                            <div className="btn-wrapper">
                                <Button type="submit" variant="primary" className="w-100 btn-custom">Update Business</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBusiness;
