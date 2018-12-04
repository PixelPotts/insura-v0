import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles'

const ChatSupport = ({
  redDotPresent,
  supportMessages,
  supportInput,
  setRedDot,
  toggleSupport,
  updateSupportInput,
  sendSupportMessage
}) => {
  console.log("Loading info from redux")
  console.log(redDotPresent)
  console.log(supportMessages)
  return (
    <View style={styles.supportModal}>
      
    </View>
  );

};


export default ChatSupport;
