import React from "react";

const UserInfoCard = ({ userDetails }) => {
    return (
        <div className="left-section bg-white rounded-3 px-3 py-4">
            <div className="main-info text-center pb-2">
                <div
                    className="img-cover position-relative d-flex align-items-center justify-content-center bg-primary bg-opacity-25 border border-2 border-primary rounded-circle shadow mx-auto mb-2"
                    style={{ height: "100px", width: "100px" }}
                >
                    <img
                        src={
                            userDetails.profile_pic ||
                            require("../../../assets/images/dummy-user.jpeg")
                        }
                        alt="user"
                        className="img-fluid h-100 w-100 rounded-circle object-fit-cover"
                    />
                    <span
                        title="Active"
                        className="current-status border border-light rounded-circle position-absolute"
                        style={{
                            height: "15px",
                            width: "15px",
                            backgroundColor: "#01b501",
                            bottom: "5px",
                            right: "7px",
                        }}
                    ></span>
                </div>
                <div className="user-name fs-18 fw-semibold text-capitalize">
                    {userDetails.full_name}
                </div>
                <div className="user-email fs-14 text-muted text-capitalize">
                    {userDetails.email}
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
