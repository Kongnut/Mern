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
      const {
        detail,
        imageUrl,
        isPublished,
        maximumSize,
        minimumSize,
        price,
        tourId,
        tourName,
        userId
      } = res;
      return dispatch({
        type: EDIT_TOUR,
        payload: {
          detail,
          imageUrl,
          isPublished,
          maximumSize,
          minimumSize,
          price,
          tourId,
          tourName,
          userId
        }
      });
    } catch (e) {}
  };
}

export const DELETED = "DELETED";
export function deleted() {
  return { type: DELETED };
}

export const DELETE_TOUR = "DELETE_TOUR";
export function deleteTour(tour, token) {
  return async dispatch => {
    try {
      await axios.post("http://" + API_ENDPOINT + "/tour/deleteTour", {
        tour,
        token
      });
      return dispatch({
        type: DELETE_TOUR
      });
    } catch (e) {
      console.log(e);
    }
  };
}
