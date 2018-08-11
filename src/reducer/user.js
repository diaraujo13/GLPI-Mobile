import { GET_TOKEN, SET_TOKEN, SET_USER } from "../actions/types";

 
const initialState = {
   token: '',
   userId: '',
   userObj: {},
   userProfile: {},
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
          userObj: action.payload.userGLPI,
          userProfile: action.payload.userProfile
        }
      break;

      default:
        return state;
    }
  };
  

  export default userReducer;