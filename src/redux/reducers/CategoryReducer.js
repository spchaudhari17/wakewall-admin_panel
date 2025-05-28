import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_SUCCESS,
    GET_CATEGORY,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
} from '../constants/categoryContstants';

// const initialState = {
//     categories: [],
//     category: {},
//     loading: false,
//     error: null,
//     createMessage: null,
//     deleteSubCategoryMessage: null
// };



const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CATEGORIES_REQUEST":
        case "CREATE_CATEGORY_REQUEST":
        case "UPDATE_CATEGORY_REQUEST":
        case "DELETE_CATEGORY_REQUEST":
        case "CREATE_SUBCATEGORY_REQUEST":
        case "DELETE_SUBCATEGORY_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };

        case "GET_CATEGORIES_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };

        case "CREATE_CATEGORY_SUCCESS":
            console.log("Payload:", action.payload);  
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
                // categories: action.payload
            };

        case "UPDATE_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: state.categories.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                ),
            };

        case "DELETE_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: state.categories.filter((cat) => cat._id !== action.payload),
            };

        case "CREATE_SUBCATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: state.categories.map((cat) =>
                    cat._id === action.payload.categoryId
                        ? { ...cat, subcategories: [...cat.subcategories, action.payload.subcategory] }
                        : cat
                ),
            };

        case "DELETE_SUBCATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: state.categories.map((cat) =>
                    cat._id === action.payload.categoryId
                        ? {
                            ...cat,
                            subcategories: cat.subcategories.filter(
                                (sub) => sub._id !== action.payload.subcategoryId
                            ),
                        }
                        : cat
                ),
            };

        case "GET_CATEGORIES_FAILURE":
        case "CREATE_CATEGORY_FAILURE":
        case "UPDATE_CATEGORY_FAILURE":
        case "DELETE_CATEGORY_FAILURE":
        case "CREATE_SUBCATEGORY_FAILURE":
        case "DELETE_SUBCATEGORY_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};




// export const categoryReducer = (state = initialState, action) => {

//     switch (action.type) {
//         // Fetch categories
//         case GET_CATEGORIES_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case GET_CATEGORIES_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 categories: action.payload,
//             };

//         case GET_CATEGORIES_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };

//         case GET_CATEGORY:
//             return {
//                 ...state,
//                 category: state.category.find(cate => cate._id === action.payload) || {},
//             };

//         // Create category
//         case CREATE_CATEGORY_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 createMessage: null,
//             };

//         case CREATE_CATEGORY_SUCCESS:
//             console.log('Reducer - Current Categories:', state.categories); // Log current state
//             console.log('Reducer - New Category:', action.payload.data); // Log new category
//             return {
//                 ...state,
//                 loading: false,
//                 categories: [...state.categories, action.payload.data],
//             };

//         case CREATE_CATEGORY_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };

//         case UPDATE_CATEGORY_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };

//         case UPDATE_CATEGORY_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 categories: state.categories.map(category =>
//                     category._id === action.payload._id ? action.payload : category
//                 ),
//                 category: action.payload,
//             };

//         case UPDATE_CATEGORY_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };

//         case DELETE_CATEGORY_SUCCESS:
//             return {
//                 ...state,
//                 categories: state.categories.filter(category => category._id !== action.payload),
//             };

//         case DELETE_SUBCATEGORY_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 deleteSubCategoryMessage: action.payload,
//             };

//         default:
//             return state;
//     }
// };

