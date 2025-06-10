import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWall } from "../../redux/actions/wallAction";
import fallbackImage from "../../assets/images/no-data.jpg";
import dummyUser from "../../assets/images/dummy_profile.png";

const WallDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { wall, loading, error } = useSelector((state) => state.allWalls);

  useEffect(() => {
    if (id) {
      dispatch(getWall(id));
    }
  }, [dispatch, id]);

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            {/* Media Section */}
            {wall?.file && (
              <div
                className="d-flex justify-content-center p-3"
                style={{ maxHeight: "300px", overflow: "hidden" }}
              >
                {wall.media_type === "video" ? (
                  <video
                    src={wall.file}
                    controls
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={wall.file || fallbackImage}
                    alt="Wall"
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            )}

            <div className="card-body">
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Fetching Wall Details...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {wall && !loading && (
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Title:</strong> {wall.title || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Details:</strong> {wall.details || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Wall Type:</strong> {wall.wall_type || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Allow Comments:</strong>{" "}
                      {wall.allow_comment || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Hashtag:</strong> {wall.hash_tag || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Created At:</strong>{" "}
                      {new Date(wall.createdAt).toLocaleString() || "N/A"}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Media Type:</strong> {wall.media_type || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Total Views:</strong> {wall.total_view || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Likes:</strong> {wall.total_like || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Comments:</strong> {wall.total_comment || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Bookmarks:</strong>{" "}
                      {wall.total_bookmark || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Shares:</strong> {wall.total_share || 0}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* User Section */}
            {wall?.user_id && (
              <div className="card-footer bg-light">
                <h6 className="mb-3">User Details:</h6>
                <div className="d-flex align-items-center">
                  <img
                    src={wall.user_id.profile_pic || dummyUser}
                    alt="User"
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-1">
                      <strong>Name:</strong> {wall.user_id.full_name || "N/A"}
                    </p>
                    <p className="mb-0">
                      <strong>Username:</strong> {wall.user_id.username || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallDetails;
