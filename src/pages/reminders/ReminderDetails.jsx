import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminderDetails, getReminder } from "../../redux/actions/reminderAction";
import fallbackImage from "../../assets/images/bg-banner1.jpg";

const ReminderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, reminder, error } = useSelector((state) => state.allReminders);

  // useEffect(() => {
  //   dispatch(fetchReminderDetails(id));
  // }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getReminder(id))
    }
  }, [dispatch, id]);

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            {/* Image Section */}
            {reminder?.image && (
              <div className="d-flex justify-content-center p-3" style={{ maxHeight: "300px", overflow: "hidden" }}>
                <img
                  src={reminder.image || fallbackImage}
                  alt="Reminder"
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <div className="card-body">
              {loading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Fetching Reminder Details...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              {reminder && !loading && (
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Title:</strong> {reminder.reminder_title}
                    </p>
                    <p className="mb-3">
                      <strong>Description:</strong> {reminder.reminder_description}
                    </p>
                    <p className="mb-3">
                      <strong>User ID:</strong> {reminder.user_id}
                    </p>
                    <p className="mb-3">
                      <strong>Phone:</strong> {reminder.phone}
                    </p>
                    <p className="mb-3">
                      <strong>Category:</strong> {reminder.category}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <p className="mb-3">
                      <strong>Subcategory:</strong> {reminder.sub_category}
                    </p>
                    <p className="mb-3">
                      <strong>Due Date:</strong> {reminder.set_due}
                    </p>
                    <p className="mb-3">
                      <strong>Time:</strong> {reminder.set_time}
                    </p>
                    <p className="mb-3">
                      <strong>Frequency:</strong> {reminder.frequency}
                    </p>
                    <p className="mb-3">
                      <strong>Location:</strong> {reminder.location}
                    </p>
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

export default ReminderDetails;
