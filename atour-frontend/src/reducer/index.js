import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import modalReducer from "./ModalReducer";
import applicationReducer from "./ApplicationReducer";
import searchReducer from "./searchReducer";
import tourReducer from "./TourReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  modal: modalReducer,
  app: applicationReducer,
  tour: tourReducer
});

export default rootReducer;
