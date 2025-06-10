import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./Chat.css";

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Dummy users
    const users = [
        { id: "1", ownerName: "Alice" },
        { id: "2", ownerName: "Bob" },
        { id: "3", ownerName: "Charlie" },
    ];

    // Dummy chat messages
    const dummyMessages = {
        "1": [
            {
                id: "msg1",
                senderRole: "admin",
                timestamp: Date.now() - 100000,
                message: "Hello Alice!",
                messageType: "text",
            },
            {
                id: "msg2",
                senderRole: "user",
                timestamp: Date.now() - 50000,
                message: "Hi admin!",
                messageType: "text",
            },
        ],
        "2": [
            {
                id: "msg3",
                senderRole: "admin",
                timestamp: Date.now() - 60000,
                message: "Hey Bob!",
                messageType: "text",
            },
        ],
        "3": [],
    };

    const messages = selectedUser ? dummyMessages[selectedUser] || [] : [];

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedUser, messages]);

    const sendMessage = () => {
        alert("This is a dummy chat. Messages aren't sent.");
        setNewMessage("");
        setSelectedImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImageName(file.name);
        }
    };

    return (
        <div className="support-chat-page overflow-hidden py-3">
            <div className="container-fluid">
                <div className="row gx-0 gy-3">
                    {/* Sidebar */}
                    <div className="col-md-4 col-xl-3">
                        <div className="sidebar-section bg-light border-end d-flex flex-column p-3">
                            <h6 className="text-primary fw-bold">Users Chats</h6>
                            <div className="list-group-wrapper flex-grow-1 overflow-auto">
                                <ul className="list-group">
                                    {users.map((user, index) => (
                                        <li
                                            key={index}
                                            className={`list-group-item text-capitalize ${selectedUser === user.id ? "active text-white bg-primary" : ""}`}
                                            onClick={() => setSelectedUser(user.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {user.ownerName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="col-md-8 col-xl-9">
                        <div className="chat-window bg-white d-flex flex-column">
                            <div className="border-bottom p-3 bg-primary text-white">
                                <h6 className="mb-0">
                                    Chat with:{" "}
                                    {selectedUser
                                        ? users.find((u) => u.id === selectedUser)?.ownerName || "Unnamed User"
                                        : "Select a User"}
                                </h6>
                            </div>

                            {/* Messages Section */}
                            <div
                                ref={chatContainerRef}
                                className="messages-wrapper d-flex flex-column gap-3 flex-grow-1 overflow-auto p-3"
                            >
                                {selectedUser ? (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${msg.senderRole === "admin" ? "text-end" : "text-start"}`}
                                        >
                                            <div
                                                className="fs-12 text-muted"
                                                style={{
                                                    textAlign: `${msg.senderRole === "admin" ? "right" : "left"}`,
                                                    marginBottom: "3px",
                                                }}
                                            >
                                                {msg.senderRole === "admin" && (
                                                    <span style={{ fontWeight: "bold", color: "#343a40" }}>Admin</span>
                                                )}
                                                {msg.senderRole === "user" && (
                                                    <span style={{ fontWeight: "bold", color: "#343a40" }}>User</span>
                                                )}{" "}
                                                {moment(msg.timestamp).fromNow()}
                                            </div>

                                            {msg.messageType === "text" ? (
                                                <div
                                                    className="d-inline-block p-2 rounded shadow-sm"
                                                    style={{
                                                        maxWidth: "70%",
                                                        fontSize: "0.9rem",
                                                        backgroundColor:
                                                            msg.senderRole === "admin"
                                                                ? "#0d6efd" // Blue for Admin
                                                                : "#FFDBCE", // Peach for User
                                                        color: msg.senderRole === "admin" ? "white" : "black",
                                                    }}
                                                >
                                                    {msg.message}
                                                </div>
                                            ) : (
                                                <div className="zoom-wrapper">
                                                    <Zoom>
                                                        <img
                                                            src={msg.message}
                                                            alt="Chat"
                                                            style={{
                                                                maxHeight: "150px",
                                                                maxWidth: "150px",
                                                                cursor: "pointer",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                    </Zoom>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted text-center">Select a user to view the chat.</p>
                                )}
                            </div>

                            {/* Input Section */}
                            {selectedUser && (
                                <div className="bg-white border-top p-3">
                                    {selectedImage && (
                                        <div className="text-muted small">
                                            Selected file: {imageName}
                                            <button
                                                className="btn btn-sm btn-link"
                                                onClick={() => setSelectedImage(null)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                    <div className="d-flex border rounded-3 overflow-hidden">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-none"
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            disabled={loading || !!selectedImage}
                                        />

                                        <div className="input-file-wrapper d-flex align-items-center me-2">
                                            <label htmlFor="fileInput" className="pointer">
                                                <i className="bi bi-paperclip fs-5 text-muted"></i>
                                            </label>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                accept="image/*"
                                                className="form-control"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-primary border-0 rounded-0 px-4"
                                            onClick={sendMessage}
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Send"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;