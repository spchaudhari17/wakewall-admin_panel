import API from "../../API";


export const fetchSearchResults = (query) => async (dispatch) => {
  try {
    const { data } = await API.post("/user/searchUser", { search: query });

    dispatch({
      type: "SEARCH_RESULTS_SUCCESS",
      payload: data.data, // API response data
    });
  } catch (error) {
    dispatch({
      type: "SEARCH_RESULTS_FAIL",
      payload: error.response?.data?.message || "Error fetching results",
    });
  }
};






