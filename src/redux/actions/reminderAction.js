
import {
  FETCH_REMINDERS_REQUEST,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAILURE,
  SET_GLOBAL_REMINDER_LIMIT_REQUEST,
  SET_GLOBAL_REMINDER_LIMIT_SUCCESS,
  SET_GLOBAL_REMINDER_LIMIT_FAILURE,
  SET_USER_REMINDER_LIMIT_FAILURE,
  SET_USER_REMINDER_LIMIT_SUCCESS,
  SET_USER_REMINDER_LIMIT_REQUEST,
  REMINDER_DETAILS_REQUEST,
  REMINDER_DETAILS_SUCCESS,
  REMINDER_DETAILS_FAILURE,
  DELETE_REMINDER_REQUEST,
  DELETE_REMINDER_SUCCESS,
  DELETE_REMINDER_FAILURE,
  UPDATE_REMINDER_FAILURE,
  UPDATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_REQUEST,
  GET_REMINDER
} from "../constants/reminderConstants";

import API from "../../API";
import axios from "axios";


export const fetchReminders = () => async (dispatch) => {
  dispatch({ type: FETCH_REMINDERS_REQUEST });

  try {
    const { data } = await API.post("/admin/reminderList", {});

    console.log("data reminder", data)
    dispatch({ type: FETCH_REMINDERS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log("reminder error -", error)
    dispatch({ type: FETCH_REMINDERS_FAILURE, payload: error.message || "Failed to reminders notes" });
  }
};


export const getReminder = (reminderId) => async (dispatch) => {
  try {
    console.log('reminder Id : ', reminderId);
    dispatch({ type: GET_REMINDER, payload: reminderId })
  } catch (error) {
    console.log(error);
  }
};

export const setUserReminderLimit = (user_Id, limit, action) => async (dispatch) => {
  try {

    dispatch({ type: SET_USER_REMINDER_LIMIT_REQUEST });

    const { data } = await API.post("/admin/setUserReminderLimit", { user_Id, limit, action });

    dispatch({ type: SET_USER_REMINDER_LIMIT_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: SET_USER_REMINDER_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
  }
};


export const SetGlobalReminderLimit = (action, limit) => async (dispatch) => {
  try {

    dispatch({ type: SET_GLOBAL_REMINDER_LIMIT_REQUEST });
    console.log(action, limit)
    const { data } = await API.post("/admin/setGlobalReminderLimit", { action, limit });

    dispatch({ type: SET_GLOBAL_REMINDER_LIMIT_SUCCESS, payload: data });

  } catch (error) {
    console.log(error)
    dispatch({ type: SET_GLOBAL_REMINDER_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
  }
};


export const fetchReminderDetails = (reminderID) => async (dispatch) => {
  dispatch({ type: REMINDER_DETAILS_REQUEST });

  try {
    const { data } = await API.post("/admin/reminderDetails", { reminder_id: reminderID });
    dispatch({ type: REMINDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: REMINDER_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch note details",
    });
  }
};


export const deleteReminder = (reminder_id) => async (dispatch) => {
  dispatch({ type: DELETE_REMINDER_REQUEST });
  try {
    const { data } = await API.post("/admin/deleteReminder", { reminder_id });
    console.log(data)
    dispatch({ type: DELETE_REMINDER_SUCCESS, payload: reminder_id });
  } catch (error) {
    console.log(error)
    dispatch({
      type: DELETE_REMINDER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete note.",
    });
  }
};



export const updateReminder = (reminderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REMINDER_REQUEST });
    const { data } = await API.post("/admin/updateReminder", reminderData);
    dispatch({
      type: UPDATE_REMINDER_SUCCESS,
      payload: data,
    });
    console.log(reminderData)
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_REMINDER_FAILURE, payload: error.response?.data?.message || "Failed to update reminder." });
  }
};
