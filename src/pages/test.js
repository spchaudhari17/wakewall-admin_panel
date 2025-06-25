import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
// import { Loader } from "../helper/loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import "react-toastify/dist/ReactToastify.css";


const AppAnnouncement = () => {



    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("All");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    //   const scentiqoDetail = useSelector((state) => state.scentiqoDetail);
    //   const { loading } = scentiqoDetail;
    const [isDisabled, setIsDisbaled] = useState(false)

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: ["small", "medium", "large", "huge"] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            ["link"],
            ["blockquote"],
            ["code-block"],
            ["video"],
        ],
        // emoji: true
    };

    const handleEmojiSelect = (emoji) => {
        const quillEditor = document.querySelector('.ql-editor');
        const selection = window.getSelection();


        if (selection.rangeCount > 0 && quillEditor.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0);
            const emojiNode = document.createTextNode(emoji.native);
            range.deleteContents();
            range.insertNode(emojiNode);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            setDescription((prev) => prev + emoji.native);
        }
        setShowEmojiPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsDisbaled(true)
            const currentTimestamp = Date.now();
            const socialQuery = query(
                collection(db, "social"),
                where("socialType", "==", "announcement")
            );
            const socialSnapshot = await getDocs(socialQuery);

            let socialDocRef;
            let socialID;

            if (socialSnapshot.empty) {
                const newSocialDocRef = doc(collection(db, "social"));
                socialID = newSocialDocRef.id;
                await setDoc(newSocialDocRef, {
                    id: socialID,
                    socialType: "announcement",
                    timestamp: currentTimestamp,
                    lastmessage: description,
                });
                socialDocRef = newSocialDocRef;
            } else {
                const docId = socialSnapshot.docs[0].id;
                socialDocRef = doc(db, "social", docId);
                socialID = docId;

                await updateDoc(socialDocRef, {
                    lastmessage: description,
                    timestamp: currentTimestamp,
                });
            }

            const messageDocRef = doc(
                collection(db, "social", socialID, "message")
            );
            const messageID = messageDocRef.id;
            await setDoc(messageDocRef, {
                id: messageID,
                title,
                description,
                country,
                timestamp: currentTimestamp,
            });

            console.log("Message written to Firestore:", {
                id: messageID,
                title,
                description,
                country,
                timestamp: currentTimestamp,
            });

            //   dispatch(actions.sendAnnouncement(toast, { title, country }));
            setTitle("");
            setDescription("");
            setCountry("All");
            // toast.success("Message successfully added to the announcement!", {
            //   position: "top-center",
            //   theme: "colored",
            //   hideProgressBar: true,
            // });
            setIsDisbaled(false)
        } catch (e) {
            console.error("Error adding message: ", e);
            toast.error("Error adding message.", {
                position: "top-center",
                theme: "colored",
                hideProgressBar: true,
            });
        }
    };

    return (
        <div className="announcement py-4">
            <ToastContainer />
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <select
                                id="country"
                                className="form-select"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="All">All</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Germany">Germany</option>
                                <option value="Finland">Finland</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="quill-wrapper mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <ReactQuill
                                theme="snow"
                                placeholder="Enter your announcement details..."
                                required
                                id="description"
                                value={description}
                                onChange={setDescription}
                                modules={modules}
                            />
                        </div>

                        {/* Emoji Picker */}
                        <div className="emoji-picker-container mb-3 d-flex justify-content-end position-relative">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}

                            >
                                Add Emoji
                            </button>
                            {showEmojiPicker && (
                                <div className="emoji-picker-wrapper">
                                    <Picker
                                        data={data}
                                        // onEmojiSelect={(emoji) => setDescription((prev) => prev + emoji.native)} // `onEmojiSelect` instead of `onSelect`
                                        onEmojiSelect={handleEmojiSelect}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={isDisabled} className="btn btn-success w-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* {loading && <Loader />} */}
        </div>
    );
};

export default AppAnnouncement;