import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignModeratorRole, fetchUserDetails } from "../../../redux/actions/userAction";
import { toast } from "react-toastify";

const RoleManagement = ({ userId, dispatch, userDetails, setUserDetails }) => {
    const [roleAction, setRoleAction] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const refreshUserDetails = async () => {
        try {
            const updatedDetails = await dispatch(fetchUserDetails(userId));
            setUserDetails(updatedDetails);
        } catch (err) {
            console.error("Failed to refresh user details", err);
        }
    };

    const handleRoleUpdate = async () => {
        if (roleAction === "assign_moderator" || roleAction === "remove_moderator") {
            setIsUpdating(true);
            try {
                // Ensure the action returns a promise
                await dispatch(assignModeratorRole(userId, roleAction));
                toast.success("User role updated successfully!");
                await refreshUserDetails();
            } catch (err) {
                toast.error("Failed to update user role");
            } finally {
                setIsUpdating(false);
            }
        } else {
            toast.warn("Please select a valid role action");
        }
    };

    return (
        <div className="role-management mt-4">
            <div className="heading fs-6 fw-bold text-capitalize mb-3">Assign Moderator Role Management</div>
            <div className="d-flex gap-3 align-items-center mb-3">
                <select
                    className="form-select w-auto"
                    value={roleAction}
                    onChange={(e) => setRoleAction(e.target.value)}
                    aria-label="Select Role Action"
                >
                    <option value="" disabled>
                        Select Role Action
                    </option>
                    <option value="assign_moderator">Assign Moderator</option>
                    <option value="remove_moderator">Remove Moderator</option>
                </select>
                <button className="btn btn-primary" onClick={handleRoleUpdate} disabled={isUpdating}>
                    {isUpdating ? "Processing..." : "Update Role"}
                </button>
            </div>

            <p>Role: {userDetails?.role || "N/A"}</p>

            <div className="text-muted small">
                Assign or remove moderators for managing flagged content.
            </div>
        </div>
    );
};

export default RoleManagement;

