const defaultState = {
  redDotPresent: false,
  supportMessages: [],
  supportInput: '',
  supportVisible: false, 
  modalMaskVisible: false
};

export const supportReducer = (state = defaultState, action) => {

  switch (action.type) {

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

    case 'TOGGLE_SUPPORT':
      return {
        ...state,
        supportVisible: action.supportVisible,
        modalMaskVisible: action.modalMaskVisible,
      }

    default:
      return state;
  }

};

export default supportReducer;
