import { createStore, combineReducers, compose, applyMiddleware } from "redux";import rootReducer from '../reducer';
import thunk from "redux-thunk";

const store = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default store;