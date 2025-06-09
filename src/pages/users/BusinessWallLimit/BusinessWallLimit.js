import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { fetchUserDetails } from "../../../redux/actions/userAction";
import { setBusinessWallLimit } from '../../../redux/actions/businessAction';

const BusinessWallLimit = ({ userId, dispatch, userDetails, setUserDetails }) => {
    // const dispatch = useDispatch()
    const [action, setAction] = useState('');
    const [limit, setLimit] = useState('');
    const [isUpdating, setIsUpdating] = useState(false); 

    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit('');
    };


    const refreshUserDetails = async () => {
        try {
            const updatedDetails = await dispatch(fetchUserDetails(userId));
            setUserDetails(updatedDetails); 
        } catch (err) {
            console.error("Failed to refresh user details", err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === 'stop' || (action && limit)) {
            try {
                setIsUpdating(true); // Start updating
                const noteLimit = action === 'stop' ? 0 : parseInt(limit, 10);

                await dispatch(setBusinessWallLimit(userId, action, noteLimit));
                toast.success("User Business feed Limit updated successfully!");

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
                    User Business Profile Photos Adjustment
                </div>

                <div className="d-flex gap-3 align-items-center mb-3">
                    {/* Action Dropdown */}
                    <select
                        className="form-select w-25"
                        aria-label="Select Action"
                        value={action}
                        onChange={handleActionChange}
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
                    Business Feed Limit: {userDetails.businessPostLimit || "Not Set"}
                </p>

                <div className="text-muted small">
                    Adjust the user's daily business feed limit based on selected action.
                </div>
            </div>
        </div>
    );
}

export default BusinessWallLimit;