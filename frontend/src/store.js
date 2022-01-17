import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productsReducer";
import {
  userUpdateProfileReducer,
  userActiveReducer,
  userDetailsReducer,
  userSigninReducer,
  userSignupReducer,
  userListReducer,
  userUpdateReducer,
  userGoogleReducer
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderDeleteReducer, orderListReducer, orderCreateReducer, orderListMyReducer } from "./reducers/orderReducer";
import { QueryProductReducer } from "./reducers/QueryReducer";
import { productReviewCreateReducer } from "./reducers/productsReducer";
import {
  galleryListReducer,
  galleryCreateReducer,
  galleryDeleteReducer,
} from "./reducers/galleryReducers";

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userActive: userActiveReducer,
  userGoogle: userGoogleReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  productsReducer: productListReducer,
  orderReducer: orderListReducer,
  orderListMy: orderListMyReducer,
  orderCreateReducer: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  QueryProducts: QueryProductReducer,
  galleryList: galleryListReducer,
  galleryCreate: galleryCreateReducer,
  galleryDelete: galleryDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  userSignin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
