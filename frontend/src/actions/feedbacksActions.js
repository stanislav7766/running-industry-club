import axios from 'axios';

export const getFeedbacks = () => async dispatch => {
  dispatch(setFeedbackLoading());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PROXY_SERVER}/api/feedbacks/`
    );
    dispatch({
      type: 'GET_FEEDBACKS',
      payload: await res.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_FEEDBACKS',
      payload: null
    });
  }
};

export const setFeedbackLoading = () => ({
  type: 'FEEDBACK_LOADING'
});
