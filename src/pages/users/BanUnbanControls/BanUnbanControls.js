import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { banUser, unbanUser } from "../../../redux/actions/userAction";
import { fetchUserDetails } from "../../../redux/actions/userAction";

const BanUnbanControls = ({ userId, dispatch, userDetails, setUserDetails }) => {

    const [banDuration, setBanDuration] = useState("");
    const [banReason, setBanReason] = useState("");
    const [isBanning, setIsBanning] = useState(false);

    const refreshUserDetails = async () => {
        try {
            const updatedDetails = await dispatch(fetchUserDetails(userId));
            setUserDetails(updatedDetails);
        } catch (err) {
            console.error("Failed to refresh user details", err);
        }
    };

    const handleBanUser = async () => {
        setIsBanning(true);
        try {
            const isPermanent = banDuration === "permanent";
            const duration = isPermanent ? 0 : parseInt(banDuration, 10);
            const userData = {
                user_id: userId,
                ban_duration: duration,
                reason: banReason || "Violation of rules",
                is_permanent: isPermanent,
            };

            await dispatch(banUser(userData));

            toast.success("User banned successfully!");
            setBanDuration("");
            setBanReason("");

            // Refresh user details
            await refreshUserDetails();

        } catch (err) {
            toast.error("Failed to ban user");
        } finally {
            setIsBanning(false);
        }
    };

    const handleUnbanUser = async () => {
        setIsBanning(true);
        try {
            await dispatch(unbanUser(userId));

            toast.success("User unbanned successfully!");

            // Refresh user details
            await refreshUserDetails();
        } catch (err) {
            toast.error("Failed to unban user");
        } finally {
            setIsBanning(false);
        }
    };

    return (
        <div className="global-banning mt-4">
            <div className="heading fs-6 fw-bold text-capitalize mb-3">
                Global User Banning/Unbanning
            </div>

            <div className="d-flex gap-3 align-items-center mb-3">
                <select
                    className="form-select w-auto"
                    value={banDuration}
                    onChange={(e) => setBanDuration(e.target.value)}
                    aria-label="Select ban duration"
                    disabled={userDetails?.is_banned}
                >
                    <option value="" disabled>
                        Select Ban Duration
                    </option>
                    <option value="24">1 Day</option>
                    <option value="168">7 Days</option>
                    <option value="permanent">Permanent</option>
                </select>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ban Reason"
                    value={banReason}
                    style={{ width: "30%" }}
                    onChange={(e) => setBanReason(e.target.value)}
                    disabled={userDetails?.is_banned}
                />
                <button
                    className="btn btn-danger"
                    onClick={handleBanUser}
                    disabled={isBanning || userDetails?.is_banned}
                >
                    {isBanning ? "Banning..." : "Ban User"}
                </button>
                <button
                    className="btn btn-success"
                    onClick={handleUnbanUser}
                    disabled={isBanning || !userDetails?.is_banned}
                >
                    {isBanning ? "Unbanning..." : "Unban User"}
                </button>
            </div>

            {userDetails?.is_banned && (
                <p style={{ color: "red" }}>
                    Ban Reason: {userDetails?.ban_reason || "No reason provided"}
                </p>
            )}

            <div className="text-muted small">
                Use this tool to temporarily or permanently ban users for
                inappropriate behavior.
            </div>
        </div>
    );
};

export default BanUnbanControls;
