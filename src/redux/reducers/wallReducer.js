import {
    FETCH_WALL_LIST_REQUEST,
    FETCH_WALL_LIST_SUCCESS,
    FETCH_WALL_LIST_FAILURE,
    GET_WALL,
    DELETE_WALL_SUCCESS,
    DELETE_WALL_FILE_SUCCESS,
    UPDATE_WALL_FILE_SUCCESS,
} from '../constants/wallConstants';


const initialState = {
    loading: false,
    walls: [],
    wall: {},
    error: null,
};


export const wallReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WALL_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_WALL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                walls: action.payload,
            };

        case FETCH_WALL_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GET_WALL:
            return {
                ...state,
                wall: state.walls.find(wall => wall._id === action.payload) || {},
            };

        case DELETE_WALL_SUCCESS:
            return {
                ...state,
                walls: state.walls.filter(wall => wall._id !== action.payload),
            };

        case DELETE_WALL_FILE_SUCCESS: 
            return {
                ...state,
                walls: state.walls.map(wall =>
                    wall._id === action.payload.wallId
                        ? { ...wall, file: '', media_type: '' }
                        : wall
                ),
            };

        case UPDATE_WALL_FILE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    walls: state.walls.map(wall =>
                        wall._id === action.payload.wallId
                            ? { ...wall, file: action.payload.file, media_type: action.payload.media_type }
                            : wall
                    ),
                };

        default:
            return state;
    }
};





