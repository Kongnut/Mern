import {
  ON_CHANGE,
  ON_SEARCH_TOUR,
  ON_SEARCH_USER
} from "../action/SearchAction";
import { GET_SAVED_TOUR } from "../action/UserInfoAction";
import { combineReducers } from "redux";

const initialState = {
  term: "",
  isSearched: false
};

function searchName(state = initialState.term, action) {
  switch (action.type) {
    case ON_CHANGE:
      return action.payload;
    case ON_SEARCH_TOUR:
    case ON_SEARCH_USER:
      return state;
    default:
      return state;
  }
}

function isSearched(state = initialState.isSearched, action) {
  switch (action.type) {
    case ON_SEARCH_TOUR:
    case ON_SEARCH_USER:
      return true;
    case GET_SAVED_TOUR:
      return false;
    default:
      return state;
  }
}

const reducer = combineReducers({
  searchName,
  isSearched
});

export default reducer;
