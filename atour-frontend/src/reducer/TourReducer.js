import { combineReducers } from "redux";
import { SELECT_TOUR } from "../action/SelectAction";
import { ON_SEARCH_TOUR } from "../action/SearchAction";
import { EDIT_TOUR } from "../action/TourAction";
import { GET_OTHER_USER_INFO } from "../action/UserInfoAction";
const initialState = {
  tourList: [],
  selectedTour: {
    tourName: "",
    tourimage: "",
    price: "",
    detail: "",
    minGroupSize: "",
    maxGroupSize: "",
    userId: ""
  },
  otherUserInfo: {
    firstName: "",
    lastName: "",
    userId: "",
    profileImageUrl: "",
    publishedTour: []
  }
};

function otherUserInfo(state = initialState.otherUserInfo, action) {
  switch (action.type) {
    case GET_OTHER_USER_INFO:
      return action.payload;
    default:
      return state;
  }
}

function tourList(state = initialState.tourList, action) {
  switch (action.type) {
    case ON_SEARCH_TOUR:
      return action.payload;
    default:
      return state;
  }
}

function selectedTour(state = initialState.selectedTour, action) {
  switch (action.type) {
    case EDIT_TOUR:
    case SELECT_TOUR:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({ tourList, selectedTour, otherUserInfo });
export default reducer;
