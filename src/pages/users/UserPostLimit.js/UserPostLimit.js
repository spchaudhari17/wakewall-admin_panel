import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserDetails, setUserPostLimit } from "../../../redux/actions/userAction"
import { toast } from 'react-toastify';

const UserPostLimit = ({ userId, userDetails, setUserDetails }) => {
    const dispatch = useDispatch();

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

    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === 'stop' || (action && limit)) {
            try {
                setIsUpdating(true); 
                const reminderLimit = action === 'stop' ? 0 : parseInt(limit, 10);

                await dispatch(setUserPostLimit(userId, action, reminderLimit,));
                toast.success('User wall limit updated successfully!');

                // Refresh user details
                await refreshUserDetails();
            } catch (err) {
                toast.error("Failed to update wall limit");
            } finally {
                setIsUpdating(false); 
            }
        } else {
            alert('Please select an action and provide a valid limit.');
        }
    };

    return (
        <div>
            <div className="global-banning mt-4">
                <div className="heading fs-6 fw-bold text-capitalize mb-3">
                    User Profile Photos Adjustment
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
                        {isUpdating ? 'Updating...' : 'Set Limit'}
                    </button>
                </div>

                <p>
                    Feed Limit: {userDetails.postLimit || "Not Set"}
                </p>

                <div className="text-muted small">
                    Adjust the user's daily feed limit based on selected action.
                </div>
            </div>
        </div>
    );
}

export default UserPostLimit;