import { GET_TOKEN, SET_TOKEN, SET_USER } from "../actions/types";

 
const initialState = {
   token: '',
   userId: '',
   userObj: {},
   
   ticketsId: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

      case SET_TOKEN:
        return {
          ...state,
          token: action.payload
        }
      break;

      case SET_USER:
        return {
          ...state,
          userObj: action.payload
        }
      break;

      default:
        return state;
    }
  };
  

  export default userReducer;