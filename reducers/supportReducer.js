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

    case 'FETCH_SUPPORT_MESSAGE':
      return {
        ...state,
        supportMessages: action.supportMessages,
      }

    case 'SET_RED_DOT':
      return {
        ...state,
        redDotPresent: action.status,
      }

    default:
      return state;
  }

};

export default supportReducer;
