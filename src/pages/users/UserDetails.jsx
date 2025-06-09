import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import RoleManagement from './RoleManagement/RoleManagement';
import BanUnbanControls from './BanUnbanControls/BanUnbanControls';
import UserDetailsCard from './UserDetailsCard/UserDetailsCard';
import { fetchUserDetails } from '../../redux/actions/userAction';
import UserNoteLimit from './UserNoteLimit/UserNoteLimit';
import UserReminderLimit from './UserReminderLimit';
import { Loader } from '../../lib/loader';
import { toast } from 'react-toastify';
import UserPostLimit from './UserPostLimit.js/UserPostLimit';
import PostLimitUpdater from './UserPostLimit.js/UserPostLimit';
import BusinessWallLimit from './BusinessWallLimit/BusinessWallLimit';
import { getAllBusinesses, getBusiness, getBusinessDetails } from '../../redux/actions/businessAction';

export const UserDetails = () => {
    const dispatch = useDispatch()
    const { loading, userDetails, error } = useSelector((state) => state.users);

    console.log("userDetails --- ", userDetails)

    const { id } = useParams();



    useEffect(() => {
        dispatch(fetchUserDetails(id));
    }, [id, dispatch]);


    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }



    return (
        <div className="UserDetails-page py-3">
            <div className="container-fluid">
                <div className="user-details-wrapper">
                    <div className="row g-3 g-xl-4">
                        <div className="col-md-5 col-xl-4 col-xxl-3">
                            <div className="left-section bg-white rounded-3 px-3 py-4">
                                <div className="main-info text-center pb-2">
                                    <div className="img-cover position-relative d-flex align-items-center justify-content-center bg-primary bg-opacity-25 border border-2 border-primary rounded-circle shadow mx-auto mb-2" style={{ height: '100px', width: '100px' }}>
                                        <img src={userDetails.profile_pic || require('../../assets/images/dummy-user.jpeg')} alt="user" className="img-fluid h-100 w-100 rounded-circle object-fit-cover" />
                                        <span title='Active' className='current-status border border-light rounded-circle position-absolute' style={{ height: '15px', width: '15px', backgroundColor: '#01b501', bottom: '5px', right: '7px' }}></span>
                                    </div>
                                    <div className="user-name fs-18 fw-semibold text-capitalize">{userDetails.full_name}</div>
                                    <div className="user-email fs-14 text-muted text-capitalize">{userDetails.email}</div>
                                </div>

                                <hr className="border-secondary border-opacity-50" />


                                <div className="contact-info fs-14">
                                    <div className="heading fs-6 fw-bold text-capitalize mb-3">All Details -</div>
                                    <div className="row row-cols-2 g-3">
                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Username</div>
                                            <div className="text-body text-capitalize">{userDetails.username}</div>
                                        </div>
                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Full Name</div>
                                            <div className="text-body text-capitalize">{userDetails.full_name}</div>
                                        </div>

                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Email</div>
                                            <div className="text-body text-capitalize">{userDetails.email}</div>
                                        </div>
                                    </div>

                                </div>

                                <hr className="border-secondary border-opacity-50" />

                                <div className="user-info fs-14">
                                    <div className="heading fs-6 fw-bold text-capitalize mb-3">Basic Details -</div>
                                    <div className="row row-cols-2 g-3">
                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Joining Date</div>
                                            <div className="text-body text-capitalize">{new Date(userDetails.createdAt).toLocaleDateString()}</div>
                                        </div>

                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Birthday</div>
                                            <div className="text-body text-capitalize">{userDetails.dob}</div>
                                        </div>

                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Total Followers</div>
                                            <div className="text-body text-capitalize">{userDetails.total_followers}</div>
                                        </div>
                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">Total Following</div>
                                            <div className="text-body text-capitalize">{userDetails.total_following}</div>
                                        </div>

                                        <div className="info-box fs-14 fw-medium">
                                            <div className="text-secondary">User Type</div>
                                            <div className="text-body text-capitalize">{userDetails.user_type}</div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-secondary border-opacity-50" />



                            </div>
                        </div>

                        <div className="col-md-7 col-xl-8 col-xxl-9">
                            <div className="right-section bg-white rounded-3 px-3 py-4">

                                {/* <UserDetailsCard userDetails={userDetails} /> */}

                                {/* <hr className="border-secondary border-opacity-50" /> */}

                                {userDetails?.role === "admin" && (
                                    <>
                                        <BanUnbanControls userDetails={userDetails} userId={id} dispatch={dispatch} />
                                        <hr className="border-secondary border-opacity-50" />
                                    </>
                                )}


                                {userDetails?.role === "admin" && (
                                    <>
                                        <RoleManagement userDetails={userDetails} userId={id} dispatch={dispatch} />
                                        <hr className="border-secondary border-opacity-50" />
                                    </>
                                )}




                                <UserNoteLimit userDetails={userDetails} userId={id} dispatch={dispatch} />

                                <hr className="border-secondary border-opacity-50" />
                                <UserReminderLimit userId={id} userDetails={userDetails} dispatch={dispatch} />

                                <hr className="border-secondary border-opacity-50" />
                                <UserPostLimit userId={id} userDetails={userDetails} dispatch={dispatch} />

                                <hr className="border-secondary border-opacity-50" />

                                {/* <BusinessWallLimit userId={id} userDetails={userDetails} dispatch={dispatch} /> */}

                                {userDetails?.user_type === "business" && (
                                    <BusinessWallLimit userId={id} userDetails={userDetails} dispatch={dispatch} />
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
