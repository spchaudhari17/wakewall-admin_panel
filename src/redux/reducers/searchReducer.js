

const initialState = {
    searchResults: [],
    error: null,
};

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_RESULTS_SUCCESS":
            return {
                ...state,
                searchResults: action.payload.length > 0 ? action.payload : state.searchResults
            };

        case "SEARCH_RESULTS_FAIL":
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
