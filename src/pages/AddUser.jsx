import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const AddUser = () => {
    // State for form fields and image
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        username: '',
        password: '',
        device_type: 'android', // default to android
        description: '',
    });
    const [profileImage, setProfileImage] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Assuming you are sending this to your backend:
        const formDataToSend = new FormData();
        formDataToSend.append('full_name', formData.full_name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('device_type', formData.device_type);
        formDataToSend.append('description', formData.description);
        if (profileImage) {
            formDataToSend.append('profile_image', profileImage);
        }

        // Submit the form data to backend (this is where you would send your API request)
        console.log('Form Data:', formDataToSend);
    };

    return (
        <div className="addUser-page py-3">
            <div className="container-xl">
                <div className="form-wrapper bg-white w-100 border rounded-4 mx-auto px-3 px-md-5 py-4" style={{ maxWidth: "850px" }}>
                    <Form className="mt-2 mb-3" onSubmit={handleSubmit}>
                        <div className="detail-wrapper mb-4">
                            <div className="user-img bg-primary bg-opacity-25 d-flex align-items-center justify-content-center border border-2 border-primary rounded-circle shadow position-relative mx-auto mb-4" style={{ height: '110px', width: '110px' }}>
                                <img src={profileImage ? URL.createObjectURL(profileImage) : require('../assets/images/dummy-user.jpeg')} alt="user" className="img-fluid w-100 h-100 rounded-circle object-fit-cover" />
                                <Form.Group controlId="uploadProfile" className="upload-cover position-absolute end-0 bottom-0 z-1">
                                    <Form.Label className="bg-primary d-flex align-items-center justify-content-center rounded-circle pointer m-1" style={{ height: '30px', width: '30px' }}>
                                        <i className="bi bi-pencil-fill text-white"></i>
                                    </Form.Label>
                                    <Form.Control type="file" hidden onChange={handleFileChange} required />
                                </Form.Group>
                            </div>

                            <div className="bg-primary bg-opacity-10 fs-6 fw-semibold mb-3 px-3 py-2 rounded"><i className="bi bi-mortarboard-fill me-1"></i> Add user info</div>

                            <Row className="g-3">
                                <Col sm={6}>
                                    <Form.Group controlId="fullName">
                                        <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" value={formData.full_name} onChange={handleInputChange} name="full_name" autoComplete="off" required />
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group controlId="userEmail">
                                        <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} name="email" autoComplete="off" required />
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group controlId="userUsername">
                                        <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={formData.username} onChange={handleInputChange} name="username" autoComplete="off" required />
                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group controlId="userPassword">
                                        <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" value={formData.password} onChange={handleInputChange} name="password" autoComplete="off" required />
                                    </Form.Group>
                                </Col>

                                

                                <Col xs={12}>
                                    <Form.Group controlId="deviceType">
                                        <Form.Label>Device Type</Form.Label>
                                        <Form.Select aria-label="Device Type" value={formData.device_type} onChange={handleInputChange} name="device_type" required>
                                            <option value="android">Android</option>
                                            <option value="ios">iOS</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                
                            </Row>
                        </div>

                        <div className="btn-wrapper">
                            <Button type="submit" variant="primary" className="w-100 btn-custom">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
