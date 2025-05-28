import {
    GET_ALL_REPORTS_REQUEST,
    GET_ALL_REPORTS_SUCCESS,
    GET_ALL_REPORTS_FAIL,
    REVIEW_REPORT_REQUEST,
    REVIEW_REPORT_SUCCESS,
    REVIEW_REPORT_FAIL
} from "../constants/report";

const initialState = {
    reports: [],
    updatedReport: null,
    loading: false,
    error: null
};

export const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        // Get All Reports
        case GET_ALL_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: action.payload
            };
        case GET_ALL_REPORTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // Review Report
        case REVIEW_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REVIEW_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                updatedReport: action.payload,
                // Optionally update the reports array too
                reports: state.reports.map((report) =>
                    report._id === action.payload._id ? action.payload : report
                )
            };
        case REVIEW_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
