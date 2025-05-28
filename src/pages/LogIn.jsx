import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import API from '../API';

export const LogIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Backend API call
    //         const response = await axios.post('http://localhost:3000/user/login', {
    //             email,
    //             password,
    //             device_token: '',
    //             device_type: '',
    //         });

    //         if (!response.data.error) {
    //             console.log("login data", response.data)

    //             const userData = response.data.data;

    //             localStorage.setItem('token', userData.token);

    //             // Store full user object
    //             localStorage.setItem('user', JSON.stringify(userData));

    //             navigate('/dashboard');
    //             toast.success("login success")
    //         } else {
    //             setError(response.data.message);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         setError('Something went wrong. Please try again.');
    //     }
    // };



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Backend API call
            const response = await API.post('/user/login', {
                email,
                password,
                device_token: '',
                device_type: '',
            });

            if (!response.data.error) {
                console.log("login data", response.data)

                const userData = response.data.data;

                // Check if user is admin or moderator
                if (userData.role !== 'admin' && userData.role !== 'moderator') {
                    setError('Only admins and moderators can login.');
                    return;
                }

                localStorage.setItem('token', userData.token);
                localStorage.setItem('user', JSON.stringify(userData));

                navigate('/dashboard');
                toast.success("Login successful");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.log(err)
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-page login-page d-flex justify-content-center align-items-center min-vh-100 py-4">
            <div className="container-xl">
                <div className="card border-0 rounded-3 shadow w-100 mx-auto px-3 px-sm-5 py-5" style={{ maxWidth: '550px' }}>
                    <div className="fs-2 fw-bold text-center lh-1 mb-4">Login</div>
                    <Form onSubmit={handleLogin}>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="pe-5"
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    role="button"
                                    className="position-absolute top-50 translate-middle-y text-secondary"
                                    onClick={togglePasswordVisibility}
                                    style={{ right: '10px' }}
                                >
                                    {passwordVisible ? (
                                        <i className="bi bi-eye-slash-fill"></i>
                                    ) : (
                                        <i className="bi bi-eye-fill"></i>
                                    )}
                                </span>
                            </div>
                        </Form.Group>

                        <div className="d-flex gap-2 justify-content-between mb-3 pt-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input border-secondary border-opacity-50"
                                    id="rememberMe"
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <Link to={'/forgot-password'} className="btn-link fw-medium text-decoration-none">
                                Forgot Password
                            </Link>
                        </div>

                        <Button variant="primary" type="submit" className="btn-custom w-100 mt-2 py-2">
                            Login
                        </Button>
                        {/* <div className="text-center fs-14 text-secondary mt-3">
                            Don't have an account?{' '}
                            <Link to={'/signup'} className="btn-link fw-medium text-decoration-none">
                                Sign Up
                            </Link>
                        </div> */}
                    </Form>
                </div>
            </div>
        </div>
    );
};
