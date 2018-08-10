import { SET_TOKEN, SET_USER } from "./types";

export const setSessionToken = (param) => ({
    type: SET_TOKEN,
    payload: param
});
  
export const setUserObject = (param) => ({
    type: SET_USER,
    payload: param
});