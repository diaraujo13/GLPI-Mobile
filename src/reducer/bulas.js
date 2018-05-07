import { LIST_ALL_BULAS, SET_BULAS, SET_CAT, ADD_PAGE, RESET_PAGE, SELECT_BULA, DETAILS_BULA } from "../actions/types";

 
const initialState = {
    bulas: [],
    searchKey: '',
    page: 1,
    category: 'A',
    selected: '',
    selectedBula: {}
};

const bulasReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_BULAS:

        return {
          ...state,
          bulas: action.bulas
        };
      break;

      case SET_CAT:
        return {
          ...state,
          category: action.category
        }
      break;

      case ADD_PAGE:
        return {
          ...state,
          page: state.page++
        }
      break;

      case RESET_PAGE:
        return {
          ...state,
          page: 1
        }
      break;

      case SELECT_BULA:
        return {
          ...state,
          selected: action.payload
        }
      break;

      case DETAILS_BULA:
        return {
          ...state,
          selectedBula: action.payload
        }
      break;
      
      default:
        return state;
    }
  };
  

  export default bulasReducer;