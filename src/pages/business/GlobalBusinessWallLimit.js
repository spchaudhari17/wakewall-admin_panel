import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { SetGlobalBusinessWallLimit } from '../../redux/actions/businessAction';

const GlobalNoteLimit = () => {
    const dispatch = useDispatch();

    const [action, setAction] = useState('');
    const [limit, setLimit] = useState('');

    // Handle action change
    const handleActionChange = (e) => {
        setAction(e.target.value);
        setLimit(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action && (action === 'stop' || limit)) {
            console.log(`Action: ${action}, Limit: ${limit || 0}`);
            dispatch(SetGlobalBusinessWallLimit(action, parseInt(limit, 10) || 0));
            toast.success("Update Global Business limit Successfully! ")
            setAction("");
            setLimit(''); 
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
                    <h3 className="text-center mb-4">Set Global Business Wall Limit</h3>
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
                                <option value="stop">Stop Notes</option>
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
                    {/* {successMessage && <p className="text-success mt-3">{successMessage}</p>} */}
                </div>
            </div>
        </div>
    );
};

export default GlobalNoteLimit;
