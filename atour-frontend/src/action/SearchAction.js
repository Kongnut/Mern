import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";

export const ON_CHANGE = "ON_CHANGE";
export const ON_SEARCH_TOUR = "ON_SEARCH_TOUR";
export const ON_SEARCH_USER = "ON_SEARCH_USER";

export function onChange(value) {
  return {
    type: ON_CHANGE,
    payload: value
  };
}

export function onSearch(keyword, isTour) {
  return async dispatch => {
    try {
      if (isTour) {
        if (keyword === "") {
          const res = await axios
            .get("http://" + API_ENDPOINT + "/user/searchTours", {
              keyword
            })
            .then(res => {
              return res.data;
            });
          return dispatch({
            type: ON_SEARCH_TOUR,
            payload: res
          });
        } else {
          const res = await axios
            .post("http://" + API_ENDPOINT + "/user/searchTour", {
              keyword
            })
            .then(res => {
              return res.data;
            });
          return dispatch({
            type: ON_SEARCH_TOUR,
            payload: res
          });
        }
      }
    } catch (e) {}
  };
}
