import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const SignUp = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassVisible, setconfirmPassVisible] = useState(false);

    const [phone, setPhone] = useState("");

    const togglePassVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPassVisibility = () => {
        setconfirmPassVisible(!confirmPassVisible);
    };

    const handleOnChange = (value) => {
        setPhone(value);
    };

    return (
        <div className='auth-page SignUp-page d-flex justify-content-center align-items-center min-vh-100 py-4'>
            <div className="container-xl">
                <div className="card border-0 rounded-3 shadow w-100 mx-auto px-3 py-4 px-md-5 py-md-5" style={{ maxWidth: '750px' }}>
                    <div className="fs-2 fw-bold text-center lh-1 mb-4">Register</div>
                    <Form>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter name" autoComplete='off' required />
                        </Form.Group>

                        <Row className="g-3 mb-3">
                            <Col sm={6}>
                                <Form.Group controlId="userEmail">
                                    <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" autoComplete='off' required />
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="userPassword">
                                    <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                                    <PhoneInput
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: false
                                        }}
                                        country={"in"}
                                        value={phone}
                                        onChange={handleOnChange}
                                        // enableSearch={true}
                                        countryCodeEditable={false}
                                        inputClass="w-100 py-2"
                                        dropdownClass="text-start"
                                        inputStyle={{ height: 'auto', minHeight: '45px', borderColor: 'var(--bs-border-color)' }}
                                        placeholder='Enter your number'
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group controlId="chooseGender">
                                    <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                                    <div className="checks-wrapper">
                                        <Form.Check inline label="Male" name="chooseGender" type="radio" id="genderMale" required />
                                        <Form.Check inline label="Female" name="chooseGender" type="radio" id="genderFemale" />
                                        <Form.Check inline label="Other" name="chooseGender" type="radio" id="genderOther" />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="departmentName">
                                    <Form.Label>Department<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter department" autoComplete='off' required />
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="designationName">
                                    <Form.Label>Designation<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter designation" autoComplete='off' required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="g-3 mb-3">
                            <Col sm={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                    <div className="position-relative">
                                        <Form.Control type={passwordVisible ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter password" minlength="8"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                            title="Must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
                                            autoComplete='new-password'
                                            required
                                        />
                                        <span role="button" className="position-absolute top-50 translate-middle-y text-secondary" onClick={togglePassVisibility} style={{ right: '10px' }}>
                                            {passwordVisible ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                        </span>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                                    <div className="position-relative">
                                        <Form.Control type={confirmPassVisible ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmPassword(e.target.value)}
                                            placeholder="Enter confirm password" minlength="8"
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                            title="Must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
                                            autoComplete='new-password'
                                            required
                                        />
                                        <span role="button" className="position-absolute top-50 translate-middle-y text-secondary" onClick={toggleConfirmPassVisibility} style={{ right: '10px' }}>
                                            {confirmPassVisible ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                        </span>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Enter address" autoComplete='off' required />
                        </Form.Group>

                        <Row className="g-3 mb-3">
                            <Col md={4}>
                                <Form.Group controlId="cityName">
                                    <Form.Label>City<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter City" autoComplete='off' required />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                                <Form.Group controlId="stateName">
                                    <Form.Label>State<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter State" autoComplete='off' required />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                                <Form.Group controlId="zipCode">
                                    <Form.Label>Zip code<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Enter code" minLength={6} maxLength={6} autoComplete='off' required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="form-check fs-6 mb-3">
                            <input type="checkbox" className="form-check-input border-secondary border-opacity-50" id="conditionAgreement" required />
                            <label className="form-check-label" htmlFor="conditionAgreement">I agree to the terms & conditions</label>
                        </div>

                        <Button variant="primary" type="submit" className="btn-custom w-100 mt-2 py-2">Register</Button>

                        <div className="text-center fs-14 text-secondary mt-3">
                            Already have an account? <Link to={'/login'} className='btn-link fw-medium text-decoration-none'>Sign In</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
