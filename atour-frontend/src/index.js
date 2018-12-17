import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducers from "./reducer";
import HomePage from "./component/HomePage/HomePage";
import TopBanner from "./component/TopBanner/TopBanner";
import ProfilePage from "./component/ProfilePage/ProfilePage";

import SearchFor from "./component/SearchFor";
import TourInfoPage from "./component/TourInfoPage/TourInfoPage";
import PublishedTourPage from "./component/PublishedTourPage/PublishedTourPage";

require("dotenv").config();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route
          path="/"
          render={props => <TopBanner transparent {...props} />}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/editProfile"
            render={props => <ProfilePage isEdit={true} {...props} />}
          />
          <Route
            exact
            path="/viewProfile"
            render={props => <ProfilePage isEdit={false} {...props} />}
          />
          <Route exact path="/tourInfo" component={TourInfoPage} />
          <Route exact path="/searchForTour" component={SearchFor} />
          <Route exact path="/searchForUser" component={SearchFor} />
          <Route exact path="/publishedTour" component={PublishedTourPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
