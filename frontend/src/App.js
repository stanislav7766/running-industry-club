import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';

import Landing from './pages/landing';
import Register from './pages/register';
import Login from './pages/login';
import OwnProfile from './pages/own-profile';
import EditProfile from './pages/edit-profile';
import CreateProfile from './pages/create-profile';
import AddRun from './pages/add-run';
import AllRuns from './pages/all-runs';
import BookingRun from './pages/booking-run';
import Header from './components/header';
import Footer from './components/footer';
import PrivateRoute from './components/common/PrivateRoute';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import './App.css';

dotenv.config();

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
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/booking-run" component={BookingRun} />
            <PrivateRoute exact path="/all-runs" component={AllRuns} />
            <PrivateRoute exact path="/add-run" component={AddRun} />
            <PrivateRoute exact path="/own-profile" component={OwnProfile} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </Fragment>
        <Footer />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
