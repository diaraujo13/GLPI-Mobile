import { SET_IMAGE, ADD_IMAGE, DEL_IMAGE } from "../actions/types";

const initialState = {
    selectedImage   : {},
    imagesArray     : []
 };

 const imgReducer = (state = initialState, action) => {
    switch (action.type) {

      case SET_IMAGE:
        return {
          ...state,
          selectedImage: action.payload
        }
      break;

      case ADD_IMAGE:
        return {
            ...state,
            imagesArray: [...state.imagesArray, action.payload]
        }
      break;

      case DEL_IMAGE:
        return {
          ...state,
            imagesArray: state.imagesArray.map( el => el.pos != action.payload)
        }
      break;

      default:
        return state;
    }
  };
  

  export default imgReducer;