import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNoteDetails, getNote } from "../../redux/actions/noteAction";
import UserImage from "../../assets/images/no-data.jpg"

const NoteDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { note, loading, error } = useSelector((state) => state.allNotes);
  console.log(note)

  useEffect(() => {
    if (id) {
      dispatch(getNote(id))
    }
  }, [dispatch, id]);

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            {/* Image Section */}
            <div className="d-flex justify-content-center p-3" style={{ maxHeight: "300px", overflow: "hidden" }}>
              <img
                src={note?.image || UserImage}
                alt="Note"
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
                  <p className="mt-3">Fetching Note Details...</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <p className="mb-3">
                    <strong>Title:</strong> {note?.title}
                  </p>
                  <p className="mb-3">
                    <strong>Description:</strong> {note?.description}
                  </p>
                  <p className="mb-3">
                    <strong>User ID:</strong> {note?.user_id && note?.user_id.full_name}
                  </p>
                  <p className="mb-3">
                    <strong>Total Views:</strong> {note?.total_view}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="mb-3">
                    <strong>Total Likes:</strong> {note?.total_like}
                  </p>
                  <p className="mb-3">
                    <strong>Total Shares:</strong> {note?.total_share}
                  </p>
                  <p className="mb-3">
                    <strong>Total Comments:</strong> {note?.total_comment}
                  </p>
                  <p className="mb-3">
                    <strong>Total Bookmarks:</strong> {note?.total_bookmark}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
