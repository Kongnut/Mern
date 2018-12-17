import { combineReducers } from "redux";
import { RESIZE_WINDOW } from "../action/ApplicationAction";
import { PUBLISH_TOUR, EDIT_TOUR } from "../action/TourAction";
import { EDIT_CONTACT_INFO } from "../action/UserInfoAction";
import { UPDATED } from "../action/ApplicationAction";

const initialState = {
  width: window.innerWidth,
  isUpdated: false
};

function width(state = initialState.width, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return action.payload;
    default:
      return state;
  }
}

function isUpdated(state = initialState.isUpdated, action) {
  switch (action.type) {
    case EDIT_TOUR:
    case EDIT_CONTACT_INFO:
    case PUBLISH_TOUR:
      return true;
    case UPDATED:
      return false;
    default:
      return state;
  }
}

const reducer = combineReducers({ width, isUpdated });

export default reducer;
