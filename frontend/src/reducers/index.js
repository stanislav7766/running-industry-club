import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import feedbackReducer from './feedbackReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  feedback: feedbackReducer
});
