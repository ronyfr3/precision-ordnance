import {
  IMAGE_LIST_REQUEST,
  IMAGE_LIST_SUCCESS,
  IMAGE_LIST_FAIL,
  IMAGE_CREATE_REQUEST,
  IMAGE_CREATE_SUCCESS,
  IMAGE_CREATE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL
} from "../constants/galleryConstants";

export const galleryListReducer = (state = { galleries: [] }, action) => {
  switch (action.type) {
    case IMAGE_LIST_REQUEST:
      return { loading: true, galleries: [] };
    case IMAGE_LIST_SUCCESS:
      return { loading: false, galleries: action.payload };
    case IMAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_CREATE_REQUEST:
      return { loading: true };
    case IMAGE_CREATE_SUCCESS:
      return { loading: false, success: true, gallery: action.payload };
    case IMAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
