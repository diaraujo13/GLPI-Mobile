import { SET_TOKEN } from "./types";

export const setSessionToken = (param) => ({
    type: SET_TOKEN,
    payload: param
});
  