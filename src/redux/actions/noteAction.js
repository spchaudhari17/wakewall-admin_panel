import API from "../../API";
import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  NOTE_DETAILS_REQUEST,
  NOTE_DETAILS_FAILURE,
  NOTE_DETAILS_SUCCESS,
  SET_USER_NOTE_LIMIT_REQUEST,
  SET_USER_NOTE_LIMIT_SUCCESS,
  SET_USER_NOTE_LIMIT_FAILURE,
  SET_GLOBAL_NOTE_LIMIT_REQUEST,
  SET_GLOBAL_NOTE_LIMIT_SUCCESS,
  SET_GLOBAL_NOTE_LIMIT_FAILURE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_FAILURE,
  GET_NOTE
} from "../constants/noteConstants";



export const fetchNotes = () => async (dispatch) => {
  dispatch({ type: FETCH_NOTES_REQUEST });

  try {
    const { data } = await API.post("/admin/noteList", {});
    console.log("notes", data);
    dispatch({ type: FETCH_NOTES_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_NOTES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch notes",
    });
  }
};


export const getNote = (noteId) => async (dispatch) => {
  try {
    console.log('noteId : ', noteId);
    dispatch({ type: GET_NOTE, payload: noteId })
  } catch (error) {
    console.log(error);
  }
};



export const deleteNote = (note_id) => async (dispatch) => {
  dispatch({ type: DELETE_NOTE_REQUEST });

  try {
    const { data } = await API.post("/admin/deleteNote", { note_id });
    dispatch({ type: DELETE_NOTE_SUCCESS, payload: note_id });
  } catch (error) {
    dispatch({
      type: DELETE_NOTE_FAILURE,
      payload: error.response?.data?.message || "Failed to delete note.",
    });
  }
};


export const fetchNoteDetails = (noteId) => async (dispatch) => {
  dispatch({ type: NOTE_DETAILS_REQUEST });

  try {
    const { data } = await API.post("/admin/noteDetails", { note_id: noteId });
    dispatch({ type: NOTE_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: NOTE_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch note details",
    });
  }
};


export const updateNote = (noteData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTE_REQUEST });
    const { data } = await API.post("/admin/updateNote", noteData);
    dispatch({type: UPDATE_NOTE_SUCCESS,payload: data});
    console.log(data)
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_NOTE_FAILURE, payload: error.response?.data?.message || "Failed to update reminder." });
  }
};


export const setUserNoteLimit = (user_Id, limit, action) => async (dispatch) => {
  try {

    dispatch({ type: SET_USER_NOTE_LIMIT_REQUEST });

    const { data } = await API.post("/admin/setUserNoteLimit", { user_Id, limit, action }); // Relative path

    dispatch({ type: SET_USER_NOTE_LIMIT_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: SET_USER_NOTE_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
  }
};


export const SetGlobalNoteLimit = (action, limit) => async (dispatch) => {
  try {

    dispatch({ type: SET_GLOBAL_NOTE_LIMIT_REQUEST });
    console.log(action, limit)
    const { data } = await API.post("/admin/setGlobalNoteLimit", { action, limit });

    dispatch({ type: SET_GLOBAL_NOTE_LIMIT_SUCCESS, payload: data });

  } catch (error) {
    console.log(error)
    dispatch({ type: SET_GLOBAL_NOTE_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
  }
};



