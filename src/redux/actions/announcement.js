import API from "../../API";
import axios from "axios"

import {
    SEND_NOTIFICATION_REQUEST,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
    FETCH_ANNOUNCEMENT_LIST_REQUEST,
    FETCH_ANNOUNCEMENT_LIST_FAILURE,
    FETCH_ANNOUNCEMENT_LIST_SUCCESS,
    DELETE_ANNOUNCEMENT_REQUEST,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAILURE
} from "../constants/announcementConstanats"

export const sendAllUsersNotification = (notificationData) => async (dispatch) => {
    dispatch({ type: SEND_NOTIFICATION_REQUEST });
    try {
        const { data } = await API.post('/admin/sendAllUsersNotification', notificationData);

        dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
    }
};


export const fetchAnnouncementList = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ANNOUNCEMENT_LIST_REQUEST });

        const { data } = await API.get('/admin/announcementList', {});

        dispatch({ type: FETCH_ANNOUNCEMENT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_ANNOUNCEMENT_LIST_FAILURE, payload: error.response?.data?.message || 'Failed to fetch announcement list' });
    }
};


export const deleteAnnouncement = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ANNOUNCEMENT_REQUEST });

    try {
        const { data } = await API.post("/admin/deleteAnnouncement", { id });
        dispatch({ type: DELETE_ANNOUNCEMENT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_ANNOUNCEMENT_FAILURE,
            payload: error.response?.data?.message || "Failed to delete note.",
        });
    }
};

