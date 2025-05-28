import { DELETE_FREQUENCY_SUCCESS, GET_ALL_FREQUENCY_FAIL, GET_ALL_FREQUENCY_REQUEST, GET_ALL_FREQUENCY_SUCCESS } from "../constants/frequencyConstants";


const initialState = {
    frequency: [],
    loading: false,
    error: null
};

export const frequencyReducer = (state = initialState, action) => {
    switch (action.type) {
        // Get All Reports
        case GET_ALL_FREQUENCY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_FREQUENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                frequency: action.payload
            };
        case GET_ALL_FREQUENCY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case DELETE_FREQUENCY_SUCCESS:
            return {
                ...state,
                frequency: state.frequency.filter((item) => item._id !== action.payload),
            };



        default:
            return state;
    }
};
