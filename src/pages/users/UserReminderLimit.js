import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserReminderLimit } from '../../redux/actions/reminderAction';
import { fetchUserDetails } from '../../redux/actions/userAction'; // Import fetchUserDetails
import { toast } from 'react-toastify';

const UserReminderLimit = ({ userId, userDetails, setUserDetails }) => {
    const dispatch = useDispatch();

    const [action, setAction] = useState('');
    const [limit, setLimit] = useState('');
    const [isUpdating, setIsUpdating] = useState(false); 

    // Function to refresh user details
    const refreshUserDetails = async () => {
        try {
            const updatedDetails = await dispatch(fetchUserDetails(userId)); // Fetch updated details
            setUserDetails(updatedDetails); // Update state
        } catch (err) {
            console.error("Failed to refresh user details", err);
        }
    };

    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit(''); // Reset limit when action changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === 'stop' || (action && limit)) {
            try {
                setIsUpdating(true); // Start updating
                const reminderLimit = action === 'stop' ? 0 : parseInt(limit, 10);

                await dispatch(setUserReminderLimit(userId, reminderLimit, action)); // Await dispatch
                toast.success('User reminder limit updated successfully!');

                // Refresh user details
                await refreshUserDetails();
            } catch (err) {
                toast.error("Failed to update reminder limit");
            } finally {
                setIsUpdating(false); // End updating
            }
        } else {
            alert('Please select an action and provide a valid limit.');
        }
    };

    return (
        <div>
            <div className="global-banning mt-4">
                <div className="heading fs-6 fw-bold text-capitalize mb-3">
                    User Reminder Limit Adjustment
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
                        <option value="" disabled>
                            Select Action
                        </option>
                        <option value="raise">Raise Limit</option>
                        <option value="limit">Set Limit</option>
                        <option value="stop">Stop Limit</option>
                    </select>

                    {/* Input Field for Limit */}
                    {(action === 'raise' || action === 'limit') && (
                        <input
                            type="number"
                            className="form-control"
                            placeholder={action === 'raise' ? 'Amount to raise' : 'Set Limit'}
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            style={{ width: '30%' }}
                            required
                            disabled={isUpdating} // Disable while updating
                        />
                    )}

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isUpdating} // Disable button while updating
                    >
                        {isUpdating ? 'Updating...' : 'Set Limit'}
                    </button>
                </div>

                <p>
                    Daily Reminder Limit: {userDetails.dailyReminderLimit || "Not Set"}
                </p>

                <div className="text-muted small">
                    Adjust the user's daily reminder limit based on the selected action.
                </div>
            </div>
        </div>
    );
};

export default UserReminderLimit;
