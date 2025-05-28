
import {
    FETCH_NOTES_REQUEST,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILURE,
    DELETE_NOTE_SUCCESS,
    SET_USER_NOTE_LIMIT_REQUEST,
    SET_USER_NOTE_LIMIT_SUCCESS,
    SET_USER_NOTE_LIMIT_FAILURE,
    SET_GLOBAL_NOTE_LIMIT_REQUEST,
    SET_GLOBAL_NOTE_LIMIT_SUCCESS,
    SET_GLOBAL_NOTE_LIMIT_FAILURE,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAILURE,
    GET_NOTE
} from "../constants/noteConstants";


const initialState = {
    notes: [],       
    note: {},        
    loading: false,  
    error: null,   
};

export const allNotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload,
            };

        case FETCH_NOTES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GET_NOTE:
            return {
                ...state,
                note: state.notes.find(note => note._id === action.payload) || {},
            };

        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload),
            };

        case UPDATE_NOTE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note =>
                    note._id === action.payload._id ? action.payload : note
                ),
                note: action.payload,
            };

        case UPDATE_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


// export const allNotesReducer = (state = { notes: [] }, action) => {

//     switch (action.type) {
//         case FETCH_NOTES_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case FETCH_NOTES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 notes: action.payload,
//             };

//         case FETCH_NOTES_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
            
//         case GET_NOTE:
//             return {
//                 ...state,
//                 note: state.notes.find(note => note._id === action.payload)
//             };

//         case DELETE_NOTE_SUCCESS:
//             return {
//                 ...state,
//                 notes: state.notes.filter(note => note._id !== action.payload)
//             }
//         default:
//             return state;
//     }
// };


export const setUserPostLimitReducer = (state = { note: {} }, action) => {
    switch (action.type) {
        case SET_USER_NOTE_LIMIT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SET_USER_NOTE_LIMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                note: action.payload,
                error: null,
            };

        case SET_USER_NOTE_LIMIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const globalNoteLimitReducer = (state = {note:{}}, action) => {
    switch (action.type) {
        case SET_GLOBAL_NOTE_LIMIT_REQUEST:
            return {
                ...state,
                loading: true
            };

        case SET_GLOBAL_NOTE_LIMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                note: action.payload
            };

        case SET_GLOBAL_NOTE_LIMIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


// export const updateNoteReducer = (state = { note: {} }, action) => {
//     switch (action.type) {
//         case UPDATE_NOTE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case UPDATE_NOTE_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 note: action.payload
//             }

//         case UPDATE_NOTE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };