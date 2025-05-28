import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../redux/actions/businessAction";
import PlaceholderImage from "../../assets/images/bg-banner1.jpg"; // Replace with an appropriate placeholder image path

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { business, loading, error } = useSelector((state) => state.allBusinesses);
  console.log(business)

  useEffect(() => {
    if (id) {
      dispatch(getBusiness(id));
    }
  }, [dispatch, id]);

  const navigateUser = () => {
    navigate(`/user-details/${business?.user_id?._id}`)
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg">
            {/* Cover Image Section */}
            <div
              className="d-flex justify-content-center p-3"
              style={{
                maxHeight: "250px",
                overflow: "hidden",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <img
                src={business?.cover_pic || PlaceholderImage}
                alt="Business Cover"
                className="img-fluid rounded"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="card-body">
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Fetching Business Details...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {business && (
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <h5 className="mb-3">
                      {/* <strong>{business?.business_name}</strong> */}
                      <strong>Business Name:</strong> {business?.business_name || "N/A"}
                    </h5>
                    <p className="mb-3">
                      <strong>Username:</strong> {business?.business_username || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Description:</strong> {business?.description || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Business Type:</strong> {business?.business_type || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Phone:</strong> {business?.phone || "N/A"}
                    </p>
                    <p className="mb-3">
                      <strong>Website:</strong> {business?.website || "N/A"}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Total Subscribers:</strong> {business?.total_subscriber || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Views:</strong> {business?.total_view || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Likes:</strong> {business?.total_like || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Shares:</strong> {business?.total_share || 0}
                    </p>
                    <p className="mb-3">
                      <strong>Total Bookmarks:</strong> {business?.total_bookmark || 0}
                    </p>
                  </div>
                </div>
              )}

              {/* Owner Details */}
              <div className="mt-4">
                <h5 className="mb-3">Owner Details</h5>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={business?.profile_pic?.profile_pic || PlaceholderImage}
                    alt="Owner"
                    className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <p className="mb-1">
                      <strong>Business Owner Name:</strong> {business?.user_id?.full_name || "N/A"}
                    </p>
                    <p className="mb-0">
                      <strong>Email:</strong> {business?.user_id?.email || "N/A"}
                    </p>
                    <Link to={`/user-details/${business?.user_id?._id}`} className="text-primary fw-medium fs-12">
                      View User Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
