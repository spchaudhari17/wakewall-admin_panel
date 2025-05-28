import API from "../../API";
import { CREATE_FREQUENCY_FAIL, CREATE_FREQUENCY_REQUEST, CREATE_FREQUENCY_SUCCESS, DELETE_FREQUENCY_FAIL, DELETE_FREQUENCY_REQUEST, DELETE_FREQUENCY_SUCCESS, GET_ALL_FREQUENCY_FAIL, GET_ALL_FREQUENCY_REQUEST, GET_ALL_FREQUENCY_SUCCESS } from "../constants/frequencyConstants";



export const getAllFrequency = () => async (dispatch) => {
    dispatch({ type: GET_ALL_FREQUENCY_REQUEST });

    try {
        const { data } = await API.get("/user/getFrequency", {});
        console.log("frequency", data);
        dispatch({ type: GET_ALL_FREQUENCY_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_FREQUENCY_FAIL,
            payload: error.response?.data?.message || "Failed to fetch reports",
        });
    }
};


export const createFrequency = (category_name) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_FREQUENCY_REQUEST });

        const { data } = await API.post("/user/createFrequncy", { category_name });

        dispatch({ type: CREATE_FREQUENCY_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
            type: CREATE_FREQUENCY_FAIL,
            payload: error.response?.data?.message || "Failed to create frequency",
        });
    }
};


export const deleteFrequency = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FREQUENCY_REQUEST });

        await API.post("/user/deleteFrequency", { id }); // POST, not DELETE as per your backend

        dispatch({ type: DELETE_FREQUENCY_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_FREQUENCY_FAIL,
            payload: error.response?.data?.message || "Failed to delete frequency",
        });
    }
};