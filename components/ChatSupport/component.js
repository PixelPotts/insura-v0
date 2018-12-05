import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import AutoScroll from 'react-native-auto-scroll'
import styles from '../../styles'

const ChatSupport = (props) => {
  const {
    redDotPresent,
  supportMessages,
  supportInput,
  setRedDot,
  toggleSupport,
  updateSupportInput,
  toggleSupportModal,
  sendSupportMessage,
  store
  } = props;
  const adminInitialMsg = "Hi there. If you run into any issues with the app or have an idea for a feature request let us know. We normally reply within an hour."
  const closeModal = () => {
    store.dispatch(toggleSupportModal(false))
  }
  return (
    <View style={styles.supportModal}>
      <View style={styles.supportModalHeader}>
        <TouchableHighlight style={styles.supportCloseIcon} onPress={() => closeModal()} >
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

        {supportMessages.length !== 0 && supportMessages.map(msg => {
          return (
            <View style={[styles.messageBubble]} key={msg.time}>
              <Text style={[styles.messageBubbleText, styles['messageBubble_' + msg.senderType]]}>{msg.content}</Text>
            </View>
          )
        })}
        {!supportMessages && (
          <Text>Loading...</Text>
        )}
      </AutoScroll>
      <TextInput
        // ref="supportInput"
        // value={this.state.supportInput}
        placeholder={"Aa"}
        multiline
        // onChangeText={(text) => this.setState({ supportInput: text })}
        // onSubmitEditing={e => {
        //   this.sendSupportMessage()
        //   this.refs.supportInput.focus();
        // }}
        style={styles.supportMessageInput}
      />
    </View>
  );

};


export default ChatSupport;
