import API from "../../API";

import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  ASSIGN_MODERATOR_REQUEST,
  ASSIGN_MODERATOR_SUCCESS,
  ASSIGN_MODERATOR_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  BAN_USER_REQUEST,
  BAN_USER_FAILURE,
  BAN_USER_SUCCESS,
  UNBAN_USER_REQUEST,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ALL_ACTIVITY_LOGS_REQUEST,
  ALL_ACTIVITY_LOGS_FAIL,
  ALL_ACTIVITY_LOGS_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  SET_USER_POST_LIMIT_REQUEST,
  SET_USER_POST_LIMIT_SUCCESS,
  SET_USER_POST_LIMIT_FAILURE,
  GET_ACTIVE_BUSINESS_USERS_REQUEST,
  GET_ACTIVE_BUSINESS_USERS_SUCCESS,
  GET_ACTIVE_BUSINESS_USERS_FAIL
} from "../constants/userConstants";


export const fetchData = () => async (dispatch) => {
  dispatch({ type: FETCH_DATA_REQUEST });

  try {
    const { data } = await API.post("/admin/getUsersList", {});
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


export const fetchUserDetails = (userId) => async (dispatch) => {

  try {

    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await API.post("/admin/getUserDetails", { user_id: userId });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch user details", // Dispatch error message
    });
  }
};


export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    console.log("userData: ", userData)
    const { data } = await API.post("/admin/updateUser", userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
    console.log(data)
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.response?.data?.message || "Failed to update reminder." });
  }
};


export const deleteUser = (user_id) => async (dispatch) => {

  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await API.post("admin/deleteUser", { user_id });
    dispatch({ type: DELETE_USER_SUCCESS, payload: user_id });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response?.data?.message || "Failed to delete note.",
    });
  }
};


export const assignModeratorRole = (userId) => async (dispatch) => {

  try {
    dispatch({ type: ASSIGN_MODERATOR_REQUEST });
    const { data } = await API.post('/admin/assign-moderator', { user_id: userId });

    dispatch({
      type: ASSIGN_MODERATOR_SUCCESS,
      payload: data,
    });
    console.log(data)
  } catch (error) {
    console.log(error)
    dispatch({
      type: ASSIGN_MODERATOR_FAILURE,
      payload: error.response ? error.response.data : { message: "An error occurred" },
    });
  }
};


export const banUser = (userData) => async (dispatch) => {
  dispatch({ type: BAN_USER_REQUEST });

  try {
    const { data } = await API.post("/admin/banUser", userData);
    dispatch({ type: BAN_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("banUser", error);
    dispatch({
      type: BAN_USER_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


export const unbanUser = (user_id) => async (dispatch) => {
  dispatch({ type: UNBAN_USER_REQUEST });

  try {
    const { data } = await API.post("/admin/unbanUser", { user_id });
    dispatch({ type: UNBAN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNBAN_USER_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


export const fetchAllActivityLogs = () => async (dispatch) => {
  dispatch({ type: ALL_ACTIVITY_LOGS_REQUEST });
  try {
    const { data } = await API.post("/admin/allActivityLogs", {});
    console.log(data.data)
    dispatch({ type: ALL_ACTIVITY_LOGS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_ACTIVITY_LOGS_FAIL,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


export const setUserPostLimit = (user_id, action, limit) => async (dispatch) => {
  try {
    dispatch({ type: SET_USER_POST_LIMIT_REQUEST });

    const { data } = await API.post("/admin/setUserPostLimit", { user_id, action, limit });

    dispatch({type: SET_USER_POST_LIMIT_SUCCESS,payload: data.data});

  } catch (error) {
    console.log(error)
    dispatch({
      type: SET_USER_POST_LIMIT_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};




export const getActiveBusinessUsers = () => async (dispatch) => {
  try {
      dispatch({ type: GET_ACTIVE_BUSINESS_USERS_REQUEST });

      const { data } = await API.post("/admin/getActiveUsersforBusiness");

      dispatch({
          type: GET_ACTIVE_BUSINESS_USERS_SUCCESS,
          payload: data.data, // Contains daily, weekly, monthly, and new users
      });
  } catch (error) {
      dispatch({
          type: GET_ACTIVE_BUSINESS_USERS_FAIL,
          payload: error.response?.data?.message || "Something went wrong",
      });
  }
};