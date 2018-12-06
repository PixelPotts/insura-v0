import * as firebase from 'firebase'
import _ from 'lodash'

let messagesArray = [];

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

export const sendSupportMessage = (message) => {
  return dispatch => {
    if (message.trim() === '') return false
    t = (new Date).getTime()
    let ref = firebase.database().ref('support/' + firebase.auth().currentUser.uid + '/messages')
    msgRef = ref.push()
    msgRef.setWithPriority({
      senderType: 'user',
      time: t,
      content: message
    }, t).done(() => {
      dispatch(updateSupportInput(''));
      firebase.database()
        .ref('support/' + firebase.auth().currentUser.uid)
        .update({ status: 1 })
        .done(console.log("support status updated to 1"))
        let newref = firebase.database().ref('support/'+firebase.auth().currentUser.uid+'/messages')
        newref.orderByChild('time')
        .startAt(3)
        .on('child_added',(snapshot)=>{
          messagesArray.push(snapshot.val())
        })
        dispatch(fetchSupportMessages(messagesArray));
    }
    )
  }
};

export const fetchSupportMessages = (supportMessages) => {
  return {
    type: 'FETCH_SUPPORT_MESSAGE',
    supportMessages: supportMessages
  };
};

export const toggleSupportModal = (show) => {
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








