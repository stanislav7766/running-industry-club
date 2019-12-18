import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Header from './components/layout/header/';
import Landing from './components/layout/landing/';
import Footer from './components/layout/footer/';
import Register from './components/auth/register/';
import Login from './components/auth/login/';
import OwnProfile from './components/dashboard/own-profile/';
import EditProfile from './components/dashboard/edit-profile/';
import CreateProfile from './components/dashboard/create-profile/';
import AddRun from './components/dashboard/happened-runs/add-run/';
import AllRuns from './components/dashboard/happened-runs/all-runs/';
import Feedbacks from './components/feedbacks/Feedbacks';
import { setCurrentUser, logoutUser } from './actions/authActions';
import BookedRuns from './components/dashboard/booked-runs/BookedRuns';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/feedbacks" component={Feedbacks} />
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/booked-runs" component={BookedRuns} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/all-runs" component={AllRuns} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/add-run" component={AddRun} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/own-profile" component={OwnProfile} />
          </Switch>
        </Fragment>
        <Footer />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
