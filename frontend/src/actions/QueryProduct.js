import axios from "axios";
import {
  QUERY_REQUEST,
  QUERY_FAIL,
  QUERY_SUCCESS,
} from "../constants/QueryProductsConstants";

export const listQueryProducts = (paramsString) => async (dispatch) => {
  try {
    dispatch({ type: QUERY_REQUEST });

    const { data } = await axios.get(`/api/products?keyword=${paramsString}`);

    dispatch({ type: QUERY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUERY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
