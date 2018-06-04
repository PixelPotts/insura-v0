import React, {StyleSheet} from 'react-native';
export default StyleSheet.create({
  masterWrap: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0,
    backgroundColor: '#EEEFF4'
  },
  header: {
    flexDirection: 'row',
    height: 30,
    marginBottom: 0,
    marginTop: 0,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0
  },
  logo: {
    width: 150,
    color: '#0F35AB',
    fontSize: 20,
    borderWidth: 0,
    borderColor: '#FFF'
  },
  headerTopRight: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 150,
    height: 40,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0
  },
  loggedInUserName: {
    textAlign: 'right',
    color: '#26347B'
  },
  signOutLink: {
    textAlign: 'right',
    color: '#0F35AB'
  },
  console: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    zIndex: 1000,
    margin: 20,
    padding: 20,
    opacity: 0.3,
    display: 'none'
  },
  masterInput: {
    borderColor: '#c8cffd',
    borderWidth: 1,
    marginTop: 7,
    height: 50,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: '#FFF',
    zIndex: 2
  },
  masterQuestion: {
    marginTop: 20,
    fontSize: 26,
    color: '#000'
  },
  masterQuestionWrap: {
    flex: 1,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0,
    marginTop: -44
  },
  answerButtonsWrap: {
    position: 'absolute',
    top: 64,
    left: 10,
    flexDirection: 'row',
    zIndex: 3,
    backgroundColor: 'white',
    width: '98%'
  },
  answerButton: {
    backgroundColor: '#B9F0FF',
    marginRight: 5,
    height: 38,
    borderRadius: 5,
    minWidth: 100,
    paddingLeft: 15,
    paddingRight: 15
  },
  answerButtonText: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    marginTop: 8
  },
  autoSuggestWrap: {
    position: 'absolute',
    top: 105,
    maxHeight: 300,
    paddingTop: 6,
    paddingLeft: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '100%',
    backgroundColor: '#f3f3f3',
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  autoSuggestItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  },
  autoSuggestItemTitle: {
    padding: 15,
    color: '#3b3b3b'
  },
  questionLinksWrap: {
    marginTop: 10,
    marginRight: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
    height: 50,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0
  },
  questionButton: {
    height: 50,
    width: 100,
    color: '#0F35AB'
  },
  idScanButtonContainer: {
    position: 'absolute',
    right: 0
  },
  footer: {
    flexDirection: 'column',
    marginBottom: 60,
    // borderColor: '#FFF',
    // borderWidth: 1,
    paddingTop: 12
  },

  // Providers
  providerStatusContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    overflow: 'hidden'
  },
  providerStatusWrap: {
    height: 20,
    marginBottom: 3,
    marginTop: 3,
    flexDirection: 'row',
    // borderColor: 'pink',
    // borderWidth: 1,
    overflow: 'hidden'
  },
  providerTitle: {
    position: 'relative',
    top: 1,
    color: '#000',
  },
  providerTitleProduct: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
  },
  providerTitleProduct_1: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
  },
  providerTitleProduct_2: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'black',
  },
  providerTitleProduct_3: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
  },
  providerTitleProductWrap: {
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#4aa31a',
    borderRadius: 3,
  },
  providerTitleProductWrapStatus_1: {
    backgroundColor: '#a3000e',
  },
  providerTitleProductWrapStatus_2: {
    backgroundColor: '#feff00',
  },
  providerTitleProductWrapStatus_3: {
    backgroundColor: '#4aa31a',
  },






  // CALCULATOR ======================================

  calculator: {
    position: 'absolute',
    top: 13,
    width: '100%',
    height: '80%',
    borderRadius: 8,
    backgroundColor: 'white',
    zIndex: 10,
    margin: 20,
    padding: 20,
    opacity: 1,
    // display: 'none'
  },
  calculatorHeader: {
    marginBottom: 20,
    flexDirection: 'row'
  },
  calculatorLogo: {
    // flex: 1,
    height: 50,
    width: 100,
    resizeMode: 'contain'
  },
  calculatorCompanyWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  calculatorFaceValue: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#c9c9c9',
    width: 200,
    padding: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  calculatorTermDropDown: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#c9c9c9',
    padding: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  calculatorFaceValueWrap: {
    marginTop: 10,
    marginLeft: 20
  },
  calculatorProductWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20
  },
  calculatorProductPeriodCostWrap: {
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5
  },
  calculatorProductPeriodCostWrapProduct: {
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginTop: -50,
    width: 200
  },
  calculatorProductWrapTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  calculatorProductWrapProduct: {
    fontSize: 14,
    fontWeight: '900',
  },
  calculatorProductWrapSubtitle: {
    fontSize: 20,
  },











  // BUTTONS ====================================== //

  infoButtonsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 0,
    // borderColor: 'white',
    // borderWidth: 2
  },
  infoButton: {
    minWidth: 170,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 15,
  },
  infoButtonTitle: {
    marginBottom: 2,
    marginTop: 0,
    fontWeight: "600",
    color: "#343434"
  },
  infoButtonSubtitle: {
    padding: 3,
    fontSize: 12,
    color: "#3f3f3f"
  },
  infoButtonType: {
    padding: 3
  },


  // BUTTON'S BUTTONS ============================ //

  buttonButtonsWrap: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  buttonButtonWrap: {
    minWidth: 22,
    height: 25,
    paddingTop: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: -10,
    borderRadius: 3
  },
  buttonButtonText: {
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  buttonButtonTitle: {
    fontSize: 10,
    marginTop: -10,
    marginRight: 5,
    width: 28,
    textAlign: 'right'
  },

  // BIO
  infoButton_BIO: {
    backgroundColor: '#9EFFA1',
  },
  infoButtonTitle_BIO: {
    fontSize: 14,
    marginBottom: 2,
    marginTop: 10,
    fontWeight: "600",
    color: "#595454"
  },
  infoButtonSubtitle_BIO: {
    padding: 3,
    fontSize: 20,
    color: "#000"
  },
  infoButtonType_BIO: {
    padding: 3
  },


  // MEDICATION
  infoButton_MED: {
    backgroundColor: '#FFF05B',
    borderColor: "#fde5d2"
  },
  infoButtonTitle_MED: {
    marginBottom: 2,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2d2c2c",
    fontSize: 20
  },
  infoButtonSubtitle_MED: {
    padding: 3,
    fontSize: 13,
    color: "#2d2c2c"
  },
  infoButtonType_MED: {
    padding: 3,
    color: "#b0ac3c"
  },


  infoButton_MED_OLD: {
    backgroundColor: '#FFF8B4',
    borderColor: "#111"
  },
  infoButtonTitle_MED_OLD: {
    marginBottom: 2,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2d2c2c",
    fontSize: 20
  },
  infoButtonSubtitle_MED_OLD: {
    padding: 3,
    fontSize: 13,
    color: "#2d2c2c"
  },
  infoButtonType_MED_OLD: {
    padding: 3,
    color: "#8d893a"
  },

  // CONDITION
  infoButton_CON: {
    backgroundColor: '#C6B8FF',
    borderColor: "#fde5d2"
  },
  infoButtonTitle_CON: {
    marginBottom: 2,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2d2c2c",
    fontSize: 20
  },
  infoButtonSubtitle_CON: {
    padding: 3,
    fontSize: 13,
    color: "#2d2c2c"
  },
  infoButtonType_CON: {
    padding: 3,
    color: "#C6B8FF"
  },






  // PICKER
  picker: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    width: 200
  },

});