import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import "./Chat.css";
import { useLocation } from "react-router-dom";

const UserChat = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    const adminId = "681c0eb3197845464e2c1518"; // ✅ Replace with your real admin UID
    const adminName = "Admin"; // ✅ Replace with real admin name if needed
    const adminImage = "https://rlanbucket.s3.us-west-1.amazonaws.com/profile-images/1748513238619_wakewall.png"

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(userId || null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const chatContainerRef = useRef(null);

    // Fetch users from Firestore
    useEffect(() => {
        const usersRef = collection(db, "local", "local_document", "users");
        // const usersRef = collection(db, "production", "production_document", "users");
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const userList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(userList);
        });

        return () => unsubscribe();
    }, []);

    console.log("users firebase --", users)

    // Fetch messages for selected user
    useEffect(() => {
        if (!selectedUser) return;

        const chatId = adminId < selectedUser ? `${adminId}-${selectedUser}` : `${selectedUser}-${adminId}`;
        // const chatId = adminId > selectedUser ? `${selectedUser}-${adminId}` : `${adminId}-${selectedUser}`;
        const messagesRef = collection(db, "local", "local_document", "chats", chatId, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            // const msgs = snapshot.docs.map((doc) => doc.data());
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,         // ✅ Grab messageId
                ...doc.data()
            }));

            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [selectedUser]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);



    //Handle send message
    const sendMessage = async () => {
        if (!selectedUser || (!newMessage && !selectedImage)) return;

        setLoading(true);
        const receiver = users.find((u) => u.id === selectedUser);

        const chatId =
            adminId < selectedUser
                ? `${adminId}-${selectedUser}`
                : `${selectedUser}-${adminId}`;

        const messagesRef = collection(
            db,
            "local",
            "local_document",
            "chats",
            chatId,
            "messages"
        );

        const chatListRef = doc(
            db,
            "local",
            "local_document",
            "chatList",
            chatId
        );

        const timeNow = moment().format("YYYY-MM-DD HH:mm:ss");

        let messagePayload = {
            message: newMessage,
            msgType: "text",
            senderId: adminId,
            senderName: adminName,
            senderImage: adminImage,
            receiverId: selectedUser,
            receiverName: receiver?.name || "User",
            receiverImage: receiver?.userProfile || "",
            timestamp: timeNow
        };



        try {
            await addDoc(messagesRef, messagePayload);

            const chatListPayload = {
                lastMessage: messagePayload.message,
                lastMessageTime: timeNow,
                lastSenderId: adminId,
                lastReceiverId: selectedUser,
                senderName: adminName,
                senderImage: adminImage,
                receiverName: receiver?.name || "User",
                receiverImage: receiver?.userProfile || "",
                isRead: false,
                type: "UserToUser",
                deletedBy: ""
            };

            await setDoc(chatListRef, chatListPayload);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setNewMessage("");
        setSelectedImage(null);
        setImageName("");
        setLoading(false);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImageName(file.name);
        }
    };




    const deleteMessage = async (messageId) => {
        if (!selectedUser || !messageId) {
            console.log("selectedUser", selectedUser);
            console.log("messageId", messageId);
            return;
        }

        const chatId = adminId < selectedUser
            ? `${adminId}-${selectedUser}`
            : `${selectedUser}-${adminId}`;

        const messageRef = doc(db, "local", "local_document", "chats", chatId, "messages", messageId);

        try {
            await deleteDoc(messageRef);
            console.log("Message deleted");
        } catch (error) {
            console.error("Failed to delete message:", error);
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

                            {/* search users  */}
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search by name or username"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />




                            <div className="list-group-wrapper flex-grow-1 overflow-auto">
                                <ul className="list-group">
                                    {users
                                        .filter((user) => {
                                            const name = user.name?.toLowerCase() || "";
                                            const username = user.username?.toLowerCase() || "";
                                            const search = searchTerm.toLowerCase();
                                            return name.includes(search) || username.includes(search);
                                        })
                                        .map((user) => (
                                            <li
                                                key={user.id}
                                                className={`list-group-item text-capitalize ${selectedUser === user.id ? "active text-white bg-primary" : ""
                                                    }`}
                                                onClick={() => setSelectedUser(user.id)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {user.username || user.email || "Unnamed User"}
                                            </li>
                                        ))}


                                    {users.filter((user) => {
                                        const name = user.name?.toLowerCase() || "";
                                        const username = user.username?.toLowerCase() || "";
                                        const search = searchTerm.toLowerCase();
                                        return name.includes(search) || username.includes(search);
                                    }).length === 0 && (
                                            <li className="list-group-item text-muted">No users found</li>
                                        )}
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
                                        ? users.find((u) => u.id === selectedUser)?.name || "Unnamed User"
                                        : "Select a User"}
                                </h6>
                            </div>


                            {/* Messages */}
                            <div
                                ref={chatContainerRef}
                                className="messages-wrapper d-flex flex-column gap-3 flex-grow-1 overflow-auto p-3"
                            >
                                {selectedUser ? (
                                    messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={msg.senderId === adminId ? "text-end" : "text-start"}
                                        >
                                            <div className="fs-12 text-muted mb-1">
                                                {moment(msg.timestamp).fromNow()}
                                            </div>

                                            <div
                                                className="d-inline-block p-2 rounded shadow-sm"
                                                style={{
                                                    maxWidth: "70%",
                                                    fontSize: "0.9rem",
                                                    backgroundColor: msg.senderId === adminId ? "#0d6efd" : "#f1f1f1",
                                                    color: msg.senderId === adminId ? "white" : "black",
                                                }}
                                            >
                                                {msg.message}
                                            </div>

                                            {msg.senderId === adminId && (
                                                <button onClick={() => deleteMessage(msg.id)} className="btn btn-sm btn-danger ms-2">
                                                    ×
                                                </button>
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
                                        <div className="text-muted small mb-2">
                                            Selected file: {imageName}{" "}
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

export default UserChat;
