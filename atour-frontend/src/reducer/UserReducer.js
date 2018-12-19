import { combineReducers } from "redux";
import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_ERROR
} from "../action/ApplicationAction";
import { EDIT_CONTACT_INFO, GET_USER_INFO } from "../action/UserInfoAction";
import { SELECT_USER } from "../action/SelectAction";
import { ON_SEARCH_USER } from "../action/SearchAction";
import { PUBLISH_TOUR } from "../action/TourAction";
import { GET_SAVED_TOUR, SAVE_TOUR } from "../action/UserInfoAction";

const initialState = {
  isUpdated: false,
  userId: "",
  isLoginSuccess: null,
  firstName: "",
  lastName: "",
  profileImageUrl: "",
  gender: "",
  age: "",
  facebookUrl: "",
  instagramUrl: "",
  phoneNumber: "",
  publishedTour: [],
  token: "",
  otherUserList: [],
  savedTourList: [],
  selectedUser: {
    firstName: "",
    lastName: "",
    userId: "",
    profileImageUrl: "",
    publishedTourList: []
  }
};

function savedTourList(state = initialState.savedTourList, action) {
  switch (action.type) {
    case GET_SAVED_TOUR:
    case SAVE_TOUR:
      return action.payload;
    case LOGOUT:
      return [];
    default:
      return state;
  }
}

function gender(state = initialState.gender, action) {
  switch (action.type) {
    case GET_USER_INFO:
    case LOGIN_SUCCESS:
      return action.payload.userInfo.gender;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function age(state = initialState.age, action) {
  switch (action.type) {
    case GET_USER_INFO:
    case LOGIN_SUCCESS:
      return action.payload.userInfo.age;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function facebookUrl(state = initialState.facebookUrl, action) {
  switch (action.type) {
    case EDIT_CONTACT_INFO:
    case GET_USER_INFO:
    case LOGIN_SUCCESS:
      return action.payload.userInfo.facebookUrl || "";
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function instagramUrl(state = initialState.instagramUrl, action) {
  switch (action.type) {
    case EDIT_CONTACT_INFO:
    case GET_USER_INFO:
    case LOGIN_SUCCESS:
      return action.payload.userInfo.instagramUrl || "";
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function phoneNumber(state = initialState.phoneNumber, action) {
  switch (action.type) {
    case EDIT_CONTACT_INFO:
    case GET_USER_INFO:
    case LOGIN_SUCCESS:
      return action.payload.userInfo.phoneNumber || "";
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function userId(state = initialState.userId, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.userInfo.userId;
    case LOGOUT:
      return "";
    default:
      return state;
  }
}

function otherUserList(state = initialState.otherUserList, action) {
  switch (action.type) {
    case ON_SEARCH_USER:
      return action.payload;
    default:
      return state;
  }
}

function selectedUser(state = initialState.selectedUser, action) {
  switch (action.type) {
    case SELECT_USER:
      return action.payload;
    default:
      return state;
  }
}

function isLoginSuccess(state = initialState.isLoginSuccess, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILED:
      return false;
    case CLEAR_ERROR:
      return null;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

function firstName(state = initialState.firstName, action) {
  switch (action.type) {
    case LOGOUT:
      return "";
    case LOGIN_SUCCESS:
    case GET_USER_INFO:
      return action.payload.userInfo.firstName;
    default:
      return state;
  }
}

function lastName(state = initialState.lastName, action) {
  switch (action.type) {
    case LOGOUT:
      return "";
    case LOGIN_SUCCESS:
    case GET_USER_INFO:
      return action.payload.userInfo.lastName;
    default:
      return state;
  }
}

function profileImageUrl(state = initialState.profileImageUrl, action) {
  switch (action.type) {
    case LOGOUT:
      return "";
    case LOGIN_SUCCESS:
    case GET_USER_INFO:
      return action.payload.userInfo.profileImageUrl;
    default:
      return state;
  }
}

function publishedTour(state = initialState.publishedTour, action) {
  switch (action.type) {
    case LOGOUT:
      return "";
    case LOGIN_SUCCESS:
    case GET_USER_INFO:
      return action.payload.userInfo.publishedTour || [];
    case PUBLISH_TOUR:
      return action.payload.publishedTour;
    default:
      return state;
  }
}

function token(state = initialState.token, action) {
  switch (action.type) {
    case LOGOUT:
      return "";
    case LOGIN_SUCCESS:
      return action.payload.userInfo.token;
    default:
      return state;
  }
}

const reducer = combineReducers({
  userId,
  phoneNumber,
  instagramUrl,
  facebookUrl,
  gender,
  age,
  publishedTour,
  firstName,
  lastName,
  profileImageUrl,
  token,
  isLoginSuccess,
  selectedUser,
  savedTourList,
  otherUserList
});

export default reducer;
