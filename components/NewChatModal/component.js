import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

const NewChatModal = (props) => {
  const {
    toggleNewChatModal
  } = props;
  return (
    <TouchableHighlight style={NewChatModalStyles.container}  onPress={() => toggleNewChatModal(false)}>
      <View style={NewChatModalStyles.modal}>
        <Text style={NewChatModalStyles.text}>You have a new message from support</Text>
        <View style={NewChatModalStyles.buttonButtonWrap}>
          <Text style={NewChatModalStyles.buttonTitle}>Close</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

};



const NewChatModalStyles = {
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    position: 'absolute',
    marginTop: 100,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modal: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '80%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    padding: 16,
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20, 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  buttonButtonWrap: {
    height: 38,
    width: 200,
    textAlign: 'center',
    marginTop: 32,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFB200',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 0,
    fontWeight: 'bold'
  }
}


export default NewChatModal;
