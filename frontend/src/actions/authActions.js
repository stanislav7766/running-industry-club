import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};
export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData);
    const { token } = await res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt_decode(token)));
    history.push('/');
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};
export const setCurrentUser = decoded => ({
  type: 'SET_CURRENT_USER',
  payload: decoded
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
