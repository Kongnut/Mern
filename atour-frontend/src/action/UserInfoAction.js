import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";

export const GET_OTHER_USER_INFO = "GET_OTHER_USER_INFO";
export function getOtherUserInfo(userId) {
  return async dispatch => {
    try {
      const res = await userInfoReq(userId);
      return dispatch({
        type: GET_OTHER_USER_INFO,
        payload: res
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const GET_USER_INFO = "GET_USER_INFO";
export function getUserInfo(userId) {
  return async dispatch => {
    try {
      const res = await userInfoReq(userId);
      return dispatch({
        type: GET_USER_INFO,
        payload: { userInfo: res }
      });
    } catch (e) {
      console.log(e);
    }
  };
}

async function userInfoReq(userId) {
  try {
    return await axios
      .post("http://" + API_ENDPOINT + "/user/getUserInfo", { userId })
      .then(res => {
        return res.data;
      });
  } catch (e) {
    console.log(e);
  }
}

export const EDIT_CONTACT_INFO = "EDIT_CONTACT_INFO";
export function editContactInfo(userInfo, token) {
  return async dispatch => {
    try {
      const payload = {
        token,
        userInfo
      };
      const res = await axios
        .post("http://" + API_ENDPOINT + "/user/updateUserContact", payload)
        .then(res => {
          return res.data;
        });
      return dispatch({
        type: EDIT_CONTACT_INFO,
        payload: {
          userInfo: {
            facebookUrl: res.facebookUrl,
            phoneNumber: res.phoneNumber,
            instagramUrl: res.instagramUrl
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const EDIT_PROFILE = "EDIT_PROFILE";
export function editProfile() {
  return { type: EDIT_PROFILE };
}
export const VIEW_PROFILE = "VIEW_PROFILE";
export function viewProfile() {
  return { type: VIEW_PROFILE };
}
