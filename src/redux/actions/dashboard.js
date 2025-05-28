import API from "../../API";
import { FETCH_ACTIVE_USERS_FAILURE, FETCH_ACTIVE_USERS_REQUEST, FETCH_ACTIVE_USERS_SUCCESS, FETCH_STATISTICS_FAILURE, FETCH_STATISTICS_REQUEST, FETCH_STATISTICS_SUCCESS } from "../constants/dashboardConstants";



export const fetchDashboardData = () => async (dispatch) => {
    dispatch({ type: FETCH_STATISTICS_REQUEST });

    try {
        const {data} = await API.post('/admin/statistics');
        console.log(data)
        dispatch({type: FETCH_STATISTICS_SUCCESS,payload: data});

    } catch (error) {
        console.log(error)
        dispatch({type: FETCH_STATISTICS_FAILURE,payload: error.message});
    }
};


export const fecthUsersActiveUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_ACTIVE_USERS_REQUEST });

    try {
        const {data} = await API.post('/admin/activeUsers');
        // const {data} = await API.post('/admin/getUserOverview');
        console.log(data)
        dispatch({type: FETCH_ACTIVE_USERS_SUCCESS,payload: data.data});

    } catch (error) {
        console.log(error)
        dispatch({type: FETCH_ACTIVE_USERS_FAILURE,payload: error.message});
    }
};



