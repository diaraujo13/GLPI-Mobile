import { SET_SEARCH_KEY, GET_RESULT_SEARCH } from "../actions/bulas/search";

const initialState = {
    query: '',
    bulas: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SET_SEARCH_KEY:
    return { ...state, query: action.payload, };
    break;
    
  case GET_RESULT_SEARCH:
    return { ...state, bulas: action.payload, };
  break;
  
  default:
    return state
  }
};
