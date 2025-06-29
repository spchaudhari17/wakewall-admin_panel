import { DELETE_ANNOUNCEMENT_SUCCESS, FETCH_ANNOUNCEMENT_LIST_FAILURE, FETCH_ANNOUNCEMENT_LIST_REQUEST, FETCH_ANNOUNCEMENT_LIST_SUCCESS } from "../constants/announcementConstanats";



const initialState = {
    loading: false,
    announcements: [],
    error: null,
};


export const announcementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ANNOUNCEMENT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_ANNOUNCEMENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                announcements: action.payload,
            };

        case FETCH_ANNOUNCEMENT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                announcements: state.announcements.filter(announcement => announcement._id !== action.payload),
            };

        default:
            return state;
    }
};
