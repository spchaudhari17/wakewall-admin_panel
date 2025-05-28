import React from "react";

const UserDetailsCard = ({ userDetails }) => {
    return (

        <div className="main-info">
            <div className="heading fs-6 fw-bold text-capitalize mb-2">
                All Details -
            </div>
            <div className="row row-cols-2 row-cols-xl-3 g-3">
                <div className="info-box fs-14 fw-medium">
                    <div className="text-secondary">Full Name</div>
                    <div className="text-body text-capitalize">
                        {userDetails.full_name}
                    </div>
                </div>
                <div className="info-box fs-14 fw-medium">
                    <div className="text-secondary">Username</div>
                    <div className="text-body text-capitalize">
                        {userDetails.username}
                    </div>
                </div>
                <div className="info-box fs-14 fw-medium">
                    <div className="text-secondary">Email ID</div>
                    <div className="text-body text-lowercase text-break">
                        {userDetails.email}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserDetailsCard;
