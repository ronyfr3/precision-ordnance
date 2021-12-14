import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log('addtocart',data);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      brand: data.brand,
      category: data.category,
      subcategory: data.subcategory,
      countInStock: 100,
      // countInStock: data.productInfo.countInStock,
      title: data.productInfo.title,
      names: data.productInfo.info.name,
      values1: data.productInfo.info.values1,
      values2: data.productInfo.info.values2,
      image: data.files.files,
      longdescription: data.productInfo.longdescription,
      shortdescription: data.productInfo.shortdescription,
      price: data.productInfo.price,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
