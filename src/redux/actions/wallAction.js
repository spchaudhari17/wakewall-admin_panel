import API from "../../API";
import { DELETE_WALL_FAILURE, DELETE_WALL_FILE_SUCCESS, DELETE_WALL_REQUEST, DELETE_WALL_SUCCESS, FETCH_WALL_LIST_FAILURE, FETCH_WALL_LIST_REQUEST, FETCH_WALL_LIST_SUCCESS, GET_WALL, SET_GLOBAL_WALL_LIMIT_FAILURE, SET_GLOBAL_WALL_LIMIT_REQUEST, SET_GLOBAL_WALL_LIMIT_SUCCESS, UPDATE_WALL_FILE_FAILURE, UPDATE_WALL_FILE_REQUEST, UPDATE_WALL_FILE_SUCCESS } from "../constants/wallConstants";


export const fetchWallList = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_WALL_LIST_REQUEST });

        const { data } = await API.post('/admin/wallList', {});

        dispatch({ type: FETCH_WALL_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_WALL_LIST_FAILURE, payload: error.response?.data?.message || 'Failed to fetch wall list' });
    }
};


export const getWall = (nwallId) => async (dispatch) => {
    try {
        dispatch({ type: GET_WALL, payload: nwallId })
    } catch (error) {
        console.log(error);
    }
};


export const deleteWall = (wallId) => async (dispatch) => {
    dispatch({ type: DELETE_WALL_REQUEST });

    try {
        const { data } = await API.post("/admin/deleteWall", { wallId });
        dispatch({ type: DELETE_WALL_SUCCESS, payload: wallId });
    } catch (error) {
        dispatch({
            type: DELETE_WALL_FAILURE,
            payload: error.response?.data?.message || "Failed to delete note.",
        });
    }
};


export const deleteWallFile = (wallId) => async (dispatch) => {
    try {
        const { data } = await API.post('/admin/deleteWallImage', { wallId });

        if (!data.error) {
            dispatch({
                type: DELETE_WALL_FILE_SUCCESS,
                payload: { wallId },
            });
        } else {
            console.error('Error deleting file:', data.message);
        }
    } catch (error) {
        console.error('Error deleting wall file:', error.message);
    }
};


export const updateWallFile = (wallId, media) => async (dispatch) => {
    try {
        
        dispatch({ type: UPDATE_WALL_FILE_REQUEST });

        const formData = new FormData();
        formData.append('wallId', wallId);
        if (media) formData.append('media', media);

        const { data } = await API.post('/admin/updateWall', formData);

        dispatch({
            type: UPDATE_WALL_FILE_SUCCESS,
            payload: { wallId, file: data.data.file, media_type: data.data.media_type },
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_WALL_FILE_FAILURE, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


export const SetGlobalWallLimit = (action, limit) => async (dispatch) => {
    try {
  
      dispatch({ type: SET_GLOBAL_WALL_LIMIT_REQUEST });
      console.log(action, limit)
      const { data } = await API.post("/admin/setGlobalPostLimit", { action, limit });
  
      dispatch({ type: SET_GLOBAL_WALL_LIMIT_SUCCESS, payload: data });
  
    } catch (error) {
      console.log("SET_GLOBAL_WALL_LIMIT_FAILURE", error)
      dispatch({ type: SET_GLOBAL_WALL_LIMIT_FAILURE, payload: error.response?.data?.message || "Failed to fetch note details" });
    }
  };
  
