import API from "../../API";
import { GET_ALL_REPORTS_FAIL, GET_ALL_REPORTS_REQUEST, GET_ALL_REPORTS_SUCCESS, REVIEW_REPORT_FAIL, REVIEW_REPORT_REQUEST, REVIEW_REPORT_SUCCESS } from "../constants/report";



export const getAllReports = () => async (dispatch) => {
    dispatch({ type: GET_ALL_REPORTS_REQUEST });

    try {
        const { data } = await API.post("/admin/getAllReports", {});
        console.log("reports", data);
        dispatch({ type: GET_ALL_REPORTS_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_REPORTS_FAIL,
            payload: error.response?.data?.message || "Failed to fetch reports",
        });
    }
};


export const reviewReport = (reportId, status) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_REPORT_REQUEST });
        const { data } = await API.post("/admin/reviewReport", { reportId, status });
        dispatch({ type: REVIEW_REPORT_SUCCESS, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({ type: REVIEW_REPORT_FAIL, payload: error.response?.data?.message || "Failed to update reminder." });
    }
};



export const deleteReport = (reportId) => async (dispatch) => {
   

    try {
        const { data } = await API.post("/admin/deleteReport", { reportId });
        dispatch({ type: "DELETE_REPORT_SUCCESS", payload: reportId });
    } catch (error) {
        dispatch({
            type: "DELETE_REPORT_FAILURE",
            payload: error.response?.data?.message || "Failed to delete note.",
        });
    }
};