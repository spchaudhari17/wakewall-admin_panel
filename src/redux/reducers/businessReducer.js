
import {
    GET_ALL_BUSINESSES_REQUEST,
    GET_ALL_BUSINESSES_SUCCESS,
    GET_ALL_BUSINESSES_FAILURE,
    GET_BUSINESS,
    UPDATE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_SUCCESS,
} from '../constants/businessConstanst';



const initialState = {
    loading: false,
    businesses: [],
    business: {},
    error: null,
};


export const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ALL_BUSINESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                businesses: action.payload,
                error: null,
            };

        case GET_ALL_BUSINESSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GET_BUSINESS:
            return {
                ...state,
                // business: state.businesses.find(business => business._id === action.payload) || {},
                business: action.payload,
            };

        case UPDATE_BUSINESS_SUCCESS:
            return {
                ...state,
                loading: false,
                businesses: state.businesses.map(business =>
                    business._id === action.payload._id ? action.payload : business
                ),
                business: action.payload,
            };

        case DELETE_BUSINESS_SUCCESS:
            return {
                ...state,
                businesses: state.businesses.filter(business => business._id !== action.payload),
            };

        default:
            return state;
    }
};
