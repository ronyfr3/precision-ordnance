import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  console.log(order);
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log(data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders`);
    console.log("order", data)

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const singleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDER_REQUEST });

    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
