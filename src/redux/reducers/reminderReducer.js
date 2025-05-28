import {
    FETCH_REMINDERS_REQUEST,
    FETCH_REMINDERS_SUCCESS,
    FETCH_REMINDERS_FAILURE,
    DELETE_REMINDER_SUCCESS,
    UPDATE_REMINDER_REQUEST,
    UPDATE_REMINDER_SUCCESS,
    UPDATE_REMINDER_FAILURE,
    GET_REMINDER
} from "../constants/reminderConstants";




const initialState = {
    reminders: [],
    reminder: {},
    loading: false,
    error: null,
};

export const allReminderReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case FETCH_REMINDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_REMINDERS_SUCCESS:
            console.log("action.payload,", action.payload)
            return {
                ...state,
                loading: false,
                reminders: action.payload,
            };
        case FETCH_REMINDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Get a specific reminder
        case GET_REMINDER:
            return {
                ...state,
                reminder: state.reminders.find(
                    (reminder) => reminder._id === action.payload
                ),
            };

        // Update a reminder
        case UPDATE_REMINDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_REMINDER_SUCCESS:
            return {
                ...state,
                loading: false,
                reminders: state.reminders.map((reminder) =>
                    reminder._id === action.payload._id
                        ? action.payload
                        : reminder
                ),
                reminder: action.payload,
            };
        case UPDATE_REMINDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

      
        case DELETE_REMINDER_SUCCESS:
            return {
                ...state,
                reminders: state.reminders.filter(reminder => reminder._id !== action.payload),
            };

        default:
            return state;
    }
};


//     switch (action.type) {
//         case FETCH_REMINDERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case FETCH_REMINDERS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 reminders: action.payload
//             };
//         case FETCH_REMINDERS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };

//         case GET_REMINDER:
//                 return {
//                     ...state,
//                     reminder: state.reminders.find(reminder => reminder._id === action.payload)
//                 };

//         case DELETE_REMINDER_SUCCESS:
//             return {
//                 ...state,
//                 reminders: state.reminders.filter(reminder => reminder._id !== action.payload.id),
//             };
//         default:
//             return state;
//     }
// };

// export const reminderDetailsReducer = (state = { reminder: {} }, action) => {
//     switch (action.type) {
//         case REMINDER_DETAILS_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case REMINDER_DETAILS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 reminder: action.payload
//             }

//         case REMINDER_DETAILS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };


// export const updatereminderReducer = (state = { reminder: {} }, action) => {
//     switch (action.type) {
//         case UPDATE_REMINDER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case UPDATE_REMINDER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 reminder: action.payload
//             }

//         case UPDATE_REMINDER_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };