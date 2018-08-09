import { GET_TOKEN, SET_TOKEN } from "../actions/types";

 
const initialState = {
   token: '',
   userId: '',
   ticketsId: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TOKEN:
        return state;
      break;

      case SET_TOKEN:
        return {
          ...state,
          token: action.payload
        }
      break;

      default:
        return state;
    }
  };
  

  export default userReducer;