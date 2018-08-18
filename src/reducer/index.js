import { createStore, combineReducers, compose } from 'redux';
import userReducer from './user';
import imgReducer from './image';

export default rootReducer = combineReducers({
   user: userReducer,
   image: imgReducer
});
