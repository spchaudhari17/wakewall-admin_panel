import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { SetGlobalWallLimit } from '../../redux/actions/wallAction';
import { Loader } from '../../lib/loader';
import API from '../../API';

const GlobalWallLimit = () => {

    const dispatch = useDispatch();

    const [action, setAction] = useState('');
    const [limit, setLimit] = useState('');
    const [currentLimit, setCurrentLimit] = useState(null); // store current limit
    const [loading, setLoading] = useState(false);


    // Fetch current limit from API
    const fetchCurrentUserLimit = async () => {
        setLoading(true);
        try {
            const res = await API.get('/admin/get-currentuser-limit'); // Update endpoint if needed
            setCurrentLimit(res.data?.data?.currentLimit ?? "Not Found");
        } catch (error) {
            console.error("Failed to fetch current limit", error);
            setCurrentLimit("Error");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCurrentUserLimit();
    }, []);


    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action && (action === 'stop' || limit)) {
            console.log(`Action: ${action}, Limit: ${limit || 0}`);
            // dispatch(SetGlobalReminderLimit(action, parseInt(limit, 10) || 0));
            dispatch(SetGlobalWallLimit(action, parseInt(limit, 10) || 0));
            toast.success("Update Global Wall limit Successfully!")
            await fetchCurrentUserLimit();
            setLimit("")
            setAction("")
        } else {
            toast.error("Please select an action and provide a valid limit if required.")
        }
    };


    return (
        <div className="set-global-limit-page py-3">
            <div className="container-xl">
                <div
                    className="form-wrapper bg-white w-100 border rounded-4 mx-auto px-3 px-md-5 py-4"
                    style={{ maxWidth: '650px' }}
                >
                    <h3 className="text-center mb-4">Set Global Profile Photo Limit</h3>

                    {/* Show current limit */}
                    <div className="mb-4">
                        <strong>Current Global User Limit:</strong>{' '}
                        {loading ? <Loader /> : <span className="text-primary">{currentLimit}</span>}
                    </div>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Action<span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                value={action}
                                onChange={handleActionChange}
                                required
                            >
                                <option value="" disabled>
                                    Select Action
                                </option>
                                <option value="raise">Raise Limit</option>
                                <option value="limit">Set Limit</option>
                                <option value="stop">Stop Limit</option>
                            </select>
                        </div>

                        {action !== 'stop' && (
                            <div className="mb-3">
                                <label className="form-label">
                                    Limit<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder={action === 'raise' ? 'Amount to raise' : 'Set Limit'}
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="btn-wrapper mt-4">
                            <button type="submit" className="btn btn-primary w-100">
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default GlobalWallLimit;
