const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ERRORS':
      return action.payload;
    case 'RESET_ERRORS':
      return action.payload;
    default:
      return state;
  }
};
