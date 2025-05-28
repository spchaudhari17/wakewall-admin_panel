import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { fetchReminderDetails, fetchReminders, getReminder, updateReminder } from '../../redux/actions/reminderAction';
import { Loader } from '../../lib/loader';
import { toast } from 'react-toastify';

const EditReminder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()

    const { loading, reminder, error } = useSelector((state) => state.allReminders);

    const [formData, setFormData] = useState({
        reminder_id: id,
        reminder_title: '',
        reminder_description: '',
        phone: '',
        category: '',
        sub_category: '',
        set_due: '',
        set_time: '',
        frequency: '',
        location: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(getReminder(id))
        }
    }, [dispatch, id]);
    

    useEffect(() => {
        if (reminder) {
            setFormData({
                reminder_id: id,
                reminder_title: reminder.reminder_title || '',
                reminder_description: reminder.reminder_description || '',
                phone: reminder.phone || '',
                category: reminder.category || '',
                sub_category: reminder.sub_category || '',
                // set_due: reminder.set_due || '',
                set_time: reminder.set_time || '',
                frequency: reminder.frequency || '',
                location: reminder.location || ''
            });
        }
    }, [reminder]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateReminder(formData));

        toast.success("Update Reminder Sucessfully !")

        // dispatch(fetchReminders());
        setTimeout(() => {
            navigate("/reminder-list")
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
                                    <img src={require('../../assets/images/dummy-user.jpeg')} alt="user" className="img-fluid w-100 h-100 rounded-circle object-fit-cover" />
                                    {/* <Form.Group controlId="uploadProfile" className="upload-cover position-absolute end-0 bottom-0 z-1">
                                        <Form.Label className="bg-primary d-flex align-items-center justify-content-center rounded-circle pointer m-1" style={{ height: '30px', width: '30px' }}><i className="bi bi-pencil-fill text-white"></i></Form.Label>
                                        <Form.Control type="file" hidden required />
                                    </Form.Group> */}
                                </div>
                                <div className="bg-primary bg-opacity-10 fs-6 fw-semibold mb-3 px-3 py-2 rounded">
                                    <i className="bi bi-alarm-fill me-1"></i> Edit Reminder
                                </div>
                                <Row className="g-3">
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="reminderTitle">
                                            <Form.Label>Reminder Title<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter reminder title"
                                                name="reminder_title"
                                                value={formData.reminder_title} // Use formData state here
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="descriptionPart2">
                                            <Form.Label></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Enter description"
                                                name="reminder_description"
                                                value={formData.reminder_description} // Use formData state here
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                value={formData.phone} // Use formData state here
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="category">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter category"
                                                name="category"
                                                value={formData.category} // Use formData state here
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="subCategory">
                                            <Form.Label>Sub-Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter sub-category"
                                                name="sub_category"
                                                value={formData.sub_category} // Use formData state here
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="setDue">
                                            <Form.Label>Due Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="set_due"
                                                value={formData.set_due} // Use formData state here
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="setTime">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="set_time"
                                                value={formData.set_time} // Use formData state here
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="frequency">
                                            <Form.Label>Frequency</Form.Label>
                                            <Form.Select
                                                name="frequency"
                                                value={formData.frequency} // Use formData state here
                                                onChange={handleInputChange}
                                            >
                                                <option value="" disabled>Select frequency...</option>
                                                <option value="One-time">One-time</option>
                                                <option value="Daily">Daily</option>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Monthly">Monthly</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <div className="btn-wrapper">
                                <Button type='submit' variant="primary" className="w-100 btn-custom">Edit Reminder</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReminder;
