import {
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    BAN_USER_FAILURE,
    BAN_USER_REQUEST,
    BAN_USER_SUCCESS,
    UNBAN_USER_FAILURE,
    UNBAN_USER_REQUEST,
    UNBAN_USER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    ASSIGN_MODERATOR_REQUEST,
    ASSIGN_MODERATOR_SUCCESS,
    ASSIGN_MODERATOR_FAILURE,
    ALL_ACTIVITY_LOGS_REQUEST,
    ALL_ACTIVITY_LOGS_SUCCESS,
    ALL_ACTIVITY_LOGS_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    SET_USER_POST_LIMIT_REQUEST,
    SET_USER_POST_LIMIT_FAILURE,
    SET_USER_POST_LIMIT_SUCCESS,
    GET_ACTIVE_BUSINESS_USERS_REQUEST,
    GET_ACTIVE_BUSINESS_USERS_SUCCESS,
    GET_ACTIVE_BUSINESS_USERS_FAIL
} from "../constants/userConstants"


const initialState = {
    users: [],
    userDetails: {},
    loading: false,
    error: null,
};

export const alluserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
        case USER_DETAILS_REQUEST:
        case UPDATE_USER_REQUEST:
        case SET_USER_POST_LIMIT_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, users: action.payload };

        case FETCH_DATA_FAILURE:
        case USER_DETAILS_FAILURE:
        case UPDATE_USER_FAILURE:
        case SET_USER_POST_LIMIT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter((user) => user._id !== action.payload),
            };

        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, userDetails: action.payload };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                ),
            };

        case SET_USER_POST_LIMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map((user) =>
                    user._id === action.payload.userId ? action.payload : user
                ),
            };

        default:
            return state;
    }
};


export const userReducer = (state = { userData: null }, action) => {
    switch (action.type) {
        case BAN_USER_REQUEST:
        case UNBAN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case BAN_USER_SUCCESS:
        case UNBAN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userData: action.payload,
            };
        case BAN_USER_FAILURE:
        case UNBAN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};



export const assignModeratorReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ASSIGN_MODERATOR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ASSIGN_MODERATOR_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case ASSIGN_MODERATOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message || 'An error occurred',
            };
        default:
            return state;
    }
};



export const activityLogReducer = (state = { activityLogs: [], }, action) => {
    switch (action.type) {
        case ALL_ACTIVITY_LOGS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_ACTIVITY_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                activityLogs: action.payload,
                error: null,
            };

        case ALL_ACTIVITY_LOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};





const initialStates = {
    loading: false,
    businessUsers: {
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        newUsers: 0,
    },
    error: null,
};


export const businessUserReducer = (state = initialStates, action) => {
    switch (action.type) {
        case GET_ACTIVE_BUSINESS_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        
        case GET_ACTIVE_BUSINESS_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                businessUsers: action.payload, 
                error: null,
            };

        case GET_ACTIVE_BUSINESS_USERS_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

