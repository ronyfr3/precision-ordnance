import { QUERY_REQUEST,QUERY_FAIL,QUERY_SUCCESS } from '../constants/QueryProductsConstants';

export const QueryProductReducer = (state = { queryProducts: [] }, action) => {
  switch (action.type) {
    case QUERY_REQUEST:
      return { loading: true, queryProducts: [] };
    case QUERY_SUCCESS:
      return { loading: false, queryProducts: action.payload };
    case QUERY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};