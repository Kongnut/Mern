import axios from "axios";
import { API_ENDPOINT } from "../utils/utils";

export const PUBLISH_TOUR = "PUBLISH_TOUR";
export function publishTour(tour, token) {
  return async dispatch => {
    try {
      const res = await axios
        .post("http://" + API_ENDPOINT + "/tour/publishTour", {
          tour,
          token
        })
        .then(res => {
          return res.data;
        });
      return dispatch({
        type: PUBLISH_TOUR,
        payload: {
          publishedTour: res
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const EDIT_TOUR = "EDIT_TOUR";
export function editTour(tour, token) {
  return async dispatch => {
    try {
      const res = await axios
        .post("http://" + API_ENDPOINT + "/tour/editTour", {
          tour,
          token
        })
        .then(res => {
          return res.data;
        });
      return dispatch({
        type: EDIT_TOUR,
        payload: res
      });
    } catch (e) {
      console.log(e);
    }
  };
}
