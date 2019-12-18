import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const isMobileDevice = () =>
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1;

const initialState = {};
const applyThunk = applyMiddleware(thunk);
const devTools =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

const store = createStore(
  rootReducer,
  initialState,
  isMobileDevice() ? compose(applyThunk) : compose(applyThunk, devTools)
);

export default store;
