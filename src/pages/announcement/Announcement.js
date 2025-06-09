import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"
import { sendAllUsersNotification } from "../../redux/actions/announcement";

const Announcement = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [type, setType] = useState("");
    const dispatch = useDispatch();

    const handleQuillChange = (value) => {
        setBody(value); // Set the content of the editor
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendAllUsersNotification({ title, body, type}));
        toast.success("Message successfully added to the announcement!", {
            // position: "top-center",
            // theme: "colored",
            // hideProgressBar: true,
        });

        setTitle("")
        setBody("")
        setType("")

    };

    return (
        <div className="announcement py-4">

            <div className="container d-flex justify-content-center">
                <div
                    className="card shadow-lg p-4 rounded-lg"
                    style={{ maxWidth: "600px", width: "100%" }}
                >
                    <h2 className="text-center mb-4">Create Announcement</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                placeholder="Enter the title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>



                        {/* Description */}
                        <div className="quill-wrapper mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            {/* <ReactQuill
                                theme="snow"
                                placeholder="Enter your announcement details..."
                                required
                                id="description"
                                style={{ height: "120px" }}
                                value={body} // Bind to state
                                onChange={handleQuillChange} // 

                            /> */}
                            <textarea
                                id="body"
                                className="form-control"
                                placeholder="Enter your announcement details..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            ></textarea>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">
                                User Type
                            </label>
                            <select
                                id="country"
                                className="form-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="">Select user type</option>
                                <option value="User">User</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>

                        {/* Emoji Picker */}
                        {/* <div className="emoji-picker-container mb-3 d-flex justify-content-end position-relative">
              <button type="button" className="btn btn-secondary">
                Add Emoji
              </button>
              <div className="emoji-picker-wrapper">
                <Picker data={data} />
              </div>
            </div> */}

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success w-100 mt-5">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
