const initialState = {
  feedbacks: [],
  feedback: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FEEDBACK_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'GET_FEEDBACKS':
      return {
        ...state,
        feedbacks: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
