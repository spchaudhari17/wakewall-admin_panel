
import API from "../../API";

import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAILURE,
    CREATE_SUBCATEGORY_REQUEST,
    CREATE_SUBCATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_FAILURE,
    GET_CATEGORY,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
} from "../constants/categoryContstants";


export const fetchCategories = () => async (dispatch) => {
    try {

        dispatch({ type: GET_CATEGORIES_REQUEST });

        // const { data } = await API.post('/admin/getBusinessCategories', {});
        // const { data } = await API.post('/user/getBCatWithBSubCategories', {});
        const { data } = await API.post('/admin/getCategoriesWithSubcategories', {});

        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data.data });

    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CATEGORIES_FAILURE,
            payload: error.response?.data?.message || error.message || 'Something went wrong',
        });
    }
};

export const createCategory = (categoryName) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        const {data} = await API.post('/admin/createBusinessCategory', {
            category_name: categoryName,
        });

        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.message });

    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message || "Failed to create category" });
    }
};

export const deleteCategory = (category_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await API.post('/admin/deleteCategoryWithSubcategories', {
            category_id,
        });

        // const { status, message, error } = response.data;

        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: category_id });

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAILURE,
            payload: error.message || "Failed to delete category",
        });
    }
};

export const getCategory = (categoryId) => async (dispatch) => {
    try {
        console.log('categoryId : ', categoryId);
        dispatch({ type: GET_CATEGORY, payload: categoryId })
    } catch (error) {
        console.log(error);
    }
};

export const updateCategory = (category_id, category_name) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
      const { data } = await API.post("/admin/editBusinessCategory", {category_id, category_name});
      dispatch({type: UPDATE_CATEGORY_SUCCESS,payload: data});
      console.log(data)
    } catch (error) {
      console.log(error)
      dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.response?.data?.message || "Failed to update reminder." });
    }
  };


// delete subCategory
export const deleteSubCategory = (subCategoryId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBCATEGORY_REQUEST });

        const response = await API.post("/admin/deleteSubCategory", { subCategoryId });

        const { status, message, error } = response.data;

        dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: message });

    } catch (error) {
        console.log(error)
        dispatch({ type: DELETE_SUBCATEGORY_FAILURE, payload: error.message || "Failed to delete subcategory." });
    }
};


export const createSubCategory = (category_id, subcategoryName) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_SUBCATEGORY_REQUEST });
        console.log("category_id", category_id)
        const { data } = await API.post("/admin/createBusinessSubCategory", { category_id: category_id, name: subcategoryName });
        console.log("CREATE_SUBCATEGORY_SUCCESS", data)
        dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: data });

    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATE_SUBCATEGORY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


