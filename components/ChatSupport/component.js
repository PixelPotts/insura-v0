import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import AutoScroll from 'react-native-auto-scroll'
import styles from '../../styles'

const ChatSupport = (props) => {
  const {
  supportMessages,
  supportInput,
  updateSupportInput,
  toggleSupportModal,
  sendSupportMessage,
  } = props;
  const adminInitialMsg = "Hi there. If you run into any issues with the app or have an idea for a feature request let us know. We normally reply within an hour."
  return (
    <View style={styles.supportModal}>
      <View style={styles.supportModalHeader}>
        <TouchableHighlight style={styles.supportCloseIcon} onPress={() => toggleSupportModal(false)} >
          <Text style={styles.supportCloseBtn}>&rsaquo;</Text>
        </TouchableHighlight>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: '100', fontSize: 18 }}>Support Chat</Text>
          <Text style={{ color: '#cecece', paddingLeft: 20, position: 'relative', top: 3 }}>(From 8am–5pm MT)</Text>
        </View>
      </View>
      <AutoScroll style={styles.supportMessagesWrap}>
        <View style={[styles.messageBubble]} key={1}>
          <Text style={[styles.messageBubbleText, styles.messageBubble_admin]}>{adminInitialMsg}</Text>
        </View>

        {supportMessages.length !== 0 && supportMessages.map((msg, index) => {
          return (
            <View style={[styles.messageBubble]} key={index}>
              <Text style={[styles.messageBubbleText, styles['messageBubble_' + msg.senderType]]}>{msg.content}</Text>
            </View>
          )
        })}
        {!supportMessages && (
          <Text>Loading...</Text>
        )}
      </AutoScroll>
      <TextInput
        value={supportInput}
        placeholder={"Please Enter Your Message"}
        multiline
        onChangeText={(text) => updateSupportInput(text)}
        onSubmitEditing={e => {
        sendSupportMessage(supportInput)
        }}
        style={styles.supportMessageInput}
      />
    </View>
  );

};


export default ChatSupport;