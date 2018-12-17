import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function login(userInfo) {
  return async dispatch => {
    try {
      const res = await axios
        .post("http://" + API_ENDPOINT + "/user/login", {
          userInfo
        })
        .then(res => {
          return res.data;
        });
      if (res.error) {
        return dispatch({
          type: LOGIN_FAILED
        });
      } else {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: { userInfo: res }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export const LOGOUT = "LOGOUT";
export function logout() {
  return {
    type: LOGOUT
  };
}

export const RESIZE_WINDOW = "RESIZE_WIDNOW";
export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    payload: width
  };
}
export const CLEAR_ERROR = "CLEAR_ERROR";
export function clearError() {
  return { type: "CLEAR_ERROR" };
}

export const UPDATED = "UPDATED";
export function updated() {
  return { type: UPDATED };
}
