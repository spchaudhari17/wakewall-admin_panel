import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot, addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./Chat.css";
import { useLocation } from "react-router-dom";

const BusinessChat = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const businessId = queryParams.get("businessId");

    // const adminId = "681c0eb3197845464e2c1518";
    const adminId = "686220f6fea7d3cd0058fd9f";
    const adminName = "Admin";
    // const adminImage = "https://rlanbucket.s3.us-west-1.amazonaws.com/profile-images/1748513238619_wakewall.png";
    const adminImage = "https://rlanbucket.s3.us-west-1.amazonaws.com/profile-images/1786678678744_512%20x%20512%20new%20logo.png";

    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(businessId || null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [chatListData, setChatListData] = useState({});
    const [sortedBusinesses, setSortedBusinesses] = useState([]);

    const chatContainerRef = useRef(null);

    // Fetch businesses from Firestore
    useEffect(() => {
        const businessesRef = collection(db, "production", "production_document", "business");
        const unsubscribe = onSnapshot(businessesRef, (snapshot) => {
            const businessList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBusinesses(businessList);
        });

        return () => unsubscribe();
    }, []);

    console.log("businesses firestore", businesses)

    // Track all chat list data for unread counts and last message time
    useEffect(() => {
        const chatListRef = collection(db, "production", "production_document", "chatList");
        const unsubscribe = onSnapshot(chatListRef, (snapshot) => {
            const data = {};
            snapshot.forEach((doc) => {
                const chat = doc.data();
                const [id1, id2] = doc.id.split("-");
                const businessId = id1 === adminId ? id2 : id1;

                // Only include business chats
              
                    data[businessId] = {
                        unreadCount: chat.lastSenderId !== adminId && !chat.isRead ? 1 : 0,
                        lastMessageTime: chat.lastMessageTime || "1970-01-01 00:00:00"
                    };
                
            });
            setChatListData(data);
        });

        return () => unsubscribe();
    }, []);

    // Sort businesses by last message time (newest first)
    useEffect(() => {
        const sorted = [...businesses].sort((a, b) => {
            const timeA = chatListData[a.id]?.lastMessageTime || "1970-01-01 00:00:00";
            const timeB = chatListData[b.id]?.lastMessageTime || "1970-01-01 00:00:00";
            return moment(timeB).valueOf() - moment(timeA).valueOf();
        });
        setSortedBusinesses(sorted);
    }, [businesses, chatListData]);

    // Fetch messages and handle read status for selected business
    useEffect(() => {
        if (!selectedBusiness) return;

        const chatId = adminId < selectedBusiness ? `${adminId}-${selectedBusiness}` : `${selectedBusiness}-${adminId}`;
        const messagesRef = collection(db, "production", "production_document", "chats", chatId, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        // Mark chat as read when opened
        const markChatAsRead = async () => {
            try {
                const chatListRef = doc(db, "production", "production_document", "chatList", chatId);

                // Update only the necessary fields without overwriting others
                await updateDoc(chatListRef, {
                    isRead: true,
                    lastReadTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    // type: "BusinessToBusiness"
                });

                console.log("Business chat marked as read successfully");
            } catch (error) {
                console.error("Error marking business chat as read:", error);
            }
        };

        markChatAsRead();

        return () => {
            unsubscribeMessages();
        };
    }, [selectedBusiness]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!selectedBusiness || !newMessage.trim()) return;

        setLoading(true);
        const receiver = businesses.find((b) => b.id === selectedBusiness);
        const chatId = adminId < selectedBusiness ? `${adminId}-${selectedBusiness}` : `${selectedBusiness}-${adminId}`;
        const messagesRef = collection(db, "production", "production_document", "chats", chatId, "messages");
        const chatListRef = doc(db, "production", "production_document", "chatList", chatId);
        const timeNow = moment().format("YYYY-MM-DD HH:mm:ss");

        const messagePayload = {
            message: newMessage.trim(),
            msgType: "text",
            senderId: adminId,
            senderName: adminName,
            senderImage: adminImage,
            receiverId: selectedBusiness,
            receiverName: receiver?.name || "Business",
            receiverImage: receiver?.logo || "",
            timestamp: timeNow
        };

        try {
            await addDoc(messagesRef, messagePayload);

            const chatListPayload = {
                lastMessage: messagePayload.message,
                lastMessageTime: timeNow,
                lastSenderId: adminId,
                lastReceiverId: selectedBusiness,
                senderName: adminName,
                senderImage: adminImage,
                receiverName: receiver?.name || "Business",
                receiverImage: receiver?.logo || "",
                isRead: false,
                type: "BusinessToBusiness",
                deletedBy: ""
            };

            await setDoc(chatListRef, chatListPayload, { merge: true });
        } catch (error) {
            console.error("Error sending message to business:", error);
        } finally {
            setNewMessage("");
            setLoading(false);
        }
    };

    const deleteMessage = async (messageId) => {
        if (!selectedBusiness || !messageId) return;

        const chatId = adminId < selectedBusiness
            ? `${adminId}-${selectedBusiness}`
            : `${selectedBusiness}-${adminId}`;

        const messageRef = doc(db, "production", "production_document", "chats", chatId, "messages", messageId);

        try {
            await deleteDoc(messageRef);
        } catch (error) {
            console.error("Failed to delete business message:", error);
        }
    };

    return (
        <div className="support-chat-page overflow-hidden py-3">
            <div className="container-fluid">
                <div className="row gx-0 gy-3">
                    {/* Sidebar */}
                    <div className="col-md-4 col-xl-3">
                        <div className="sidebar-section bg-light border-end d-flex flex-column p-3">
                            <h6 className="text-primary fw-bold">Business Chats</h6>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search by business name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <div className="list-group-wrapper flex-grow-1 overflow-auto">
                                <ul className="list-group">
                                    {sortedBusinesses
                                        .filter((business) => {
                                            const name = business.name?.toLowerCase() || "";
                                            const search = searchTerm.toLowerCase();
                                            return name.includes(search);
                                        })
                                        .map((business) => (
                                            <li
                                                key={business.id}
                                                className={`list-group-item text-capitalize ${selectedBusiness === business.id ? "active text-white bg-primary" : ""}`}
                                                onClick={() => setSelectedBusiness(business.id)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span>{business.name || "Unnamed Business"}</span>
                                                {chatListData[business.id]?.unreadCount > 0 && (
                                                    <span className="badge bg-danger rounded-pill ms-2">
                                                        {chatListData[business.id].unreadCount}
                                                    </span>
                                                )}
                                            </li>
                                        ))}

                                    {sortedBusinesses.filter((business) => {
                                        const name = business.name?.toLowerCase() || "";
                                        const search = searchTerm.toLowerCase();
                                        return name.includes(search);
                                    }).length === 0 && (
                                            <li className="list-group-item text-muted">No businesses found</li>
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
                                    {selectedBusiness
                                        ? businesses.find((b) => b.id === selectedBusiness)?.name || "Unnamed Business"
                                        : "Select a Business"}
                                </h6>
                            </div>

                            <div
                                ref={chatContainerRef}
                                className="messages-wrapper d-flex flex-column gap-3 flex-grow-1 overflow-auto p-3"
                            >
                                {selectedBusiness ? (
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
                                                <button
                                                    onClick={() => deleteMessage(msg.id)}
                                                    className="btn btn-sm btn-danger ms-2"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted text-center">Select a business to view the chat.</p>
                                )}
                            </div>

                            {/* Input Section */}
                            {selectedBusiness && (
                                <div className="bg-white border-top p-3">
                                    <div className="d-flex border rounded-3 overflow-hidden">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-none"
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            disabled={loading}
                                        />
                                        <button
                                            className="btn btn-primary border-0 rounded-0 px-4"
                                            onClick={sendMessage}
                                            disabled={loading || !newMessage.trim()}
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

export default BusinessChat;