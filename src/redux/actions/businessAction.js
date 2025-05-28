
import API from "../../API";

import {
    GET_ALL_BUSINESSES_REQUEST,
    GET_ALL_BUSINESSES_SUCCESS,
    GET_ALL_BUSINESSES_FAILURE,
    GET_BUSINESS,
    UPDATE_BUSINESS_FAILURE,
    UPDATE_BUSINESS_SUCCESS,
    UPDATE_BUSINESS_REQUEST,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAILURE,
    DELETE_BUSINESS_REQUEST,
    SET_GLOBAL_BUSINESS_WALL_LIMIT_REQUEST,
    SET_GLOBAL_BUSINESS_WALL_LIMIT_FAILURE,
    SET_GLOBAL_BUSINESS_WALL_LIMIT_SUCCESS,
    SET_BUSINESS_WALL_LIMIT_FAILURE,
    SET_BUSINESS_WALL_LIMIT_SUCCESS,
    SET_BUSINESS_WALL_LIMIT_REQUEST,
} from "../constants/businessConstanst";


export const getAllBusinesses = () => async (dispatch) => {

    try {
        dispatch({ type: GET_ALL_BUSINESSES_REQUEST });
        const { data } = await API.post("/admin/businessList", {});
        // console.log("businness", data);
        dispatch({ type: GET_ALL_BUSINESSES_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_BUSINESSES_FAILURE, payload: error.response?.data?.message || "Failed to fetch notes" });
    }
};


export const getBusiness = (businessId) => async (dispatch) => {
    try {
        console.log('businessId : ', businessId);
        dispatch({ type: GET_BUSINESS, payload: businessId })
    } catch (error) {
        console.log(error);
    }
};

export const getBusinessDetails = (business_id) => async (dispatch) => {
    try {
        console.log('businessId : ', business_id);
        const { data } = await API.post("/admin/businessDetails", {business_id});
        console.log(data)
    } catch (error) {
        console.log(error);
    }
};

export const updateBusiness = (businessData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BUSINESS_REQUEST });
        const { data } = await API.post("/admin/updateBusinessProfile", businessData);
        dispatch({ type: UPDATE_BUSINESS_SUCCESS, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({ type: UPDATE_BUSINESS_FAILURE, payload: error.response?.data?.message || "Failed to update reminder." });
    }
};

export const deleteBusiness = (business_id) => async (dispatch) => {
    dispatch({ type: DELETE_BUSINESS_REQUEST });

    try {
        const { data } = await API.post("/admin/deleteBusiness", { business_id });
        dispatch({ type: DELETE_BUSINESS_SUCCESS, payload: business_id });
    } catch (error) {
        dispatch({
            type: DELETE_BUSINESS_FAILURE,
            payload: error.response?.data?.message || "Failed to delete note.",
        });
    }
};


export const SetGlobalBusinessWallLimit = (action, limit) => async (dispatch) => {
    try {

        dispatch({ type: SET_GLOBAL_BUSINESS_WALL_LIMIT_REQUEST });
        console.log(action, limit)
        const { data } = await API.post("/admin/setGlobalBusinessWallLimit", { action, limit });

        dispatch({ type: SET_GLOBAL_BUSINESS_WALL_LIMIT_SUCCESS, payload: data });

    } catch (error) {
        console.log(error)
        dispatch({ type: SET_GLOBAL_BUSINESS_WALL_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
    }
};

export const setBusinessWallLimit = (user_id, action, limit) => async (dispatch) => {
    try {

        dispatch({ type: SET_BUSINESS_WALL_LIMIT_REQUEST });

        const { data } = await API.post("/admin/setBusinessWallLimit", { user_id, action, limit });

        dispatch({ type: SET_BUSINESS_WALL_LIMIT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: SET_BUSINESS_WALL_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
    }
};