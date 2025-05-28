import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserNoteLimit } from '../../../redux/actions/noteAction';
import { fetchUserDetails } from "../../../redux/actions/userAction";
import { toast } from 'react-toastify';

const UserNoteLimit = ({ userId, dispatch, userDetails, setUserDetails }) => {
    const { successMessage } = useSelector((state) => state.setUserPostLimit);

    const [action, setAction] = useState('');
    const [limit, setLimit] = useState('');
    const [isUpdating, setIsUpdating] = useState(false); 

    const refreshUserDetails = async () => {
        try {
            const updatedDetails = await dispatch(fetchUserDetails(userId));
            setUserDetails(updatedDetails); 
        } catch (err) {
            console.error("Failed to refresh user details", err);
        }
    };

    // Handle action change
    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit(''); // Reset limit input when action changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === 'stop' || (action && limit)) {
            try {
                setIsUpdating(true); // Start updating
                const noteLimit = action === 'stop' ? 0 : parseInt(limit, 10);

                await dispatch(setUserNoteLimit(userId, noteLimit, action)); // Await action
                toast.success("User Note Limit updated successfully!");

                // Refresh user details
                await refreshUserDetails();
            } catch (err) {
                toast.error("Failed to update note limit");
            } finally {
                setIsUpdating(false); // End updating
            }
        } else {
            alert("Please select an action and provide a valid limit.");
        }
    };

    return (
        <div>
            <div className="global-banning mt-4">
                <div className="heading fs-6 fw-bold text-capitalize mb-3">
                    User Note Limit Adjustment
                </div>

                <div className="d-flex gap-3 align-items-center mb-3">
                    {/* Action Dropdown */}
                    <select
                        className="form-select w-25"
                        aria-label="Select Action"
                        value={action}
                        onChange={handleActionChange}
                        disabled={isUpdating} // Disable while updating
                    >
                        <option value="" disabled>Select Action</option>
                        <option value="raise">Raise Limit</option>
                        <option value="limit">Set Limit</option>
                        <option value="stop">Stop Limit</option>
                    </select>

                    {/* Input Field for Limit */}
                    {(action === "raise" || action === "limit") && (
                        <input
                            type="number"
                            className="form-control"
                            placeholder={action === "raise" ? "Amount to raise" : "Set Limit"}
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            style={{ width: "30%" }}
                            disabled={isUpdating} // Disable while updating
                        />
                    )}

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Set Limit"}
                    </button>
                </div>

                <p>
                    Daily Note Limit: {userDetails.dailyNoteLimit || "Not Set"}
                </p>

                <div className="text-muted small">
                    Adjust the user's daily note limit based on the selected action.
                </div>
            </div>
        </div>
    );
};

export default UserNoteLimit;
