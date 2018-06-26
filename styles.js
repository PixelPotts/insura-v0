import React, {StyleSheet} from 'react-native';
export default StyleSheet.create({
  masterWrap: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0,
    backgroundColor: '#404861',
    zIndex: 2
  },
  paddingWrap: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    height: 30,
    marginBottom: -44,
    marginTop: 0,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0,
    position: 'relative',
    top: 0,
    right: 0,
    zIndex: 3
  },
  backgroundLogo: {
    position: 'absolute',
    top: 0,
    left: -200,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    opacity: 0.05,
    zIndex: -1
  },
  logo: {
    width: 150,
    color: '#0F35AB',
    fontSize: 20,
    borderWidth: 0,
    borderColor: '#FFF'
  },
  backButton: {
    fontWeight:'500',
    fontSize: 30,
    position: 'absolute',
    marginTop: 10
  },
  headerTopRight: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: 150,
    height: 40,
    borderColor: '#FFF',
    borderWidth: 0,
    padding: 0,
  },
  loggedInUserName: {
    textAlign: 'right',
    color: '#d2d2d4',
    borderWidth: 0,
    borderColor: 'white',
    marginTop: 13
  },
  loginRegisterLinks: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 0,
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'red'
  },
  signOutLink: {
    textAlign: 'right',
    color: '#ffb601',
    marginBottom: 10,
    paddingBottom: 10
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
    borderBottomColor: '#575e73',
    borderBottomWidth: 1,
    borderLeftColor: '#493E3E',
    borderLeftWidth: 1,
    marginTop: 7,
    height: 50,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 2,
    backgroundColor: '#495169',
    zIndex: 2,
    color: '#FFF',
  },
  masterInputNoticeWrap: {
    position: 'absolute',
    width: 70,
    height: 51,
    top: 58,
    right: -1,
    zIndex: 999,
    backgroundColor: 'red',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  masterInputNoticeText: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 11,
    padding: 3
  },
  masterQuestion: {
    marginTop: 20,
    fontSize: 26,
    color: '#d2d2d4',
    borderWidth: 0,
    borderColor: 'red',
  },
  masterQuestionWrap: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 0,
    padding: 0,
    marginTop: 0,
  },
  answerButtonsWrap: {
    position: 'absolute',
    top: 59,
    left: 0,
    flexDirection: 'row',
    zIndex: 3,
    backgroundColor: 'transparent',
    width: '96%',
    borderRadius: 3,
    overflow: 'hidden'
  },
  answerButton: {
    backgroundColor: '#676F89',
    marginRight: 0,
    height: 49,
    borderLeftWidth: 1,
    borderLeftColor: '#6a7aa1',
    borderRightWidth: 1,
    borderRightColor: '#485573',
    // borderRadius: 5,
    minWidth: 100,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0
  },
  answerButtonText: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    marginTop: 13,
    color: '#D0D0D0'
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
    backgroundColor: '#676F89',
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  autoSuggestItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#556085'
  },
  autoSuggestItemTitle: {
    padding: 15,
    color: '#fff'
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
    color: '#ffb601'
  },
  idScanButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
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
    overflow: 'hidden',
    marginLeft: -8,
    marginTop: 10,
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
    color: '#ababad',
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
    width: '100%',
    height: '100%',
    borderRadius: 0,
    backgroundColor: 'white',
    zIndex: 10,
    margin: 0,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 80,
    opacity: 1,
    // display: 'none'
  },
  calculatorHeader: {
    marginBottom: 0,
    flexDirection: 'row'
  },
  calculatorLogo: {
    // flex: 1,
    height: 50,
    width: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#fbfbfb',
  },
  calculatorProductsCounter: {
    marginBottom: 20
  },
  calculatorProductsCounterHighlight: {
    fontWeight: '700'
  },
  calculatorContentScrollView: {
    borderTopColor: '#d1d1d1',
    borderTopWidth: 1,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    backgroundColor: '#fafafa',
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
  calculatorTermsWrap: {
    marginTop: 10,
    marginLeft: 20
  },
  calculatorFaceValueWrap: {
    marginTop: 10,
    marginLeft: 5
  },

  calculatorProductWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 20,
    borderWidth: 0,
    borderColor: 'red'
  },
  calculatorProductPeriodCostWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 5,
    borderWidth: 0,
    borderColor: 'green',
    maxHeight: 42,
    width: 100
  },
  calculatorProductPeriodCostWrapProduct: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 0,
    minWidth: 300,
    // textAlign: 'left'
  },
  calculatorProductWrapTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  calculatorProductWrapProduct: {
    fontSize: 14,
    fontWeight: '900',
    borderWidth: 0,
    borderColor: 'blue'
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
    // borderColor: '#373737',
    // borderWidth: 0.5
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
    borderColor: '#373737',
    borderWidth: 0,
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.15,
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
    backgroundColor: '#566b98',
  },
  infoButtonTitle_BIO: {
    fontSize: 14,
    marginBottom: 2,
    marginTop: 10,
    fontWeight: "600",
    color: "#E7E7E7"
  },
  infoButtonSubtitle_BIO: {
    padding: 3,
    fontSize: 20,
    color: "#FFF"
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
    backgroundColor: '#23ABCC',
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





  // Export View ===================================

  exportView: {
    position: 'absolute',
    top: 22,
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: 60,
    backgroundColor: '#FFF',
    // opacity: 0.1,
    padding: 20,
    // display: 'none',
    zIndex: 5
  },
  exportContentWrap: {
    flex: 1,
    flexDirection: 'column',
    // borderColor: 'green',
    // borderWidth: 1
  },
  exportLineItemWrap: {
    flex: 1,
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    maxHeight: 25,
    minWidth: '100%',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  exportLineItemHeader: {
    minWidth: 160,
    fontWeight: '900'
  },
  exportLineItem: {
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






  // MODAL
  modalWrap: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100
  },
  modalMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#00091c',
    opacity: 0.4,
    width: '100%',
    height: '100%',
    zIndex: 100
  },
  modal: {
    top: 22,
    backgroundColor: '#FFF',
    // minHeight: 644,
    // minWidth: 375,
    maxWidth: 500,
    maxHeight: 626,
    width: '100%',
    height: '100%',
    padding: 15,
    borderRadius: 12,
    borderColor: '#3b4485',
    borderWidth: 1,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  modalHeading: {
    marginBottom: 20,
    fontSize: 20,
    width: 200
  },
  modalInput: {
    borderColor: 'transparent',
    borderBottomColor: '#c8cffd',
    borderWidth: 1,
    marginBottom: 7,
    height: 32,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 0,
    backgroundColor: '#FFF'
  },
  modalSubmit: {
    marginTop: 7
  },
  formErrorMessage: {
    color: '#F00'
  },


  // MENU ============================
  menu: {}, // style is embedded in Animated.View
  menuLogo: {
    fontSize: 30,
    color: '#3b4485',
    fontStyle: 'normal',
    transform: [
      {skewX: '-2deg'},
      {skewY: '-8deg'},
    ]
  },
  menuCloseIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 20,
    borderWidth: 0,
    borderColor: 'red'
  },
  menuItemWrap: {
    width: '100%',
    marginLeft: 0,
    marginTop: 30,
  },
  menuItem: {
    fontSize: 13,
    height: 55,
    paddingTop: 20,
    paddingLeft: 25,
    backgroundColor: '#f9f9f9',
    marginBottom: 2,
    color: '#000046',
  },





  // SUPPORT MODAL ====================
  supportModal: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-start',
    top: 70,
    right: -1,
    backgroundColor: '#FFF',
    minWidth: 350,
    width: '75%',
    marginBottom: 54,
    minHeight: 380,
    aspectRatio: 2,
    zIndex: 10,
    borderWidth: 1,
    borderLeftColor: '#7680a1',
    shadowOffset:{  width: -3,  height: -3,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    opacity: 0.95,
  },
  supportMessagesWrap: {
    backgroundColor: '#ddeeee',
    width: '100%',
    flexGrow: 1
  },
  supportMessageInput: {
    paddingLeft: 14,
    // height: 40,
    width: '100%'
  }

});