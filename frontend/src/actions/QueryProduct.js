import axios from 'axios';
import { QUERY_REQUEST,QUERY_FAIL,QUERY_SUCCESS } from '../constants/QueryProductsConstants';

export const listQueryProducts =(paramsString)=>
  async dispatch => {
    try {
      dispatch({ type: QUERY_REQUEST });
      let endpoints = [
        `/api/products?productInfo.title[regex]=${paramsString}`,
        `/api/products?brand[regex]=${paramsString}`,
        `/api/products?category[regex]=${paramsString}`,
        `/api/products?subcategory[regex]=${paramsString}`
      ];
       axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        (data) => console.log(dispatch({ type: QUERY_SUCCESS, payload: data })),
      );

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