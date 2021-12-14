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

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case FETCH_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case FETCH_ORDERS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return { ...state, loading: true };
    case FETCH_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case FETCH_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
