import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from './authActions';
import isEmpty from '../components/validation/isEmpty';

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can Not be undone!'))
    try {
      await axios.delete(`${process.env.REACT_APP_PROXY_SERVER}/api/profile`);
      dispatch(clearCurrentProfile());
      dispatch(setCurrentUser({}));
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
    } catch (err) {
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      });
    }
};

export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile/all`
    );
    dispatch({
      type: 'GET_PROFILES',
      payload: await res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_PROFILES',
      payload: null
    });
  }
};

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile`
    );
    dispatch({
      type: 'GET_PROFILE',
      payload: await res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_PROFILE',
      payload: {}
    });
  }
};

export const getProfileBooking = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile/run-booking`
    );
    return await res.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile`,
      profileData
    );
    history.push('/own-profile');
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};

export const setProfileLoading = () => ({
  type: 'PROFILE_LOADING'
});

export const clearCurrentProfile = () => ({
  type: 'CLEAN_CURRENT_PROFILE',
  payload: {}
});
export const setError = () => ({
  type: 'RESET_ERRORS',
  payload: {}
});

export const addRun = (
  runData,
  history,
  previewFile = null
) => async dispatch => {
  const bodyFormData = new FormData();
  Object.keys(runData).forEach(prop => bodyFormData.set(prop, runData[prop]));
  previewFile && bodyFormData.append('preview', previewFile);

  try {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_PROXY_SERVER}/api/profile/runs`,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    history.push('/own-profile');
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};
export const bookingRun = runData => async dispatch => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile/run-booking`,
      runData
    );
    isEmpty(res.data.errors) && dispatch(setError());
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};
export const resetErrors = () => dispatch =>
  dispatch({
    type: 'RESET_ERRORS',
    payload: {}
  });

export const deleteRun = id => async dispatch => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile/runs/${id}`
    );
    dispatch({
      type: 'GET_PROFILE',
      payload: await res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};

export const deleteBookedRun = id => async dispatch => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_PROXY_SERVER}/api/profile/booked-runs/${id}`
    );
    dispatch({
      type: 'GET_PROFILE',
      payload: await res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    });
  }
};
export const paidBookedRun = id => async dispatch => {
  if (window.confirm('Вы желаете оплатить выбранный забег?'))
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PROXY_SERVER}/api/profile/booked-runs/${id}`
      );
      dispatch({
        type: 'GET_PROFILE',
        payload: await res.data
      });
    } catch (err) {
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      });
    }
};
