// src/reducers/dashboardReducer.js
import {
    FETCH_ACTIVE_USERS_REQUEST,
    FETCH_ACTIVE_USERS_SUCCESS,
    FETCH_ACTIVE_USERS_FAILURE,
    FETCH_STATISTICS_REQUEST,
    FETCH_STATISTICS_SUCCESS,
    FETCH_STATISTICS_FAILURE
} from '../constants/dashboardConstants';

const initialState = {
    loading: false,
    totalUsers: 0,
    newUsersLast30Days: 0,
    totalBusinesses: 0,
    newBusinessesLast30Days: 0,
    activeUsers: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        totalUsers:0,
        activeUsers:0,
        inactiveUsers:0,
        newUsers:0,
    },
    error: null
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATISTICS_REQUEST:
        case FETCH_ACTIVE_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_STATISTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                totalUsers: action.payload.totalUsers,
                newUsersLast30Days: action.payload.newUsersLast30Days,
                totalBusinesses: action.payload.totalBusinesses,
                newBusinessesLast30Days: action.payload.newBusinessesLast30Days,
                error: null
            };
        case FETCH_ACTIVE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                activeUsers: {
                    daily: action.payload.dailyActiveUsers,
                    weekly: action.payload.weeklyActiveUsers,
                    monthly: action.payload.monthlyActiveUsers,
                    totalUsers: action.payload.totalUsers,
                    activeUsers: action.payload.activeUsers,
                    inactiveUsers: action.payload.inactiveUsers,
                    newUsers: action.payload.newUsers,
                },
                error: null
            };
        case FETCH_STATISTICS_FAILURE:
        case FETCH_ACTIVE_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
