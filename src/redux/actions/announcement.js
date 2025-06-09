import API from "../../API";
import axios from "axios"

import {
    SEND_NOTIFICATION_REQUEST,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE
} from "../constants/announcementConstanats"

export const sendAllUsersNotification = (notificationData) => async (dispatch) => {
    dispatch({ type: SEND_NOTIFICATION_REQUEST }); 
    try {
        const {data} = await API.post('/user/sendAllUsersNotification', notificationData);

        dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: SEND_NOTIFICATION_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
    }
};



