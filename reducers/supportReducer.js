const defaultState = {
  redDotPresent: false,
  supportMessages: [],
  supportInput: '',
  supportVisible: false, 
  modalMaskVisible: false,
  newChatModal: false,
};

export const supportReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'FETCH_SUPPORT_MESSAGE':
      return {
        ...state,
        supportMessages: action.supportMessages,
      }

    case 'TOGGLE_NEW_CHAT_MODAL':
      return {
        ...state,
        newChatModal: action.newChatModal,
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

    case 'UPDATE_SUPPORT_INPUT':
      return {
        ...state,
        supportInput: action.value,
      }

    default:
      return state;
  }

};

export default supportReducer;