import axios from "axios";
import { logout } from "../actions/userActions.js";
import {
  IMAGE_CREATE_FAIL,
  IMAGE_CREATE_REQUEST,
  IMAGE_CREATE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_LIST_FAIL,
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
} from "../constants/galleryConstants";

export const listGalleries = () => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_LIST_REQUEST });

    const { data } = await axios.get(`/api/gallery`);
    console.log(data)

    dispatch({ type: IMAGE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: IMAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGallery = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    dispatch({
      type: IMAGE_DELETE_REQUEST,
    });

    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/gallery/${id}`, config);

    dispatch({
      type: IMAGE_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createGallery = (fileData) => async (dispatch, getState) => {
  console.log("rony bhai",fileData);
  try {
    dispatch({
      type: IMAGE_CREATE_REQUEST,
    });

    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/gallery`, fileData, config);

    console.log(data);

    dispatch({
      type: IMAGE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: IMAGE_CREATE_FAIL,
      payload: message,
    });
  }
};
