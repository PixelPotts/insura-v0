import { dispatch } from "redux";


export const setRedDot = (status) => {
  return {
    type: 'SET_RED_DOT',
    status
  };
};

export const toggleSupport = () => {
  return {
    type: 'TOGGLE_SUPPORT'
  };
};

export const updateSupportInput = (value) => {
  return {
    type: 'UPDATE_SUPPORT_INPUT',
    value
  };
};

export const sendSupportMessage = () => {
  return {
    type: 'SEND_SUPPORT_MESSAGE',
  };
};

export const fetchSupportMessages = (supportMessages) => {
  return {
    type: 'FETCH_SUPPORT_MESSAGE',
    supportMessages: supportMessages
  };
};

export const toggleSupportModal = (show) => {
  console.log("Called" + show)
  if (show == true) {
    return {
      type: 'TOGGLE_SUPPORT',
      supportVisible: true,
      modalMaskVisible: true,
    };
  } else {
    return {
      type: 'TOGGLE_SUPPORT',
      supportVisible: false,
      modalMaskVisible: false,
    };
  }
};








