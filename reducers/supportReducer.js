const defaultState = {
  redDotPresent: false,
  supportMessages: [],
  supportInput: '',
};

export const supportReducer = (state = defaultState, action) => {

  switch (action.type) {

  // case "FETCH_USER_SUCCESS":
  //   return {
  //     ...state,
  //     user: action.user,
  //     fetchUserError: false
  //   };

  default:
    return state;
  }

};

export default supportReducer;
