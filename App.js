/*
 * TODO:
 * - Change NLUL -> TERM
 * -
 */

version = "0.4"

import React, { Component } from 'react';
import {
  AlertIOS,
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  PushNotificationIOS,
  LayoutAnimation,
  Animated,
  Easing,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  AsyncStorage,
} from 'react-native';
import CalculatorProduct from "./calculatorProduct"
import Analytics from "appcenter-analytics"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Import redux actions
import { fetchSupportMessages, setRedDot, toggleSupportModal, toggleNewChatModal } from './actions/supportActions';
import { setActiveSubscription, setAvailableProducts, setCookedProducts, selectProduct } from './actions/inAppPurchaseActions'

// Import In-App Purchases
import * as RNIap from 'react-native-iap';

// Push Notifications Set Up
import PushNotification from 'react-native-push-notification';
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  popInitialNotification: true,
});


const dismissKeyboard = require('react-native/Libraries/Utilities/dismissKeyboard')
import { MediaQuery } from "react-native-responsive-ui";
import Device from "react-native-responsive-ui/lib/Device";
import MediaQuerySelector from "react-native-responsive-ui/lib/MediaQuerySelector";
import AutoScroll from 'react-native-auto-scroll'
import { LiteCreditCardInput } from "react-native-credit-card-input"
import * as firebase from 'firebase'
import RNPickerSelect from 'react-native-picker-select'
import Hyperlink from 'react-native-hyperlink'
import _ from 'lodash'
import styles from './styles'
import Storage from 'react-native-storage';
import moment from 'moment';
import Push from 'appcenter-push';
// import {captureScreen,releaseCapture} from "react-native-view-shot";
import LinearGradient from 'react-native-linear-gradient';
import ChatSupport from './components/ChatSupport';
import NewChatModal from './components/NewChatModal'

const stringifyObject = require('stringify-object')
const Providers = require('./providers').default.providers
const DeclinedDrugs = require('./decline_drugs').default.medications
const CoverageLimits = require('./coverage-limits').default
var TimerMixin = require('react-timer-mixin');
const { width, height } = Device.dimensions.window;
const PHONE = MediaQuerySelector.query({ orientation: "portrait", minHeight: 1 }, width, height)
const IPHONE_X = MediaQuerySelector.query({ minHeight: 812, minWidth: 375 }, width, height);
const resetTimer = 1000 * 30;

import Swipeout from 'react-native-swipeout';
var codePush = require("react-native-code-push");

let Build = { min: {}, max: {} }
Build.min = require('./weight-min').default.min
Build.max = require('./weight-max').default.max

const TestFairy = require('react-native-testfairy');

const Conditions = require('./decline_conditions').default.conditions;
const Medications = require('./medications2').default.all;
const Calculator = require('./calculatorData').default;
let Questions = require('./questions').default.questions;

const uniqueId = "CDf0zu-cs24N64lIw-t2OAxvvQA-PbXIxjhNv-Hdk7LxQ0k-pXK1pehOItc-bG79adAAPk"

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {
    // we'll deal with this later...
  }
})
global.storage = storage;

// BLINK ID License Key
import { BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys } from 'blinkid-react-native';
const BlinklicenseKey = Platform.select({
  ios: '67ZRQWEZ-VOKTBUVI-OEW3PUK7-6GINDEGW-QI37PNSN-W4UYM66C-KXEVFNZI-LWHEKJRS',
});

const logos = {
  0: require('./images/insura_logo_bg.png'),

  // Logos
  1: require('./images/logo_moo.png'),
  2: require('./images/logo_am.png'),
  3: require('./images/logo_ta.png'),
  4: require('./images/logo_for.png'),
  5: require('./images/logo_cfg.png'),
  6: require('./images/logo_roy.png'),
  7: require('./images/logo_aig.png'),
  8: require('./images/logo_sag.png'),

  100: require('./images/insura-how-to.png'),
};

const gradients = {
  1: require('./images/orange-gradient.png'),
  2: require('./images/yellow-gradient.png'),
  3: require('./images/green-gradient.png')
}

var CustomLayoutSpring = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.8,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.2,
  },
};
var CustomLayoutSpringSlow = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.4,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.2,
  },
};

// Linear with easing
var CustomLayoutLinear = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

let adminInitialMsg = "Hi there. If you run into any issues with the app or have an idea for a feature request let us know. We normally reply within an hour."

let conditionsToFlag = 5
let calculatorTermStart = '20'
let calculatorFaceValueStart = '25,000'
let clientStartAge = 50;
let clientStartGender = 'M';
let clientStartHeight = 69;
let clientStartWeight = 170;
let clientStartName = getRandomName()
let clientInfoStart = {
  key: clientStartName.key,
  name: clientStartName.first + ' ' + clientStartName.last,
  firstName: clientStartName.first,
  middleName: '',
  lastName: clientStartName.last,
  gender: clientStartGender,
  age: clientStartAge,
  dob: '',
  height: clientStartHeight,
  weight: clientStartWeight,
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  race: '',
  ssn: '',
  tobacco: 'None',
  modified: false
};

let calculatorHiddenNoticesTemplate = {};

class Insura extends Component {
  constructor(props) {

    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      questionAnswer: '',
      masterInputNotice: null,
      activeQuestionId: 0,
      activeButtonId: 0,
      questionCounter: 1,
      buttons: [],
      autoSuggestVisible: false,
      autoSuggestOptions: [],
      answerButtonsVisible: true,
      consoleIsVisible: false,
      consoleContent: "App restarted\n",
      BlinkShowImage: false,
      BlinkResultImage: '',
      BlinkResults: '',
      BlinkLicenseKeyErrorMessage: '',
      Providers: Providers,
      clientInfo: clientInfoStart,
      calculatorVisible: false,
      calculatorPositionX: 0,
      calculatorFaceValue: calculatorFaceValueStart,
      calculatorTerms: calculatorTermStart,
      calculatorHiddenProducts: [],
      calculatorHiddenNotices: {},
      calculatorClientAge: "",
      calculatorCounter: 0,
      calculator: {},
      exportVisible: false,
      clientHistoryVisible: false,
      clientHistory: [],

      // Form / Login
      modalMaskVisible: false,
      loading: true,
      loadingClientHistory: true,
      user: {
        email: "unknown",
        redDot: false
      },
      formError: false,
      formErrorNotice: false,
      registerVisible: false,
      registerFullName: null,
      // registerFullName: 'Bryan Potts',
      registerEmail: null,
      // registerEmail: 'pottspotts+25@gmail.com',
      registerPhone: null,
      registerPhoneResult: null,
      registerPassword: null,
      // registerPassword: 'test123',
      registerConfirmPassword: null,
      // registerConfirmPassword: 'test123',
      registerCC: {},
      registerCCStatuses: {},
      refisterCCValid: false,
      registerPlanID: stripe_mode === "PROD" ? subscriptioons.prod[0].value : subscriptioons.test[0].value,
      loginVisible: false,
      choosePlanVisible: false,
      loginEmail: null,
      termsOfServiceChecked: false,
      acceptAIChecked: false,
      // loginEmail: 'pottspotts+100@gmail.com',
      loginPassword: null,
      // loginPassword: 'merchan1',
      resetPasswordVisible: false,
      menuVisible: false,
      menuPosition: new Animated.Value(-250),
      supportVisible: false,
      supportInput: '',
      supportMessages: [],
      underwritingNotices: [],
      instructionsVisible: false,
    };
  }


  setCalculatorHiddenNoticesTemplate = () => {
    // Setup blank hidden notices object
    let notices = {}
    calculatorHiddenNoticesTemplate = {}
    _.each(Providers, function (provider) {
      _.each(provider.products, function (product) {
        notices[product.id] = { full: [], short: [] }
        _.each(product.calculator.products, function (calculatorProduct) {
          notices[calculatorProduct.id] = { full: [], short: [] }
        })
      })
    })
    calculatorHiddenNoticesTemplate = notices
    this.clearCalculatorHiddenNotices()
  }
  clearCalculatorHiddenNotices = () => { this.setState({ calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }) }

  async getInAppPurchaseItems() {
    const itemSkus = Platform.select({
      ios: [
        '3',
        '2',
        '1',
      ],
    });
    try {
      const products = await RNIap.getProducts(itemSkus);
      // Save Products in Redux Store.
      let iosProducts = [];
      products.forEach(product => {
        let desc = ''
        let price = ''
        switch (product.productId) {
          case '1':
            desc = 'You get billed $48 every 30 days.'
            price = '$48/mo'
            break;
          case '2':
            desc = 'You get billed $148 every 90 days.'
            price = '$90/3mo'
            break;
          case '3':
            desc = 'One payment of $300 for 12 months access.'
            price = '$300/1yr'
            break;
          default:
            break;
        }
        let cookedProduct = {
          label: product.title,
          value: product.productId,
          desc: desc,
          price: price
        }
        iosProducts.push(cookedProduct)
      });
      this.props.setCookedProducts(iosProducts)
      this.props.setAvailableProducts(products);
    } catch (err) {
      console.warn(err);
    }
  }

  saveSubscriptionState(user) {
    const activeSubscription = user.activeSubscription;
    const subscriptionPlan = user.subscriptionPlan;
    this.props.setActiveSubscription(activeSubscription, subscriptionPlan);
  }

  componentDidMount() {
    this.getInAppPurchaseItems()
    this.setCalculatorHiddenNoticesTemplate()

    var onSyncStatusChange = function (SyncStatus) {
      // alert("onSyncStatusChange()")
      switch (SyncStatus) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          // console.log("checking for update")
          break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
          // console.log("waiting for user action")
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          // console.log("installing update")
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          // alert("Update isntalled. Reset app to get the latest version.")
          break;
      }
    }

    // Check for app update
    this._interval = setInterval(() => { codePush.sync({ updateDialog: false }, onSyncStatusChange); }, resetTimer);

    // Initialize Firebase
    const firebaseConfig = {
      appId: "1:292940424411:ios:b22bd4f0743fec70",
      apiKey: "AIzaSyD8Jc91V77cVQfZmQ351jak2GyjTUbi1xE",
      authDomain: "insura-app.firebaseapp.com",
      databaseURL: "https://insura-app.firebaseio.com",
      storageBucket: "insura-app.appspot.com",
    };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    let db = firebase.database();

    // Listen for internet connection status and update our state var
    // var connectedRef = firebase.database().ref(".info/connected");
    // connectedRef.on("value", (snap) => {this.setState({internetConnected:snap.val()});

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loading: false });
      if (firebase.auth().currentUser === null) {
        this.setState({ modalMaskVisible: true, registerVisible: true });
      } else {
        this.setState({ modalMaskVisible: false, registerVisible: false, loginVisible: false });

        // Get the initial user object
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
          this.setState({ user: snapshot.val() }, () => {
            console.log("This is the user coming back from the database")
            console.log(snapshot.val())
            this.saveSubscriptionState(snapshot.val())
            this.getSupportMessages();
            checkUserSeenInstrctions();
            this.getClientHistory();
          })
        })
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) => {
          this.setState({ user: snapshot.val() }, () => {
            // console.log("======= Updated the User object froom .on() read")
            // console.log(this.state.user)
          })
        })
      }
    });
    checkUserSeenInstrctions = () => {
      if (this.state.user.hasSeenInstructions === undefined) {
        this.setUserMeta('hasSeenInstructions', 0)
        this.setState({ instructionsVisible: true })
      } else {
        if (this.state.user.hasSeenInstructions < 2) {
          this.setState({ instructionsVisible: true })
        }
      }
    }

  }

  componentWillUnmount() {
    this.authSubscription();
    TestFairy.begin("0b43fbd57420a2d774299b1e10e75ca1ff5249af");
    RNIap.endConnection();
  }

  log = (content) => {
    // let str = stringifyObject(content) + " " + Math.floor(Date.now() / 1000) + "\n" + this.state.consoleContent;
    let str = stringifyObject(content) + "\n" + this.state.consoleContent;
    this.state.consoleContent = str.substr(0, 4999);
    // console.log(str);
    this.setState({ consoleContent: str });
  };
  setAnswerFromButton = (questionId) => {
    // console.log("setAnswerFromButt() =====================")
    // console.log("questionId: "+questionId)
    // console.log("buttons:")
    // console.log(this.state.buttons)
    button = _.find(this.state.buttons, function (b) { return b.questionId == questionId })
    // console.log("button found by ID:")
    // console.log(button)
    if (typeof button != 'undefined') {
      if (button.field === 'dob') button.subtitle = button.subtitle.replace(/\(.*\)/gm, '').trim(); // remove anything in ()s
      this.setState({ questionAnswer: button.subtitle }, () => {
        //console.log(this.state.questionAnswer)
      })
    }
  }
  nextQuestion = (skip = false) => {
    // console.log("nextQuestion()")
    Q = Questions[this.state.activeQuestionId]
    // require option select
    if (Q.submitByReturn === false && !skip && Q.fieldType == 'buttons') {
      // this.setState({masterInputNotice:'PRESS OPTION'});
      // return false
    }
    // LayoutAnimation.configureNext(CustomLayoutSpring);
    if (!this.validateAnswer()) return
    // console.log("nextQuestion, answer is validated");
    if (this.state.questionCounter < Questions.length) this.setState({ questionCounter: this.state.questionCounter + 1 });
    if (!skip) this.processAnswer(Q.category, { answer: this.state.questionAnswer });
    if (Questions[this.state.activeQuestionId + 1]) {
      this.setState({ activeQuestionId: this.state.activeQuestionId + 1 });
      this.setState({ activeButtonId: this.state.activeQuestionId + 1 });
      // this.setAnswerFromButton(this.state.activeQuestionId+1)
    }
  };
  prevQuestion = () => {
    if (this.state.questionCounter > 1) this.setState({ questionCounter: this.state.questionCounter - 1 });
    if (Questions[this.state.activeQuestionId - 1]) {
      this.setState({ activeQuestionId: this.state.activeQuestionId - 1 });
      this.setState({ activeButtonId: this.state.activeQuestionId - 1 });
      this.setAnswerFromButton(this.state.activeQuestionId - 1)
    }
  };
  validateAnswer = () => {
    // console.log("running validateAnswer()")
    const Q = Questions[this.state.activeQuestionId]
    const a = this.state.questionAnswer.toString().trim()
    //console.log(Q); console.log(a)
    if (!a.length) return 1

    stat = 1
    switch (Q.fieldType) {
      case 'buttons':
        if (a.length < 1) {
          stat = 0
        }
      case 'options': stat = 1 // questions that use autosuggest
        break
      case 'int':
      case 'float':
        stat = parseInt(number_format(a)) > 0 ? 1 : 0
        if (stat == 0) this.setState({ masterInputNotice: 'NUMBER NEEDED' });
        break
      case 'full-name':
        name = a.replace(/[^a-zA-Z ]/, '').trim()
        if (name.length < 5) stat = 0
        if (a.split(' ').length < 2) stat = 0
        if (stat == 0) this.setState({ masterInputNotice: 'TOO SHORT' });
        break
      case 'dob':
        if (a.trim().length < 6) { this.setState({ masterInputNotice: "TOO\nSHORT" }); return 0 }
        let m = /([0-9]){1,2}[^0-9]*([0-9]{1,2})[^0-9]*([0-9]{2,4})/.exec(a);
        if (!m) { this.setState({ masterInputNotice: 'WRONG FORMAT' }); return 0 }
        if (m.length < 4) {
          stat = 0
          if (stat == 0) this.setState({ masterInputNotice: 'WRONG FORMAT' });
        } else {
          if (m[1].length < 1 || m[2].length < 1 || m[3].length < 2) stat = 0
          if (stat == 0) this.setState({ masterInputNotice: 'TOO SHORT' });
        }
        break
      case 'email':
        if (! /(.+)@(.+){2,}\.(.+){2,}/.test(a)) {
          this.setState({ masterInputNotice: 'INVALID EMAIL' });
          return 0
        }
    }
    // console.log("stat:"); console.log(stat)
    if (stat == 1) this.setState({ masterInputNotice: null });
    return stat
  }
  processAnswer = (category, details) => {
    this.refs.answer.blur()
    let self = this;
    details.answer = details.value === undefined ? details.answer : details.value;
    const rawAnswer = details.answer

    if (!details.answer && !(category === 'MED' || category === 'MED_OLD' || category === "CON")) return false // don't process empty answers
    Q = Questions[this.state.activeQuestionId];
    let clientInfo = this.state.clientInfo;
    if (Q.field === 'name') {
      name = details.answer.split(' ')
      clientInfo.name = details.answer
      clientInfo.firstName = name[0]
      clientInfo.lastName = name[1]
    }
    if (Q.field === 'dob') {
      const dob = this.formatDOB(details.answer);
      const age = this.getAge(dob);
      clientInfo.dob = dob;
      clientInfo.age = age;
      details.answer = dob + " (" + age + "yo)";
    }
    if (Q.field === 'height') {
      clientInfo.height = details.answer;
      details.answer = this.formateHeight(details.answer);
    }
    if (Q.field === 'weight') {
      clientInfo.weight = details.answer;
      details.weight = details.answer
    }
    if (Q.field === 'gender') {
      clientInfo.gender = details.answer === 'Male' ? 'M' : 'F';
      details.gender = details.answer
    }
    if (Q.field === 'tobacco-use-type') {
      clientInfo.tobacco = details.answer;
      details.tobacco = details.answer
    }
    if (Q.field === 'mortgage') {
      // clientInfo.calculatorFaceValue = details.answer;
      details.answer = '$' + number_format(details.answer);
    }
    if (Q.field === 'mortgage-rate') {
      clientInfo.calculatorFaceValue = details.answer
      details.answer = parseFloat(details.answer) + "%";
    }

    // UPDATE EXISTING BUTTON
    if (_.find(this.state.buttons, function (o) { return o.field === Q.field })
      && !(category === 'MED' || category === 'MED_OLD' || category === "CON")) {
      if (category === "BIO") {
        this.setState({ clientInfo });
        let buttons = { ...this.state.buttons };
        if (this.state.activeButtonId in buttons) buttons[this.state.activeButtonId].subtitle = details.answer;
        this.setState([{ buttons }]);
      }

      // START A NEW BUTTON
    } else {
      let B = {
        id: this.state.buttons.length + 1,
        category: category,
        field: Q.field,
        questionId: this.state.activeQuestionId,
        buttonButtonId: 0,
        raw: details.answer,
        manualEntry: false
      };
      if (category === "BIO") {
        let clientInfo = { ...this.state.clientInfo };
        clientInfo[Q.field] = details.answer;
        B.title = Q.title;
        B.subtitle = details.answer.toString().trim();
      }
      else if (category === "MED" || category === "MED_OLD") {
        B.title = B.raw = _.startCase(_.toLower(details.name));
        B.subtitle = details.dosage;
        B.key = details.id;
        B.manualEntry = details.manualEntry
      }
      else if (category === "CON") {
        B.title = B.raw = _.startCase(_.toLower(details.name));
        B.key = details.id;
      }
      if (_.trim(B.title) === '') return;
      this.setState(prevState => ({ buttons: [...prevState.buttons, B] }), () => {
        // this.updateProviders(false,'new start button, line 561');
      });
    }
    if ('answerOptions' in Q) {
      this.nextQuestion(true);
    }

    clientInfo.modified = true;
    this.setState({ clientInfo: clientInfo, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => {
      this.clearAnswer()
      // this.updateProviders(false,'process answer, line 571');
      this.updateCalculatorValues(this.state.calculatorFaceValue, this.state.calculatorTerms, 'end of process answer')
    });

  };
  clearAnswer = () => {
    this.setState({ questionAnswer: '' });
  };
  getAge = (dob) => {
    // console.log("getAge():");
    // console.log(dob);
    let today = new Date();
    let birthDate = new Date(dob);
    // console.log("biorthdate:"); console.log(birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    // console.log("age:"); console.log(age);
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    // console.log("returning age of: "+age);
    return age;
  };
  formatDOB = (str) => {
    // console.log("=== FORMATTING DOB ====");
    // console.log(str);
    if (_.trim(str) === '') return;
    let m = /([0-9]{1,2})[^0-9]*([0-9]{1,2})[^0-9]*([0-9]{2,4})/.exec(str);
    // console.log(m)
    let dob = m[1] + "/" + m[2] + "/" + m[3];
    // console.log(dob)
    return dob;
  };
  formateHeight = (height) => {
    // console.log("height");
    // console.log(height);
    if (!height) return;
    return parseInt(parseInt(height) / 12) + "' " + height % 12 + "'' or " + height + "''";
  };
  updateProviders = (restart = false, from = 'ERROR: NO LOCATION GIVEN TO UPDATEPROVIDERS') => {
    // console.log("updateProviders called from: %s", from);
    // console.log("0o0oo0oo0oo0 Updating providers 0o0o0o0o0o0");
    // console.log(this.state.buttons);
    // console.log(this.state.clientInfo);
    let self = this;
    const age = this.state.clientInfo.age;
    let Providers = { ...this.state.Providers };
    const client = this.state.clientInfo;
    const term = this.state.calculatorTerms;
    let notices = {};
    _.each(Providers, (Provider, ProviderKey) => {
      _.each(Provider.products, (product, productKey) => {
        let numConditions = 0;
        let uw = product.underwriting;
        let statuses = [];
        notices[product.id] = { full: [], short: [] }


        // Check that the products in this product support the uses current age
        let guaranteed = false;
        _.each(product.calculator.products, (calcProduct) => {
          notices[calcProduct.id] = { full: [], short: [] }
          if (calcProduct.guaranteedIssue) guaranteed = true;
          // console.log("========= PRODUCT AGE CHECK ==========");
          table = calcProduct.table;
          // CALCULATE MONTHLY AND ANUUAL COST
          let anyTermSupported = false;
          switch (calcProduct.tableType) {
            case 'term--age--gender-smokerStatus':
              anyTermSupported = false;
              _.each(table, function (term) {
                // console.log("=== term ===");
                // console.log(term);
                if (typeof term[age] !== "undefined") anyTermSupported = true;
              })
              if (!anyTermSupported) {
                notices[calcProduct.id].full.push(calcProduct.name + " does not have a term that supports age " + age);
                notices[calcProduct.id].short.push("Not available for " + age + "yo");
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--term-smokerStatus':
              if (typeof table[age] === "undefined") {
                notices[calcProduct.id].full.push(calcProduct.name + " does not support age of " + age);
                notices[calcProduct.id].short.push("Not available for " + age + "yo");
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--gender-smokerStatus':
              if (typeof table[age] === "undefined") {
                notices[calcProduct.id].full.push(calcProduct.name + " does not support age of " + age);
                notices[calcProduct.id].short.push("Not available for " + age + "yo");
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--gender':
              if (typeof table[age] === "undefined") {
                notices[calcProduct.id].full.push(calcProduct.name + " does not support age of " + age);
                notices[calcProduct.id].short.push("Not available for " + age + "yo");
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
          }


          // If the age is supported in any of the products in the loop above, force approval
          // console.log("statuses: "); console.log(statuses);
          if (_.max(statuses) === 3) statuses = [3];


          // Check the build charts for height/weight requirements
          //
          // console.log("====== checking product height/weight reqs ======");
          // console.log(product);

          if (client.height in Build.min && client.height in Build.max) {
            // console.log("=== checking height and weight ===");
            let minWeight = Build.min[client.height][product.nickname];
            let maxWeight = Build.max[client.height][product.nickname];

            // Return ICs for numbers out of bounds
            if (maxWeight === 'IC' || minWeight === 'IC') {
              notices[product.id].full.push(calcProduct.name + " does not list BMI requirements for a height of " + client.height + "in. ");
              notices[product.id].short.push("No cost for BMI/height " + client.height + "in.");
              statuses.push(2);

              // Return As for accepted (usually guranteed issue products without specific BMI requirements)
            } else if (maxWeight === 'D' || minWeight === 'D') {
              notices[product.id].full.push(calcProduct.name + " declines BMI for a height of " + client.height + "in. and weight of " + client.weight);
              notices[product.id].short.push("Does not suppoort BMI at " + client.height + "in/" + client.weight + "lb");
              statuses.push(1);

              // Accepted (probably guaranteed issue)
            } else if (maxWeight === 'A' && minWeight === 'A') {
              statuses.push(3);
              // console.log("BMI Accepted (guaranteed).");
            }

            // If we're through the ICs and As, parse these as INTs and let's get this party started
            minWeight = parseInt(minWeight);
            maxWeight = parseInt(maxWeight);
            clientWeight = parseInt(client.weight);

            if (clientWeight < minWeight) {
              notices[product.id].full.push(calcProduct.name + " declines BMI as under-weight: weight of " + client.weight);
              notices[product.id].short.push("Underweight BMI at " + client.height + "in/" + client.weight + "lb");
              statuses.push(1);
            }
            if (clientWeight > maxWeight) {
              notices[product.id].full.push(calcProduct.name + " declines BMI as over-weight: weight of " + client.weight);
              notices[product.id].short.push("Does not support BMI at " + client.height + "in/" + client.weight + "lb");
              statuses.push(1);
            }

          } else {
            notices[product.id].full.push(calcProduct.name + " does not list BMI requirements for a height of " + client.height + "in.");
            notices[product.id].short.push("No cost for BMI at " + client.height + "in/" + client.weight + "lb");
            statuses.push(2);
          }
        })

        // check medications and conditions
        _.each(self.state.buttons, function (button) {

          if (button.manualEntry) return false;

          // If this is a medication...
          if (button.category === 'MED') {
            let medication = _.find(Medications, function (o) { return o.id == button.key });
            // console.log("medication / button:")
            // console.log(medication)
            // console.log(button)

            // console.log("checking drug list:")

            medication = _.filter(DeclinedDrugs, function (dd) {

              // console.log("Filtering %s", dd.name)

              // console.log("dd.name"+_.toLower(dd.name))
              // console.log("medication.name: "+_.toLower(medication.name))
              const ret = _.includes(_.toLower(medication.name), _.toLower(dd.name))
              // console.log(ret)
              return ret
            })[0]


            // If the drug exists in our databases
            if (medication) {
              // console.log("Medication is not undefined...")


              if (product.nickname in medication) {

                // console.log("Name is in medication...")

                let status = medication[product.nickname];
                let arr = _.split(status, '-'); // split out encoded answers
                status = arr[0]; // update medications to use the first segment regardless
                query = 0;
                if (arr.length > 1) { // if a second segment is found, use it
                  let query = arr[1];
                }

                switch (status) {
                  case 'A':
                    statuses.push(3);
                    break;
                  case 'IC':
                    statuses.push(2);
                    notices[product.id].full.push(product.name + " needs to review: " + medication.name);
                    // notices[product.id].short.push(medication.name+" needs review");
                    break;
                  case 'D':
                    statuses.push(1);
                    notices[product.id].full.push(product.name + " does not cover : " + medication.name);
                    notices[product.id].short.push(medication.name + " not covered");
                    break;

                  default:
                    statuses.push(3);
                }
              } else {
                statuses.push(3);
              }

              // If the drug does not exist in our databses, it must be a manual entry that we want to allow
            } else {
              statuses.push(3);
            }

          }

          if (button.category === 'CON') {
            numConditions++
            let condition = _.find(Conditions, function (o) { return o.id == button.key });
            // console.log("checking condition...........");
            // console.log(condition);
            // console.log(product.nickname);

            if (condition !== undefined) {

              let status = condition[product.nickname];
              let query = 0;
              let arr = _.split(status, '-'); // split out encoded answers
              status = arr[0]; // update medications to use the first segment regardless
              if (arr.length > 1) { // if a second segment is found, use it
                query = arr[1];
              }

              switch (status) {
                case 'A':
                  statuses.push(3);
                  break;
                case 'IC':
                  statuses.push(2);
                  notices[product.id].full.push(product.name + " needs to review: " + condition.name);
                  notices[product.id].short.push(condition.name + " needs review");
                  break;
                case 'D':
                  statuses.push(1);
                  notices[product.id].full.push(product.name + " does not allow: " + condition.name);
                  notices[product.id].short.push(product.name + " does not allow: " + condition.name);
                  break;
                case 'Q':
                  // console.log(" ========== Case Q ========== ");
                  // console.log("button.buttonButtonId: " + button.buttonButtonId);
                  // console.log("query: " + query);
                  if (button.buttonButtonId <= query) {
                    statuses.push(1)
                    notices[product.id].full.push(product.name + " does not support: " + condition.name + " within " + query + " years.");
                    notices[product.id].short.push(condition.name + " is too recent");
                  } else {
                    statuses.push(3);
                  }
                  break;

                default:
                  statuses.push(3);
              }

              // If the condition does not exist in our databses, it must be a manual entry that we want to allow
            } else {
              statuses.push(3);
            }
          }
          // Check to see if they have exceeded the number of allowed conditions and turn this to IC (unless its guaranteed)
          if (numConditions >= conditionsToFlag && product.guaranteed !== 1) {
            // console.log("Number of conditions: "+ numConditions);
            statuses.push(2)
            notices[product.id].full.push(product.name + " needs review if the client has 5 or more conditions.");
          }
        });

        // Update Provider and Product
        Providers[ProviderKey].products[productKey].status = _.min(statuses);
        if (restart) Providers[ProviderKey].products[productKey].status = 3; // restart hack to force an initial approval state for all

        // Add calculator sub-products to the hidden list if their parent product is hidden
        if (_.min(statuses) === 1) {
          let hiddenCalcProductIds = this.state.calculatorHiddenProducts
          _.each(product.calculator.products, (calcProduct) => {
            hiddenCalcProductIds.push(calcProduct.id)
          })
          this.setState({ calculatorHiddenProducts: hiddenCalcProductIds }, () => {
            // console.log("=== Updating hidden IDs for calculator sub-products")
            // console.log(this.state.calculatorHiddenProducts)
          })
        }

        // console.log("STATUS NUMBERS");
        // console.log(product.name)
        // console.log(statuses)

      })
    });

    // console.log("=-=-=-=-= UPDATE PROVIDERS Notices =-=-=-=-=")
    mergedNotices = _.merge(this.state.calculatorHiddenNotices, notices)
    const oldNotices = this.state.calculatorHiddenNotices
    this.setState({ calculatorHiddenNotices: mergedNotices }, () => {
      this.getProviderLevelNotices()
      // console.log("Merged and updated notices! (end of updateProviders()");
      // console.log(oldNotices)
      // console.log(notices)
      // console.log(this.state.calculatorHiddenNotices);
    })
  };
  watchAnswer = (questionAnswer) => {
    // console.log("watchAnswer()")
    this.setState({ questionAnswer: questionAnswer });
    if (questionAnswer === '') {
      this.setState({ autoSuggestVisible: false });
      return;
    }
    this.checkAutoSuggest(questionAnswer);
  };
  checkAutoSuggest = (questionAnswer) => {
    if (_.trim(questionAnswer) === '') return;
    let Q = Questions[this.state.activeQuestionId];
    if (Q.suggest) {
      if (["MED", "MED_OLD", "CON"].includes(Q.category)) {
        this.updateAutoSuggestOptions(questionAnswer, Q);
        this.setState({ autoSuggestVisible: (questionAnswer) });
      }
    }
  };
  getSearchData = () => {
    let category = Questions[this.state.activeQuestionId].category;
    let data = [];
    if (category === "MED" || category === "MED_OLD") {
      data = Medications;
      // console.log(data)
    }
    else if (category === "CON") {
      data = Conditions
    }

    return data;
  };
  updateAutoSuggestOptions = (search, Q) => {
    let matches = [];
    let terms = _.split(search, ' ');
    let searchData = this.getSearchData();
    let category = Questions[this.state.activeQuestionId].category;

    // Use the first term to filter by all option names
    matches = _.filter(searchData, function (o) { return _.includes(_.toLower(o.name), _.toLower(terms[0])) }).slice(0, 100);
    terms.shift();

    // console.log("matches:")
    // console.log(matches)
    // console.log("terms:")
    // console.log(terms)

    // filter matches by all remaining terms
    if (terms.length) {
      let matchesTmp = [];
      _.each(terms, function (term) {
        if (_.trim(term)) {
          matchesTmp = _.filter(matches, function (o) { return _.includes(_.toLower(o.name), _.toLower(term.toString())) });
          if (category === 'MED' || category === 'MED_OLD') matchesTmp = _.concat(matchesTmp, _.filter(matches, function (o) { return _.includes(_.toLower(o.dosage), _.toLower(term.toString())) }));
          matches = matchesTmp;
        }
      });
    }

    if (category === "MED" || category === "MED_OLD") {
      matches = matches.sort(function (a, b) { return a.name.length - b.name.length; });
      matches = _.uniqBy(matches, 'key'); // force unique (thanks Obama)
    } // order by shortest name
    if (category === "CON") matches = _.orderBy(matches, 'mifts', 'desc'); // order by shortest name
    // LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({ autoSuggestOptions: matches });
  };
  clickAnswer = (option) => {
    option.manualEntry = option.manualEntry === undefined ? false : option.manualEntry
    this.processAnswer(Questions[this.state.activeQuestionId].category, option);
    this.state.autoSuggestVisible = false;
    this.clearAnswer();
  };
  renderOptions = (buttons) => {
    // console.log('=== renderOptions ===');
    // console.log(this.state.autoSuggestOptions);
    // console.log(this.state.questionAnswer);

    if (this.state.autoSuggestOptions.length > 0) {
      return (
        <View style={styles.autoSuggestWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            {this.state.autoSuggestOptions.map(option => (
              <TouchableHighlight onPress={() => this.clickAnswer(option)} key={option.name + option.id + option.key} underlayColor="#FFF">
                <View style={styles.autoSuggestItem}>
                  <Text
                    style={styles.autoSuggestItemTitle}>
                    {option.name} &nbsp;{option.dosage}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      )
    } else {
      option = { id: _.random(1000000), name: this.state.questionAnswer, dosage: 'N/A', manualEntry: true };
      return (
        <View style={styles.autoSuggestWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
              <View style={styles.autoSuggestItem}>
                <Text
                  style={styles.autoSuggestItemTitle}>
                  {option.name} &nbsp;{option.dosage} <Text style={{ fontWeight: '700' }}>(Manual Entry)</Text></Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      )
    }
  };
  editButton = (button, key) => {
    this.setState({ activeButtonId: key, questionCounter: key + 1 });
    let buttons = { ...this.state.buttons };
    let qId = buttons[key].questionId;
    this.setState({ activeQuestionId: qId });
    if (buttons[key].category === 'BIO') {
      let answer = buttons[key].subtitle;
      if (buttons[key].field === 'dob') answer = buttons[key].subtitle.replace(/\(.*\)/gm, '').trim(); // remove anything in ()s
      this.setState({ questionAnswer: answer });
    }
  };
  deleteButton = (button, key) => {
    if (button.category == "BIO") return // disallow deleting BIO buttons
    let clientInfo = this.state.clientInfo;
    let buttons = { ...this.state.buttons };
    buttons = _.filter(buttons, function (o) { return o.id !== button.id });
    this.setState({ buttons });
    if (button.field === 'dob') {
      clientInfo.age = clientStartAge;
      this.setState({ clientInfo: clientInfo }, () => { this.updateProviders(false, 'delete dob button'); });
    }
    if (button.field === 'weight') {
      clientInfo.age = clientStartWeight;
      this.setState({ clientInfo: clientInfo }, () => { this.updateProviders(false, 'delete weight button') });
    }
    if (button.field === 'height') {
      clientInfo.age = clientStartHeight;
      this.setState({ clientInfo: clientInfo }, () => { this.updateProviders(false, 'delete height button') });
    }

    this.updateProviders(false, 'delete button, end of deleteButton()');
  };
  updateButtonsFromScan = (clientInfo) => {

  };
  renderButtonButtons = (button) => {
    // console.log("rendering renderButtonButtons()");
    // console.log(button);
    let o = false; // medication or condition object, known lovingly here as "o"
    if (button.category === "MED" || button.category === "MED_OLD") {
      o = _.find(DeclinedDrugs, function (o) { return o.id === button.key });
      // console.log("found medication:");
    } else if (button.category === "CON") {
      o = _.find(Conditions, function (o) { return o.id === button.key });
      // console.log("found condition:");
    }
    // console.log(o);
    let needMoreButtons = false; // there is a value like "Q-5" that prompts inner buttons
    for (var product in o) { // iterate over the status of all products for this med/con
      let arr = _.split(o[product], '-'); // split out encoded answers
      status = arr[0]; // update medications to use the first segment regardless
      if (arr.length > 1) { // if a second segment is found, use it
        let query = arr[1];
        needMoreButtons = true;
      }
    }

    let buttons = '';
    let numbers = [1, 2, 3, 4, 5, 10];

    // console.log("needMoreButtons:");
    // console.log(needMoreButtons);
    function activeBgColor(n, active) { return n == active ? '#434343' : 'white' }
    function activeColor(n, active) { return n == active ? 'white' : 'black' }
    if (needMoreButtons)
      return (
        <View style={styles.buttonButtonsWrap}>
          <View><Text style={[styles.buttonButtonTitle, { 'color': 'white' }]}>Years Ago:</Text></View>
          {numbers.map(n => (
            <TouchableHighlight
              key={n}
              onPress={() => { this.clickedButtonButton(n, button) }}>
              <View style={[
                styles.buttonButtonWrap,
                { 'backgroundColor': activeBgColor(n, button.buttonButtonId) }
              ]}>
                <Text style={[styles.buttonButtonText, { 'color': activeColor(n, button.buttonButtonId) }]}>{n}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      )
  }
  clickedButtonButton = (n, activeButton) => {
    // console.log('clicked button button');
    // console.log(n);
    // console.log(activeButton);
    let buttons = this.state.buttons;
    let button = _.find(this.state.buttons, function (b) {
      return b.id === activeButton.id
    });
    button.buttonButtonId = n;
    this.setState({ buttons: buttons });
    this.updateProviders(false, 'end of clickedButtonButton');
  }
  renderButtons = (buttons) => {
    LayoutAnimation.configureNext(CustomLayoutLinear);
    let gradient = {
      colors: {
        'BIO': ['#368faa', '#00789b', '#00617d'],
        'MED': ['#029876', '#008962', '#006e4f'],
        'CON': ['#b05f98', '#a64789', '#85396f']
      },
      location: [0, 0.90, 1]
    }
    return (
      <View>
        <MediaQuery minHeight={1} orientation={"portrait"}>
          <AutoScroll contentContainerStyle={styles.infoButtonsWrap_portrait} keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View style={{ height: 100, width: '100%', borderWidth: 0, borderColor: 'red' }}><Text> </Text></View>
            {buttons.map((button, k) => (
              <TouchableHighlight onPress={() => { this.editButton(button, k) }} onLongPress={() => { this.deleteButton(button, k) }} key={button.id} underlayColor={"transparent"}>
                {/*<View>*/}
                <LinearGradient colors={gradient.colors[button.category]} locations={gradient.location} style={[styles.infoButton_portrait, styles['infoButton_' + button.category]]}>
                  <Text style={[styles.infoButtonTitle, styles['infoButtonTitle_' + button.category]]}>{button.title}</Text>
                  <Text style={[styles.infoButtonSubtitle, styles['infoButtonSubtitle_' + button.category]]}>{button.subtitle}</Text>
                  {this.renderButtonButtons(button)}
                </LinearGradient>
                {/*</View>*/}
              </TouchableHighlight>
            ))}
            <View style={{ height: 220, width: '100%', borderWidth: 0, borderColor: 'red' }}><Text> </Text></View>
          </AutoScroll>
        </MediaQuery>
        <MediaQuery minHeight={1} orientation="landscape">
          <ScrollView contentContainerStyle={styles.infoButtonsWrap} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            {buttons.map((button, k) => (
              <TouchableHighlight onPress={() => { this.editButton(button, k) }} onLongPress={() => { this.deleteButton(button, k) }} key={button.id} underlayColor="transparent">
                <View>
                  <LinearGradient colors={gradient.colors[button.category]} locations={gradient.location} style={[styles.infoButton, styles.infoButton_portrait, styles['infoButton_' + button.category]]}>
                    <Text style={[styles.infoButtonTitle, styles['infoButtonTitle_' + button.category]]}>{button.title}</Text>
                    <Text style={[styles.infoButtonSubtitle, styles['infoButtonSubtitle_' + button.category]]}>{button.subtitle}</Text>
                    {this.renderButtonButtons(button)}
                  </LinearGradient>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </MediaQuery>
      </View>
    )
  };
  renderProviderStatus = (Providers) => {
    return (
      <TouchableHighlight onPress={() => {
        // console.log("::: DEEP CLEAN? :::")
        // console.log(_.cloneDeep(calculatorHiddenNoticesTemplate))
        this.setState({ calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => {
          // console.log("values should be cleared here...")
          // console.log(this.state.calculatorHiddenNotices)
          // console.log("notices template that should have been cleared...")
          // console.log(calculatorHiddenNoticesTemplate)
          this.setState({
            calculatorVisible: true,
            calculatorProduct: 1,
            updateCalculatorValues: this.updateCalculatorValues(this.state.calculatorFaceValue, this.state.calculatorTerms, 'renderProivderStatus()')
          })
        })
      }}>
        <View>
          <MediaQuery minHieght={1} orientation="landscape">
            <View style={styles.providerStatusContainer}>
              {Providers.map(provider => (
                <View key={provider.id} style={styles.providerStatusWrap}>
                  <View><Text style={styles.providerTitle}>{provider.nickname}</Text></View>
                  {provider.products.map(product => (
                    <View key={product.id}
                      style={[styles.providerTitleProductWrap, styles['providerTitleProductWrapStatus_' + product.status]]}>
                      <Text style={[styles.providerTitleProduct, styles['providerTitleProduct_' + product.status]]}>{product.nickname}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </MediaQuery>
          <MediaQuery minHieght={1} orientation="portrait">
            <View style={styles.providerStatusContainer}>
              {Providers.map(provider => (
                provider.products.map(product => (
                  <View key={product.id}
                    style={[styles.providerTitleProductWrap_portrait, styles['providerTitleProductWrapStatus_' + product.status]]}>
                    <Text style={[styles.providerTitleProduct, styles['providerTitleProduct_' + product.status]]}>{product.nickname}</Text>
                  </View>
                ))
              ))}
            </View>
          </MediaQuery>
        </View>
      </TouchableHighlight>
    )
  };
  hideCalculator = () => {
    // console.log('test')
    this.setState({ calculatorVisible: false });
  };
  check = (o, k) => {
    if (!(k in o)) {

    }
  }
  getProductCostAvailability = (product, age, gender, smokerStatus, faceValue, term) => {
    let cost = { month: 0, annual: 0, notice: '' };
    let rate = 0;
    notice = { full: '', short: '' }
    table = product.table;

    // console.log("=-=-=-=-=-= PRODUCT TABLE =-=-=-=-=-=-=");
    // console.log(table);
    //  // CALCULATE SHOW/HIDE STATUS
    // console.log(product.tableType);

    // CALCULATE MONTHLY AND ANUUAL COST
    switch (product.tableType) {
      case 'term--age--gender-smokerStatus':
        if (!(term in table)) {
          cost.notice = "No rate for term '" + term + "' found.";
          return cost;
        }
        else if (!(age in table[term])) {
          cost.notice = "No rate for age '" + age + "' found.";
          return cost;
        }
        rate = table[term][age][gender + "-" + smokerStatus];
        // console.log(" RATE: : %f", rate)
        // console.log(rate)
        // console.log(" gender: : %s", gender)
        break;
      case 'age--term-smokerStatus':
        if (!(age in table)) {
          cost.notice = "No rate for age '" + age + "' found.";
          return cost;
        }
        if (!(term + "-" + smokerStatus in table[age])) {
          cost.notice = "No rate for term/tobacco found, " + term + " (" + smokerStatus + ")";
          return cost;
        }
        if (table[age][term + "-" + smokerStatus] === undefined) return cost;
        // console.log("=== HMS Plust cost check ===")
        // console.log("age:"); console.log(age)
        // console.log("term:"); console.log(term)
        // console.log("smokerStatus:"); console.log(smokerStatus)
        rate = table[age][term + "-" + smokerStatus];
        break;
      case 'age--gender-smokerStatus':
        if (!(age in table)) {
          cost.notice = "No rate for age '" + age + "' found.";
          return cost;
        }
        if (!(gender + "-" + smokerStatus in table[age])) {
          cost.notice = "No rate for term/tobacco found, " + term + " (" + smokerStatus + ")";
          return cost;
        }
        if (table[age][gender + "-" + smokerStatus] === undefined) return cost;
        rate = table[age][gender + "-" + smokerStatus];
        break;
      case 'age--gender':
        if (!(age in table)) {
          cost.notice = "No rate for age '" + age + "' found.";
          return cost;
        }
        if (table[age][gender] === undefined) return cost;
        rate = table[age][gender];
        break;
    }

    // Check for riders and add to the rate
    if ('rider' in product) {
      if (!(age in product.rider)) {
        // console.log("AGE not in product.rider")
        cost.notice = "No rate for age '" + age + "' found.";
        // console.log(cost.notice);
        return cost;
      } else {
        rate += product.rider[age]
      }
    }

    if (rate == null) {
      console.log("Rate is null...")
      console.log(cost)
      return cost
    }

    cost.annual = rate * (_.toInteger(faceValue) / product.multiplier) + product.fee;
    if (product.id === 403)
      cost.annual = (rate * (_.toInteger(faceValue) / product.multiplier) + product.fee) * 12;
    cost.month = cost.annual * product.monthFactor;
    // console.log("Cost output: ")
    // console.log(cost)
    return cost;
  }
  updateCalculatorValues = (updatedFaceValue, updatedTerms, from = 'ERROR: NO LOCATION GIVEN FOR UPDATED CALCULATOR VALUES') => {
    // console.log("updateCalculatorValues: called from: %s",from)
    getProductCostAvailability = this.getProductCostAvailability;
    // console.log("state:");
    // console.log(this.state);
    // console.log("0o0o0o0o0o start updateCalculatorValues o0o0o0o0o0o0");
    // console.log("updatedFaceValue: ");
    // console.log(updatedFaceValue);
    // console.log("updatedTerms: ");
    // console.log(updatedTerms);

    updatedFaceValue = updatedFaceValue === null ? this.state.calculatorFaceValue : updatedFaceValue;
    updatedTerms = updatedTerms === null ? this.state.calculatorTerms : updatedTerms;
    this.setState({ calculatorClientAge: this.state.clientInfo.age + "" });

    updatedFaceValue = updatedFaceValue.toString().replace(/[^0-9\.]/gm, '');
    if (updatedFaceValue < 2000) updatedFaceValue = 2000;

    smokerButton = _.find(this.state.buttons, function (b) { return b.field == "tobacco-use-type" });
    age = this.state.clientInfo.age;

    const smokerStatus = this.state.clientInfo.tobacco === "None" ? "NS" : "S";

    const gender = this.state.clientInfo.gender
    age = this.state.clientInfo.age;

    // console.log("smoker status");
    // console.log(smokerStatus);

    //
    // console.log("PROPS UPDATED:");
    // console.log("updatedFaceValue: ");
    // console.log(updatedFaceValue);
    // console.log("updatedTerms: ");
    // console.log(updatedTerms);

    calc = this.state.calculator;
    this.setState({ calculatorHiddenProducts: [] });
    notices = this.state.calculatorHiddenNotices
    hiddenIds = []

    _.each(Providers, function (provider) {
      // console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== P R O V I D E R ==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==");
      // console.log(provider);
      _.each(provider.products, function (product) {
        // console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== P R O D U C T ==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== ");
        // console.log(product);
        _.each(product.calculator.products, function (calculatorProduct) {
          // notices[calculatorProduct.id] = {full:[],short:[]}
          // console.log(calculatorProduct);

          // console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== C A L C - P R O D U C T ==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== ");

          // console.log("product.calculator.type: ");
          // console.log(product.calculator.type);
          // console.log("calculatorProduct");
          // console.log(calculatorProduct);
          // console.log(" === COST VARIABLES ===");
          // console.log("updatedTerms");
          // console.log(updatedTerms);
          // console.log("updatedFaceValue");
          // console.log(updatedFaceValue);
          // console.log("age")
          // console.log(age);
          // console.log("gender");
          // console.log(gender);
          // console.log("calculatorProduct.multiplier");
          // console.log(calculatorProduct.multiplier);
          // console.log("multiplier applied:");
          // console.log(_.toInteger(updatedFaceValue) / calculatorProduct.multiplier);
          // console.log("rate table");
          // console.log(calculatorProduct.table);

          // Check rate tables
          // console.log(" * * * * * * * * cost.annual == 0")
          // console.log("notices table:")
          // console.log(notices)
          // console.log("product ID")
          // console.log(calculatorProduct.id)

          cost = getProductCostAvailability(calculatorProduct, age, gender, smokerStatus, updatedFaceValue, updatedTerms);
          calc[calculatorProduct.id] = cost;
          if (cost.annual == 0) {
            if (cost.notice == "") cost.notice = "Rate not found."
            notices[calculatorProduct.id].full.push(calculatorProduct.name + " is showing a cost notice: " + cost.notice)
            if (notices[calculatorProduct.id].short[0] === "" || notices[calculatorProduct.id].short.length < 1)
              notices[calculatorProduct.id].short.push(cost.notice)
            // console.log("cost variable:")
            // console.log(cost)
            hiddenIds.push(calculatorProduct.id);
          }

          // Check the coverage limits
          // console.log("product nickname: "+product.nickname);
          face = parseInt(updatedFaceValue / 1000);
          // console.log("faceValue: "+face);
          // console.log("coverage Limits");
          // console.log(CoverageLimits[product.nickname]);
          const cMin = parseInt(CoverageLimits[product.nickname][1])
          const cMax = parseInt(CoverageLimits[product.nickname][2])
          ages = CoverageLimits[product.nickname]
          delete ages.min, delete ages.max
          // console.log("cMin: "+cMin);
          // console.log("cMax: "+cMax);
          // console.log("ages: ");
          // console.log(ages);

          if (cMin != null && cMax != null) {
            if (face < cMin) {
              hiddenIds.push(calculatorProduct.id)
              notices[calculatorProduct.id].full.push(calculatorProduct.name + " does not support coverage of less than " + cMin + "k")
              notices[calculatorProduct.id].short.push("Face under " + cMin + "k unavailable.")
              // console.log(calculatorProduct.name+" does not support coverage of less than "+cMin+"k")
            }
            if (face > cMax) {
              hiddenIds.push(calculatorProduct.id)
              notices[calculatorProduct.id].full.push(calculatorProduct.name + " does not support coverage of more than " + cMax + "k")
              notices[calculatorProduct.id].short.push("Face over " + cMax + "k unavailable.")
              // console.log(calculatorProduct.name+" does not support coverage of more than "+cMax+"k")
            }
          }
          //
          // console.log("=== notices  ===");
          // console.log(notices)

        })
      })
    })

    // console.log("=== Hidden Calculator Products ===");
    // console.log(_.sortedUniq(hiddenIds));
    //
    // console.log("=== Hidden Calculator Notices ===");
    // console.log(notices);
    //
    // console.log("=== CALCULATOR OUTPUT ===");
    // console.log(calc);

    this.setState({ calculator: calc });
    this.setState({ calculatorHiddenProducts: _.sortedUniq(hiddenIds) });

    // // console.log("=-=-=-=-= UPDATE PROVIDERS Notices =-=-=-=-=")
    // mergedNotices = _.merge(this.state.calculatorHiddenNotices,notices)
    // const oldNotices = this.state.calculatorHiddenNotices
    // this.setState({calculatorHiddenNotices: mergedNotices},()=>{
    //   console.log("Merged and updated notices! (end of updateCalculatorValues()");
    //   console.log(oldNotices)
    //   console.log(notices)
    //   console.log(this.state.calculatorHiddenNotices);
    // })

    this.updateProviders(false, 'end of updateCalculatorValues');
    return 1
  }

  getProviderLevelNotices = () => {
    copiedNotices = this.state.calculatorHiddenNotices
    _.each(Providers, (provider) => {
      _.each(provider.products, (product) => {
        _.each(product.calculator.products, (calculatorProduct) => {
          this.state.calculatorHiddenNotices[product.id].short.map((notice) => {
            // console.log("PUSHED NOTICE: '%s' FROM %s to %s",notice,product.id,calculatorProduct.id)
            copiedNotices[calculatorProduct.id].short.push(notice)
          })
        })
      })
    })
    this.setState({ calculatorHiddenNotices: copiedNotices }, () => {
      // console.log("Pushed all notices and updated calculatorHiddenNotices:")
      // console.log(this.state.calculatorHiddenNotices)
      this.removeDuplicateNotices()
    })
  }
  removeDuplicateNotices = () => {
    // console.log("removing duplicate notices...")
    notices = this.state.calculatorHiddenNotices;
    _.forEach(this.state.calculatorHiddenNotices, (product, k) => {
      notices[k].full = _.uniq(product.full)
      notices[k].short = _.uniq(product.short)
    })
    this.setState({ calculatorHiddenNotices: notices }, () => {
      // console.log("duplicates removed")
      // console.log(this.state.calculatorHiddenNotices)
    })
  }

  renderCalculatorProduct = (provider, product, calculatorProduct) => {

    let available = true
    if (
      this.state.calculatorHiddenNotices[calculatorProduct.id].short.length !== 0
      // || this.state.calculatorHiddenNotices[calculatorProduct.id].full.length !== 0
      // && _.indexOf(this.state.calculatorHiddenProducts[calculatorProduct.id]) === -1
    ) available = false

    if (this.state.calculator[calculatorProduct.id].annual === 0) available = false

    // console.log(" *** ======== %s (%s) ======== ***", calculatorProduct.name, calculatorProduct.id);
    // console.log("notices:")
    // console.log(this.state.calculatorHiddenNotices[calculatorProduct.id])
    // console.log("this.state.calculator[calculatorProduct.id]:")
    // console.log(this.state.calculator[calculatorProduct.id])
    // console.log("available:")
    // console.log(available)

    if (PHONE)
      return (
        <View style={styles.calculatorCompanyWrap_portrait} key={calculatorProduct.id}>
          <View>
            <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'orange' }}>
            <View>
              <Image source={logos[provider.id]} style={styles.calculatorLogo} />
            </View>
            {available !== false && (
              <View>
                <View style={styles.calculatorProductPeriodCostWrapProduct_portrait}>
                  <View style={styles.calculatorProductPeriodCostWrap_portrait}>
                    <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                    <Text style={styles.calculatorProductWrapSubtitle_portrait}>
                      ${number_format(this.state.calculator[calculatorProduct.id].month, 2)}
                    </Text>
                  </View>
                  <View style={styles.calculatorProductPeriodCostWrap_portrait}>
                    <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                    <Text style={styles.calculatorProductWrapSubtitle_portrait}>
                      ${number_format(this.state.calculator[calculatorProduct.id].annual, 2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {available === false && (
              <View>
                {this.state.calculatorHiddenNotices[calculatorProduct.id].short.map((notice, k) => {
                  return (<Text key={k}>{notice}</Text>)
                })}
              </View>
            )}

          </View>
        </View>
      )
    return (
      <View style={styles.calculatorCompanyWrap} key={calculatorProduct.id}>
        {available !== false && (
          <View style={styles.calculatorProductWrap}>
            <Image source={logos[provider.id]} style={styles.calculatorLogo} />
            <View style={styles.calculatorProductPeriodCostWrapProduct}>
              <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
            </View>
            <View style={styles.calculatorProductPeriodCostWrap}>
              <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
              <Text style={styles.calculatorProductWrapSubtitle}>
                ${number_format(this.state.calculator[calculatorProduct.id].month, 2)}
              </Text>
            </View>
            <View style={[styles.calculatorProductPeriodCostWrap, { marginLeft: 30 }]}>
              <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
              <Text style={styles.calculatorProductWrapSubtitle}>
                ${number_format(this.state.calculator[calculatorProduct.id].annual, 2)}
              </Text>
            </View>
          </View>
        )}
        {available === false && (
          <View style={styles.calculatorProductWrap}>
            <Image source={logos[provider.id]} style={styles.calculatorLogo} />
            <View style={styles.calculatorProductPeriodCostWrapProduct}>
              <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
            </View>
            <View>
              {this.state.calculatorHiddenNotices[calculatorProduct.id].short.map((notice, k) => {
                // console.log("NOTICE:");
                // console.log(notice);
                return (<Text key={k}>{notice}</Text>)
              })}
            </View>
          </View>
        )}
      </View>
    )
  }
  renderCalculator = () => {
    // console.log(" === RENDER CALCULATOR ============================================================");
    // console.log(this.state.clientInfo)

    //let Providers = Calculator.providers;
    this.inputRefs = {};
    self = this;
    renderCalculatorProduct = this.renderCalculatorProduct;
    let productsRender = [];
    LayoutAnimation.configureNext(CustomLayoutLinear);

    return (
      <View style={[styles.calculator, { top: 22 }]}>
        <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 999 }}>
          <TouchableHighlight onPress={() => { this.setState({ calculatorVisible: false }) }}>
            <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: '900' }}>&lsaquo;</Text> Questions</Text>
          </TouchableHighlight>
        </View>
        {/*<Text style={{fontSize: 20}}>Coverage Options for {this.state.clientInfo.firstName}</Text>*/}
        <ScrollView horizontal={true} style={styles.calculatorHeader}>

          {/* FACE VALUE SELECT */}
          <View style={styles.calculatorFaceValueWrap}>
            <Text>Face Value</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{ "label": "1,000", "value": "1,000" }, { "label": "2,000", "value": "2,000" }, { "label": "3,000", "value": "3,000" }, { "label": "4,000", "value": "4,000" }, { "label": "5,000", "value": "5,000" }, { "label": "6,000", "value": "6,000" }, { "label": "7,000", "value": "7,000" }, { "label": "8,000", "value": "8,000" }, { "label": "9,000", "value": "9,000" }, { "label": "10,000", "value": "10,000" }, { "label": "11,000", "value": "11,000" }, { "label": "12,000", "value": "12,000" }, { "label": "13,000", "value": "13,000" }, { "label": "14,000", "value": "14,000" }, { "label": "15,000", "value": "15,000" }, { "label": "16,000", "value": "16,000" }, { "label": "17,000", "value": "17,000" }, { "label": "18,000", "value": "18,000" }, { "label": "19,000", "value": "19,000" }, { "label": "20,000", "value": "20,000" }, { "label": "21,000", "value": "21,000" }, { "label": "22,000", "value": "22,000" }, { "label": "23,000", "value": "23,000" }, { "label": "24,000", "value": "24,000" }, { "label": "25,000", "value": "25,000" }, { "label": "26,000", "value": "26,000" }, { "label": "27,000", "value": "27,000" }, { "label": "28,000", "value": "28,000" }, { "label": "29,000", "value": "29,000" }, { "label": "30,000", "value": "30,000" }, { "label": "31,000", "value": "31,000" }, { "label": "32,000", "value": "32,000" }, { "label": "33,000", "value": "33,000" }, { "label": "34,000", "value": "34,000" }, { "label": "35,000", "value": "35,000" }, { "label": "36,000", "value": "36,000" }, { "label": "37,000", "value": "37,000" }, { "label": "38,000", "value": "38,000" }, { "label": "39,000", "value": "39,000" }, { "label": "40,000", "value": "40,000" }, { "label": "45,000", "value": "45,000" }, { "label": "50,000", "value": "50,000" }, { "label": "55,000", "value": "55,000" }, { "label": "60,000", "value": "60,000" }, { "label": "65,000", "value": "65,000" }, { "label": "70,000", "value": "70,000" }, { "label": "75,000", "value": "75,000" }, { "label": "80,000", "value": "80,000" }, { "label": "85,000", "value": "85,000" }, { "label": "90,000", "value": "90,000" }, { "label": "95,000", "value": "95,000" }, { "label": "100,000", "value": "100,000" }, { "label": "105,000", "value": "105,000" }, { "label": "110,000", "value": "110,000" }, { "label": "115,000", "value": "115,000" }, { "label": "120,000", "value": "120,000" }, { "label": "125,000", "value": "125,000" }, { "label": "130,000", "value": "130,000" }, { "label": "135,000", "value": "135,000" }, { "label": "140,000", "value": "140,000" }, { "label": "145,000", "value": "145,000" }, { "label": "150,000", "value": "150,000" }, { "label": "155,000", "value": "155,000" }, { "label": "160,000", "value": "160,000" }, { "label": "165,000", "value": "165,000" }, { "label": "170,000", "value": "170,000" }, { "label": "175,000", "value": "175,000" }, { "label": "180,000", "value": "180,000" }, { "label": "185,000", "value": "185,000" }, { "label": "190,000", "value": "190,000" }, { "label": "195,000", "value": "195,000" }, { "label": "200,000", "value": "200,000" }, { "label": "205,000", "value": "205,000" }, { "label": "210,000", "value": "210,000" }, { "label": "215,000", "value": "215,000" }, { "label": "220,000", "value": "220,000" }, { "label": "225,000", "value": "225,000" }, { "label": "230,000", "value": "230,000" }, { "label": "235,000", "value": "235,000" }, { "label": "240,000", "value": "240,000" }, { "label": "245,000", "value": "245,000" }, { "label": "250,000", "value": "250,000" }, { "label": "255,000", "value": "255,000" }, { "label": "260,000", "value": "260,000" }, { "label": "265,000", "value": "265,000" }, { "label": "270,000", "value": "270,000" }, { "label": "275,000", "value": "275,000" }, { "label": "280,000", "value": "280,000" }, { "label": "285,000", "value": "285,000" }, { "label": "290,000", "value": "290,000" }, { "label": "295,000", "value": "295,000" }, { "label": "300,000", "value": "300,000" }, { "label": "305,000", "value": "305,000" }, { "label": "310,000", "value": "310,000" }, { "label": "315,000", "value": "315,000" }, { "label": "320,000", "value": "320,000" }, { "label": "325,000", "value": "325,000" }, { "label": "330,000", "value": "330,000" }, { "label": "335,000", "value": "335,000" }, { "label": "340,000", "value": "340,000" }, { "label": "345,000", "value": "345,000" }, { "label": "350,000", "value": "350,000" }, { "label": "355,000", "value": "355,000" }, { "label": "360,000", "value": "360,000" }, { "label": "365,000", "value": "365,000" }, { "label": "370,000", "value": "370,000" }, { "label": "375,000", "value": "375,000" }, { "label": "380,000", "value": "380,000" }, { "label": "385,000", "value": "385,000" }, { "label": "390,000", "value": "390,000" }, { "label": "395,000", "value": "395,000" }, { "label": "400,000", "value": "400,000" }]}
                onValueChange={(value) => {
                  this.setState({ calculatorFaceValue: value, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => { this.updateCalculatorValues(value, null, 'face value picker') });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker2.togglePicker();
                }}
                style={{ icon: { marginTop: -16, marginRight: -8 } }}
                value={this.state.calculatorFaceValue}
                ref="faceValues"
              />
            </View>
          </View>


          {/* TERMS SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Term</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[
                  { label: '5', value: '5' },
                  { label: '10', value: '10' },
                  { label: '15', value: '15' },
                  { label: '20', value: '20' },
                  { label: '25', value: '25' },
                  { label: '30', value: '30' }
                ]}
                onValueChange={(value) => {
                  this.setState({ calculatorTerms: value, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => { this.updateCalculatorValues(null, value, 'face value terms select') });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker3.togglePicker();
                }}
                style={{ icon: { marginTop: -16, marginRight: -8 } }}
                value={this.state.calculatorTerms}
                ref="terms"
              />
            </View>
          </View>


          {/* AGE SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Age</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{ "label": "0", "value": "0" }, { "label": "1", "value": "1" }, { "label": "2", "value": "2" }, { "label": "3", "value": "3" }, { "label": "4", "value": "4" }, { "label": "5", "value": "5" }, { "label": "6", "value": "6" }, { "label": "7", "value": "7" }, { "label": "8", "value": "8" }, { "label": "9", "value": "9" }, { "label": "10", "value": "10" }, { "label": "11", "value": "11" }, { "label": "12", "value": "12" }, { "label": "13", "value": "13" }, { "label": "14", "value": "14" }, { "label": "15", "value": "15" }, { "label": "16", "value": "16" }, { "label": "17", "value": "17" }, { "label": "18", "value": "18" }, { "label": "19", "value": "19" }, { "label": "20", "value": "20" }, { "label": "21", "value": "21" }, { "label": "22", "value": "22" }, { "label": "23", "value": "23" }, { "label": "24", "value": "24" }, { "label": "25", "value": "25" }, { "label": "26", "value": "26" }, { "label": "27", "value": "27" }, { "label": "28", "value": "28" }, { "label": "29", "value": "29" }, { "label": "30", "value": "30" }, { "label": "31", "value": "31" }, { "label": "32", "value": "32" }, { "label": "33", "value": "33" }, { "label": "34", "value": "34" }, { "label": "35", "value": "35" }, { "label": "36", "value": "36" }, { "label": "37", "value": "37" }, { "label": "38", "value": "38" }, { "label": "39", "value": "39" }, { "label": "40", "value": "40" }, { "label": "41", "value": "41" }, { "label": "42", "value": "42" }, { "label": "43", "value": "43" }, { "label": "44", "value": "44" }, { "label": "45", "value": "45" }, { "label": "46", "value": "46" }, { "label": "47", "value": "47" }, { "label": "48", "value": "48" }, { "label": "49", "value": "49" }, { "label": "50", "value": "50" }, { "label": "51", "value": "51" }, { "label": "52", "value": "52" }, { "label": "53", "value": "53" }, { "label": "54", "value": "54" }, { "label": "55", "value": "55" }, { "label": "56", "value": "56" }, { "label": "57", "value": "57" }, { "label": "58", "value": "58" }, { "label": "59", "value": "59" }, { "label": "60", "value": "60" }, { "label": "61", "value": "61" }, { "label": "62", "value": "62" }, { "label": "63", "value": "63" }, { "label": "64", "value": "64" }, { "label": "65", "value": "65" }, { "label": "66", "value": "66" }, { "label": "67", "value": "67" }, { "label": "68", "value": "68" }, { "label": "69", "value": "69" }, { "label": "70", "value": "70" }, { "label": "71", "value": "71" }, { "label": "72", "value": "72" }, { "label": "73", "value": "73" }, { "label": "74", "value": "74" }, { "label": "75", "value": "75" }, { "label": "76", "value": "76" }, { "label": "77", "value": "77" }, { "label": "78", "value": "78" }, { "label": "79", "value": "79" }, { "label": "80", "value": "80" }, { "label": "81", "value": "81" }, { "label": "82", "value": "82" }, { "label": "83", "value": "83" }, { "label": "84", "value": "84" }, { "label": "85", "value": "85" }, { "label": "86", "value": "86" }, { "label": "87", "value": "87" }, { "label": "88", "value": "88" }, { "label": "89", "value": "89" }, { "label": "90", "value": "90" }, { "label": "91", "value": "91" }, { "label": "92", "value": "92" }, { "label": "93", "value": "93" }, { "label": "94", "value": "94" }, { "label": "95", "value": "95" }, { "label": "96", "value": "96" }, { "label": "97", "value": "97" }, { "label": "98", "value": "98" }, { "label": "99", "value": "99" }, { "label": "100", "value": "100" }, { "label": "101", "value": "101" }, { "label": "102", "value": "102" }, { "label": "103", "value": "103" }, { "label": "104", "value": "104" }, { "label": "105", "value": "105" }, { "label": "106", "value": "106" }, { "label": "107", "value": "107" }, { "label": "108", "value": "108" }, { "label": "109", "value": "109" }, { "label": "110", "value": "110" }, { "label": "111", "value": "111" }, { "label": "112", "value": "112" }, { "label": "113", "value": "113" }, { "label": "114", "value": "114" }, { "label": "115", "value": "115" }, { "label": "116", "value": "116" }, { "label": "117", "value": "117" }, { "label": "118", "value": "118" }, { "label": "119", "value": "119" }, { "label": "120", "value": "120" }]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.age = parseInt(value);
                  this.setState({ clientInfo: clientInfo, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => { this.updateCalculatorValues(null, null, 'face value age select') });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker4.togglePicker();
                }}
                style={{ icon: { marginTop: -16, marginRight: -8 } }}
                value={_.toString(this.state.clientInfo.age)}
                ref="ages"
              />
            </View>
          </View>


          {/* GENDER SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Gender</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{ "label": "Male", "value": "M" }, { "label": "Female", "value": "F" }]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.gender = value;
                  this.setState({ clientInfo: clientInfo, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => { this.updateCalculatorValues(null, null, 'face value gender select') });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker5.togglePicker();
                }}
                style={{ icon: { marginTop: -16, marginRight: -8 } }}
                value={this.state.clientInfo.gender}
                ref="ages"
              />
            </View>
          </View>


          {/* TOBACCO SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Tobacco</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{ "label": "Yes", "value": "Cigarettes" }, { "label": "No", "value": "None" }]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.tobacco = value;
                  this.setState({ clientInfo: clientInfo, calculatorHiddenNotices: _.cloneDeep(calculatorHiddenNoticesTemplate) }, () => { this.updateCalculatorValues(null, null, 'face value tobacco select'); });
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker6.togglePicker();
                }}
                style={{ icon: { marginTop: -16, marginRight: -8 } }}
                value={this.state.clientInfo.tobacco}
                ref="ages"
              />
            </View>
          </View>

        </ScrollView>

        {/*<View style={styles.calculatorProductsCounter}>*/}
        {/*<Text>*/}
        {/*Showing*/}
        {/*<Text style={styles.calculatorProductsCounterHighlight}> {Object.keys(this.state.calculator).length - this.state.calculatorHiddenProducts.length} </Text>*/}
        {/*eligible of*/}
        {/*<Text style={styles.calculatorProductsCounterHighlight}> {Object.keys(this.state.calculator).length} </Text>*/}
        {/*products:*/}
        {/*</Text>*/}
        {/*</View>*/}

        <ScrollView style={styles.calculatorContentScrollView}>

          {/*{*/}
          {/*console.log("this.state.calculatorHiddenNotices: ")*/}
          {/*}*/}

          {/*{*/}
          {/*console.log(this.state.calculatorHiddenNotices)*/}
          {/*}*/}

          {/*{_.forEach(this.state.calculatorHiddenNotices,(o,k)=>{*/}
          {/*<CalculatorProduct/>*/}
          {/*})}*/}

          {Providers.map(function (provider) {
            provider.products.map(function (product) {
              product.calculator.products.map(function (calculatorProduct) {
                productsRender.push(renderCalculatorProduct(provider, product, calculatorProduct));
                // console.log("--- Rendering ---");
              })
            })
          })}
          {productsRender}

          <Text>&nbsp;</Text>
        </ScrollView>
        {/*{this.renderProviderStatus(Providers)}*/}
      </View>
    )
  };
  renderExport = () => {
    buttons = this.state.buttons;
    medButtons = _.filter(buttons, function (b) { return b.category === 'MED' });
    conButtons = _.filter(buttons, function (b) { return b.category === 'CON' });
    return (
      <View style={styles.exportView}>
        <View style={{ position: 'absolute', top: 5, left: 20, zIndex: 999 }}>
          <TouchableHighlight onPress={() => { this.setState({ exportVisible: false }) }}>
            <Text style={{ fontSize: 16 }}><Text style={styles.backButton}>&lsaquo;</Text> Questions</Text>
          </TouchableHighlight>
        </View>
        <Text style={{ marginBottom: 20, fontSize: 20 }}>Underwriting Info Export</Text>
        <View style={styles.exportContentWrap}>
          {_.filter(this.state.buttons, function (b) { return b.category != 'MED' && b.category != 'CON' }).map(b => (
            <View style={styles.exportLineItemWrap} key={b.id}>
              <Text style={styles.exportLineItemHeader}>{b.title}</Text>
              <Text style={styles.exportLineItem}>{b.subtitle}</Text>
            </View>
          ))}
          <View style={styles.exportLineItemWrap} key={"10001"}>
            <Text style={styles.exportLineItemHeader}>Medications</Text>
            {medButtons && medButtons.map(b => (<Text key={b.id} style={styles.exportLineItem}>{b.title}, </Text>))}
          </View>
          <View style={styles.exportLineItemWrap} key={"10002"}>
            <Text style={styles.exportLineItemHeader}>Conditions</Text>
            {conButtons && conButtons.map(b => (<Text key={b.id} style={styles.exportLineItem}>{b.title}, </Text>))}
          </View>
        </View>
      </View>
    )
  }
  renderInstructions = () => {
    // if(this.state.modalMaskVisible !== true) this.setState({modalMaskVisible: true})
    return (
      <SafeAreaView style={styles.modalWrap}>
        <View style={styles.modalInstructions}>
          {/*<TouchableHighlight onPress={()=>{this.setState({instructionsVisible: false})}} style={{width: 100}}>*/}
          {/*<Text style={{fontSize:16,marginBottom:13}}>X</Text>*/}
          {/*</TouchableHighlight>*/}
          <View style={styles.modalInstructionsWrap}>
            <Image source={logos[100]} style={styles.instructionsImage} />
          </View>
        </View>
        <View style={{ position: 'relative', bottom: 30, zIndex: 999 }}>
          <TouchableHighlight onPress={() => {
            this.setState({ instructionsVisible: false })
            console.log("current this.getUserMeta('hasSeenInstructions'): %d", this.state.user.hasSeenInstructions)
            this.setUserMeta('hasSeenInstructions', this.state.user.hasSeenInstructions + 1)
          }}>
            <Text style={{ fontSize: 16, padding: 15 }}>CLOSE</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
  renderUnderwritingLog = () => {
    buttons = this.state.buttons;
    medButtons = _.filter(buttons, function (b) { return b.category === 'MED' });
    conButtons = _.filter(buttons, function (b) { return b.category === 'CON' });
    return (
      <View style={styles.exportView}>
        <View style={{ position: 'absolute', top: 5, left: 20, zIndex: 999 }}>
          <TouchableHighlight onPress={() => { this.setState({ exportVisible: false }) }}>
            <Text style={{ fontSize: 16 }}><Text style={styles.backButton}>&lsaquo;</Text> Questions</Text>
          </TouchableHighlight>
        </View>
        <Text style={{ marginBottom: 20, fontSize: 20 }}>Insura App - Underwriting Log</Text>
        <ScrollView style={styles.exportContentWrap}>

        </ScrollView>
      </View>
    )
  }
  loadClientFromHistory = (client) => {
    this.saveAndClear(false, () => {
      this.setState({
        buttons: client.buttons,
        clientInfo: client.clientInfo
      }, () => {
        this.updateCalculatorValues(this.state.calculatorFaceValue, this.state.calculatorTerms, 'loadFromClientHistory');
        // console.log(this.state)
      })
      // console.log("inside save and clear callback")
      client.buttons.forEach((button, k) => {
        if (button.category == 'BIO') {

        }
      })
    })
  }
  renderClientHistory = () => {
    // this.getClientHistory()
    // console.log("renderClientHistory(): this.state.clientHistory: ")
    // console.log(this.state.clientHistory)

    deleteClientFromHistory = (clientId) => {
      // console.log("deleting: "+clientId)
      res = firebase.database().ref('clients/' + this.state.user.uid + '/' + clientId)
        .set(null)
        .then(res => {
          // console.log(res)
          this.setState({ clientHistory: _.filter(this.state.clientHistory, function (o) { return o.clientId !== clientId }) })
        })
        .catch(err => console.log(err))
    }

    return (
      <View style={styles.exportView}>
        <View style={{ position: 'absolute', top: 5, left: 20, zIndex: 999 }}>
          <TouchableHighlight onPress={() => { this.setState({ clientHistoryVisible: false }) }}>
            <Text style={{ fontSize: 16 }}><Text style={styles.backButton}>&lsaquo;</Text> Back</Text>
          </TouchableHighlight>
        </View>
        <Text style={{ marginTop: 50, marginBottom: 20, marginLeft: 20, fontSize: 20 }}>Client History</Text>
        <View style={styles.clientHistoryWrap}>
          <ScrollView style={{ flex: 0, height: '90%', width: '100%' }}>
            {this.state.clientHistory && this.state.clientHistory.map((client, k) => {
              { console.log('test') }
              return (
                <View key={k} style={{ ...styles.clientHistoryLink, borderTopWidth: first_child(k) ? 1 : 0 }}>
                  <Swipeout
                    right={[{
                      text: 'Delete',
                      backgroundColor: 'red',
                      onPress: () => deleteClientFromHistory(client.clientId)
                    }]}
                    backgroundColor="transparent"
                    autoClose={true}
                  >
                    <TouchableOpacity style={{ paddingBottom: 18, paddingTop: 18 }} onPress={() => {
                      this.loadClientFromHistory(client)
                      this.setState({ clientHistoryVisible: false });
                    }}>
                      <Text>{client.linkText}</Text>
                    </TouchableOpacity>
                  </Swipeout>
                </View>
              )
            })}

            {this.state.loadingClientHistory &&
              <Text style={{ padding: 20 }}>
                Loading...
            </Text>
            }
            {this.state.clientHistory.length === 0 && this.state.loadingClientHistory !== true &&
              <Text style={{ padding: 20 }}>
                No saved clients were found...
              </Text>
            }

          </ScrollView>
        </View>
      </View>
    )
  }

  toggleMenu = () => {
    this.refs.answer.blur()
    vis = this.state.menuVisible
    if (!vis) this.setState({ menuVisible: true, modalMaskVisible: true })
    Animated.timing(this.state.menuPosition, {
      toValue: vis ? -250 : -50,
      easing: Easing.back(),
      duration: vis === true ? 150 : 50,
    }).start(() => {
      this.setState({ menuVisible: !vis, modalMaskVisible: !vis })
    })
  }

  renderLoginHeader = () => {
    return (
      <TouchableHighlight style={styles.headerTopRight} underlayColor="transparent" onPress={() => { this.toggleMenu() }}>
        <View>
          <View style={styles.loginRegisterLinks}>
            {(this.props.redDotPresent === true && !this.props.supportVisible) && <View style={styles.redNoticeDot}></View>}
            <Button title="☰" onPress={() => { this.toggleMenu() }} style={[styles.signOutLink, { marginRight: 20 }]} color="#ffb601" />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  setFormError = (code, message) => {
    this.setState({ formError: code, formErrorNotice: message },
      // console.log(this.state.formErrorNotice)
    );
  }
  clearFormError = () => {
    this.setState({ formErrorNotice: '', formError: false });
  }
  onLogin = () => {
    storage.load({ key: 'user' });
    this.clearFormError();
    this.setState({ formErrorNotice: "Processing. Please wait..." });
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;
    // const phone = this.state.registerPhone;
    if (email == '' || email == null) { this.setFormError(1, 'Please enter your email.'); return false }
    if (password == '' || password == null) { this.setFormError(1, 'Please enter your password.'); return false }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.setState({user: user},console.log(this.state.user));
        // console.log(this.state.user);
        this.setState({ loginVisible: false });
        // console.log("SUCCESSFUL LOGIN");
        Analytics.trackEvent("Successful login: " + email);
        storage.load({ key: 'user' }).then((res) => {
          this.setState({ user: res }, () => {
            // console.log("loaded user from storage:")
            // console.log(this.state.user);
          })
        })
      })
      .catch((error) => {
        const { code, message } = error;
        // console.log(message);
        Analytics.trackEvent("FAILED login: " + email);
        this.setFormError(code, message);
      });
  }
  charge = () => {
    // console.log("running charge()")
    // console.log(this.state.registerCC)
    cc = this.state.registerCC.values
    m = cc.expiry.split('/')
  }
  onRegister = () => {
    const email = this.state.registerEmail
    const password = this.state.registerPassword
    const confirmPassword = this.state.registerConfirmPassword
    const fullName = this.state.registerFullName
    if (fullName != null) {
      const { firstName, lastName } = fullName.toString().trim().split(' ')
    }
    const planId = this.props.selectedProductToPurchase;

    if (fullName == '' || fullName == null) { this.setFormError(1, 'A full name is required to register.'); return false }
    if (email == '' || email == null) { this.setFormError(1, 'An email is required to register.'); return false }
    if (password == '' || password == null) { this.setFormError(1, 'A password is required to register.'); return false }
    if (password !== confirmPassword) { this.setFormError(1, 'Your passwords do not match.'); return false }

    // Make purchase through inApp Purchases
    RNIap.buyProduct(planId).then(purchase => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
          this.setState({ user: data.user }, () => {
            storage.save({ key: 'user', data: data.user.uid })
          })
          let verifyEmail = firebase.auth().currentUser.sendEmailVerification()
          this.setState({ choosePlanVisible: false }, () => this.setState({ loginVisible: true }))
          u = firebase.auth().currentUser;
          this.setUser(
            u.uid,
            fullName, email,
            planId,
            purchase.transactionId,
            purchase.originalTransactionDateIOS,
            purchase.originalTransactionIdentifierIOS
          );
        })
        .catch((error) => {
          console.log("Uh Oh there was an error")
          console.log(error)
          const { code, message } = error;
          this.setFormError(code, message);
        });
    }).catch(err => {
      console.log("Uh Oh there was an error")
      console.log(err)
      this.setFormError('', err);
    })
  }
  registerPhone = () => {
    firebase.auth().signInWithPhoneNumber(phone).then((res) => {
      // console.log("phone confirmation result object:"); console.log(res);
      this.setState({ registerPhoneResult: res });
    }).catch((err) => {
      this.setFormError(err.code, err.message);
    })
  }
  registerModal = () => {
    return (
      <SafeAreaView style={styles.modalWrap}>
        <View style={{...styles.authChoosePlanModal, height: 500}}>
          <View style={styles.authTitleContainer}>
            <Text style={styles.authModalHeading}>Register</Text>
            <TouchableHighlight onPress={() => { this.setState({ registerVisible: false, loginVisible: true }) }}>
              <Text style={{ fontSize: 16, color: 'white', margin: 0 }}>Login ></Text>
            </TouchableHighlight>
          </View>
          <View style={{ height: '85%' }}>
            <TextInput
              ref="registerFullName"
              placeholder="First & Last Name"
              style={styles.authModalInput}
              onChangeText={(v) => this.setState({ registerFullName: v })}
              value={this.state.registerFullName}
              autoCapitalize='words'
            />
            <TextInput
              ref="registerEmail"
              placeholder="Email"
              style={styles.authModalInput}
              onChangeText={(v) => this.setState({ registerEmail: v })}
              value={this.state.registerEmail}
              autoCapitalize='none'
            />
            <TextInput
              ref="registerPassword"
              placeholder="Password"
              style={styles.authModalInput}
              onChangeText={(v) => this.setState({ registerPassword: v })}
              value={this.state.registerPassword}
              autoCapitalize='none'
              secureTextEntry={true}
            />
            <TextInput
              ref="registerPasswor2"
              placeholder="Confirm Password"
              style={styles.authModalInput}
              onChangeText={(v) => this.setState({ registerConfirmPassword: v })}
              value={this.state.registerConfirmPassword}
              autoCapitalize='none'
              secureTextEntry={true}
            />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => { this.setState({ termsOfServiceChecked: true }) }}
                style={{ textalign: 'center', height: 22, width: 22, borderRadius: 33, backgroundColor: '#FFFFFF', marginRight: 8, }}
              >
                {
                  this.state.termsOfServiceChecked ?
                    <View style={{ position: 'absolute', marginTop: 3, marginLeft: 3, height: 16, width: 16, padding: 0, borderRadius: 33, backgroundColor: '#D8D8D8', marginRight: 8 }} />
                    :
                    null
                }
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#FFFFFF' }}>I agree to the Insura terms of service.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => { this.setState({ acceptAIChecked: true }) }}
                style={{ textalign: 'center', height: 22, width: 22, borderRadius: 33, backgroundColor: '#FFFFFF', marginRight: 8, }}
              >
                {
                  this.state.acceptAIChecked ?
                    <View style={{ position: 'absolute', marginTop: 3, marginLeft: 3, height: 16, width: 16, padding: 0, borderRadius: 33, backgroundColor: '#D8D8D8', marginRight: 8 }} />
                    :
                    null
                }
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#FFFFFF' }}>I understand my account is subject to A.I. and human fraud review..</Text>
            </View>
            <View style={{...styles.authModalSubmit, height: 48 }}>
              <TouchableOpacity
                style={this.state.termsOfServiceChecked && this.state.acceptAIChecked ? styles.authSubmitHighlight : styles.authSubmitDisabled}
                disabled={this.state.termsOfServiceChecked && this.state.acceptAIChecked ? false : true}
                onPress={() => this.setState({ registerVisible: false, choosePlanVisible: true })}
              >
                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.authModalFooter}>
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, .4)', fontWeight: '200' }}>PRIVACY POLICY</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, .4)', fontWeight: '200' }}>TERMS OF USE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )

  }

  choosePlanModal = () => {
    return (
      <SafeAreaView style={styles.modalWrap}>
        <View style={styles.authChoosePlanModal}>
          <View style={styles.authTitleContainer}>
            <Text style={styles.authModalHeading}>Select Plan</Text>
            <TouchableHighlight onPress={() => { this.setState({ choosePlanVisible: false, loginVisible: true }) }}>
              <Text style={{ fontSize: 16, color: 'white', margin: 0 }}>Login ></Text>
            </TouchableHighlight>
          </View>
          <View style={{ height: '75%' }}>
            {
              this.props.cookedProducts.map((product, index) => {
                return (
                  <TouchableHighlight key={index} style={{height: 100,  marginBottom: 24,}} onPress={() =>  this.props.selectProduct(product.value) }>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                      backgroundImage: gradients[1],
                      padding: 16,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                    <Image source={gradients[index + 1]} style={{ height: '120%', width: '120%', position: 'absolute', left: 0, right: 0, zIndex: -100 }} />
                    <View>
                      <Text style={{ fontSize: 18 }}>{product.label}</Text>
                      <Text style={{ fontSize: 10 }}>{product.desc}</Text>

                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', right: 16, top: 16 }}>{product.price}</Text>
                  </View>
                  </TouchableHighlight>
                )
              })
            }
          </View>
          <Text style={styles.formErrorMessage}>
            {this.state.formErrorNotice && this.state.formErrorNotice}
          </Text>
          <View style={{...styles.authModalSubmit, height: 48 }}>
              <TouchableHighlight
                style={this.props.selectedProductToPurchase ? styles.authSubmitHighlight : styles.authSubmitDisabled}
                disabled={this.props.selectedProductToPurchase ? false : true}
                onPress={() => {this.onRegister()}}
              >
                <Text style={{ fontSize: 16, color: '#FFFFFF' }}>REGISTER</Text>
              </TouchableHighlight>
            </View>
        </View>
      </SafeAreaView>
    )
  }
  loginModal = () => {
    return (
      <SafeAreaView style={styles.modalWrap}>
        <View style={styles.authModal}>
          <View style={styles.authTitleContainer}>
            <Text style={styles.authModalHeading}>Sign In</Text>
            <TouchableHighlight onPress={() => { this.setState({ registerVisible: true, loginVisible: false }) }}>
              <Text style={{ fontSize: 16, color: 'white', margin: 0 }}>Register ></Text>
            </TouchableHighlight>
          </View>
          <TextInput
            ref="loginEmail"
            placeholder="Email"
            style={styles.authModalInput}
            onChangeText={(v) => this.setState({ loginEmail: v })}
            value={this.state.loginEmail}
            autoCapitalize='none'
          />
          <TextInput
            ref="loginPassword"
            placeholder="Password"
            style={styles.authModalInput}
            onChangeText={(v) => this.setState({ loginPassword: v })}
            value={this.state.loginPassword}
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <Text style={styles.formErrorMessage}>
            {this.state.formErrorNotice && this.state.formErrorNotice}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => { this.setState({ termsOfServiceChecked: true }) }}
              style={{ textalign: 'center', height: 22, width: 22, borderRadius: 33, backgroundColor: '#FFFFFF', marginRight: 8, }}
            >
              {
                this.state.termsOfServiceChecked ?
                  <View style={{ position: 'absolute', marginTop: 3, marginLeft: 3, height: 16, width: 16, padding: 0, borderRadius: 33, backgroundColor: '#D8D8D8', marginRight: 8 }} />
                  :
                  null
              }
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>I agree to the Insura terms of service.</Text>
          </View>
          <View style={styles.authModalSubmit}>
            <TouchableOpacity
              style={this.state.termsOfServiceChecked ? styles.authSubmitHighlight : styles.authSubmitDisabled}
              disabled={this.state.termsOfServiceChecked ? false : true}
              onPress={() => { this.onLogin(); console.log(this.state.registerErr) }}
            >
              <Text style={{ fontSize: 16, color: '#FFFFFF' }}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableHighlight style={{ width: '100%' }} onPress={() => { this.setState({ resetPasswordVisible: true, loginVisible: false }) }}>
              <Text style={{ fontSize: 16, color: '#FFFFFF', marginBottom: 28, lineHeight: 25 }}>Reset Password ></Text>
            </TouchableHighlight>
          </View>
          <View style={styles.authModalFooter}>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, .4)', fontWeight: '200' }}>PRIVACY POLICY</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, .4)', fontWeight: '200' }}>TERMS OF USE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  onResetPassword = () => {
    const email = _.trim(this.state.loginEmail)
    this.setFormError(1, 'Processing. Please wait...');
    if (email == '') { this.setFormError(1, 'A valid email is required.'); return false }
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({ resetPasswordVisible: false, loginVisible: true }, () => {
        this.setFormError(1, 'SUCCESS: A link to reset your password has been sent to ' + email + '. If it is valid, you should have an email within a few minutes.')
      })
    }).catch((error) => {
      this.setFormError(1, error + '');
    });
  }
  resetPasswordModal = () => {
    return (
      <View style={styles.modalWrap}>
        <View style={styles.modal}>
          <TouchableHighlight onPress={() => { this.setState({ resetPasswordVisible: false, loginVisible: true }) }} style={{ width: 100 }}>
            <Text style={{ fontSize: 16, marginBottom: 13 }}><Text style={{ fontWeight: '900' }}>&lsaquo;</Text> Login</Text>
          </TouchableHighlight>
          <Text style={styles.modalHeading}>Password Reset</Text>
          <Text style={{ marginBottom: 10 }}>Please enter your accoount email and a password reset link will be emailed to you.</Text>
          <TextInput
            ref="loginEmail"
            placeholder="Email"
            style={styles.modalInput}
            onChangeText={(v) => this.setState({ loginEmail: v })}
            value={this.state.loginEmail}
            autoCapitalize='none'
          />
          <Text style={styles.formErrorMessage}>
            {this.state.formErrorNotice && this.state.formErrorNotice}
          </Text>
          <View style={styles.modalSubmit}>
            <Button
              title="Request Reset Email"
              onPress={() => { this.onResetPassword() }}
            // disabled={(this.state.formError !== false)}
            />
          </View>
        </View>
      </View>
    );
  }
  simulateIDScan = () => {
    // this is test data
    let fields = {
      'Full Address': '1808 E JAMAICA AVE, MESA, AZ, 852046833',
      'Eye Color': 'BLU',
      'Customer First Name': 'BRYAN',
      'Document Type': 'AAMVA',
      'Jurisdiction-specific restriction codes': 'NONE',
      'Hair color': 'BRO',
      'Family name truncation': 'N',
      'Document Expiration Date': '06282049',
      'pdf417': '@\n\rANSI 636026080102DL00410275ZA03160015DLDAQD09939538\nDCSPOTTS\nDDEN\nDACBRYAN\nDDFN\nDADWATSON\nDDGN\nDCAD\nDCBNONE\nDCDNONE\nDBD12112017\nDBB06281984\nDBA06282049\nDBC1\nDAU073 in\nDAYBLU\nDAG1808 E JAMAICA AVE\nDAIMESA\nDAJAZ\nDAK852046833  \nDCF1386C5131P1548B4\nDCGUSA\nDAW390\nDAZBRO\nDCK17345AZ0141087540301\nDDAN\nDDB02142014\nDDK1\rZAZAAN\nZAB\nZAC\r',
      'Document Discriminator': '1386C5131P1548B4',
      'Address - Street 1': '1808 E JAMAICA AVE',
      'Jurisdiction Version Number': '1',
      'Document Issue Date': '12112017',
      'Inventory control number': '17345AZ0141087540301',
      'Country Identification': 'USA',
      'Sex': '2',
      'Issuing jurisdiction': 'ZA',
      'Customer ID Number': 'D09939538',
      'Weight Range': '9',
      'Issuer Identification Number': '636026',
      'Card Revision Date': '02142014',
      'Issuing jurisdiction name': 'Arizona',
      'Weight (kilograms)': '83',
      'Customer Name': 'POTTS,BRYAN,WATSON',
      'Organ Donor Indicator': '1',
      'Height in': '73',
      'Address - City': 'MESA',
      'PaymentDataType': 'US Driver\'s License',
      'Address - Postal Code': '852046833',
      'Jurisdiction-specific vehicle class': 'D',
      'Customer Middle Name': 'WATSON',
      'Address - Jurisdiction Code': 'AZ',
      'Standard Version Number': '8',
      'uncertain': '0',
      'Jurisdiction-specific endorsement codes': 'NONE',
      'ZAA': 'N',
      'Height': '73 in',
      'Customer Family Name': 'POTTS',
      'Compliance Type': 'N',
      'Date of Birth': '06281984',
      'Height cm': '185',
      'Middle name truncation': 'N',
      'First name truncation': 'N',
      'Weight (pounds)': '170'
    };

    fields = {
      'Full Address': '11802 N 40TH WAY, PHOENIX, AZ, 850281504',
      'Eye Color': 'BLU',
      'Customer First Name': 'BRYSON',
      'Document Type': 'AAMVA',
      'Jurisdiction-specific restriction codes': 'NONE',
      'Hair color': 'BRO',
      'Family name truncation': 'N',
      'Document Expiration Date': '11112056',
      'pdf417': '@\n\rANSI 636026080102DL00410281ZA03220015DLDAQD05676023\nDCSWIGENT\nDDEN\nDACBRYSON\nDDFN\nDADALEXANDER\nDDGN\nDCAD\nDCBNONE\nDCDNONE\nDBD06142018\nDBB11111991\nDBA11112056\nDBC1\nDAU075 in\nDAYBLU\nDAG11802 N 40TH WAY\nDAIPHOENIX\nDAJAZ\nDAK850281504  \nDCF1386E2239W1109B1\nDCGUSA\nDAW230\nDAZBRO\nDCK18165AZ0100939200301\nDDAN\nDDB02142014\nDDK1\rZAZAAN\nZAB\nZAC\r',
      'Document Discriminator': '1386E2239W1109B1',
      'Address - Street 1': '11802 N 40TH WAY',
      'Jurisdiction Version Number': '1',
      'Document Issue Date': '06142018',
      'Inventory control number': '18165AZ0100939200301',
      'Country Identification': 'USA',
      'Sex': '1',
      'Issuing jurisdiction': 'ZA',
      'Customer ID Number': 'D05676023',
      'Weight Range': '6',
      'Issuer Identification Number': '636026',
      'Card Revision Date': '02142014',
      'Issuing jurisdiction name': 'Arizona',
      'Weight (kilograms)': '104',
      'Customer Name': 'WIGENT,BRYSON,ALEXANDER',
      'Organ Donor Indicator': '1',
      'Height in': '75',
      'Address - City': 'PHOENIX',
      'PaymentDataType': 'US Driver\'s License',
      'Address - Postal Code': '850281504',
      'Jurisdiction-specific vehicle class': 'D',
      'Customer Middle Name': 'ALEXANDER',
      'Address - Jurisdiction Code': 'AZ',
      'Standard Version Number': '8',
      'uncertain': '0',
      'Jurisdiction-specific endorsement codes': 'NONE',
      'ZAA': 'N',
      'Height': '75 in',
      'Customer Family Name': 'WIGENT',
      'Compliance Type': 'N',
      'Date of Birth': '11111991',
      'Height cm': '191',
      'Middle name truncation': 'N',
      'First name truncation': 'N',
      'Weight (pounds)': '230'
    }

    let clientInfo = { ...this.state.clientInfo };
    let m = /(.{2})(.{2})(.{4})/.exec(fields[USDLKeys.DateOfBirth]);
    clientInfo.firstName = fields[USDLKeys.CustomerFirstName];
    clientInfo.middleName = fields[USDLKeys.CustomerMiddleName];
    clientInfo.lastName = fields[USDLKeys.CustomerFamilyName];

    // current keys
    clientInfo.name = _.startCase(_.toLower(clientInfo.firstName + " " + clientInfo.middleName + " " + clientInfo.lastName));
    clientInfo.dob = m[1] + "/" + m[2] + "/" + m[3];
    clientInfo.gender = fields[USDLKeys.Sex] === '1' ? 'M' : 'F';
    clientInfo.height = parseInt(fields[USDLKeys.HeightIn])
    // console.log("HEIGHT: ")
    // console.log(clientInfo.height)
    clientInfo.weight = fields[USDLKeys.WeightPounds];

    this.setState({ questionAnswer: clientInfo.name }, () => {
      this.nextQuestion()
      this.setState({ questionAnswer: clientInfo.gender }, () => {
        this.nextQuestion()
        this.setState({ questionAnswer: clientInfo.dob }, () => {
          this.nextQuestion()
          this.setState({ questionAnswer: clientInfo.height }, () => {
            this.nextQuestion()
            this.setState({ questionAnswer: clientInfo.weight }, () => {
              this.nextQuestion()

            })
          })
        })
      })
    })

    // clientInfo.height = Math.floor(parseInt(fields[USDLKeys.HeightIn]) / 12) +"-"+ parseInt(fields[USDLKeys.HeightIn]) %12;
    // clientInfo.height = Math.floor(parseInt(fields[USDLKeys.HeightIn]));
    // clientInfo.street1 = fields[USDLKeys.AddressStreet];
    // clientInfo.city = fields[USDLKeys.AddressCity];
    // clientInfo.state = fields[USDLKeys.AddressJurisdictionCode];
    // clientInfo.zip = fields[USDLKeys.AddressPostalCode];
    // clientInfo.race = fields[USDLKeys.RaceEthnicity];
    // clientInfo.ssn = fields[USDLKeys.SocialSecurityNumber];
    this.setState({ clientInfo }, () => { this.updateButtonsFromScan(clientInfo) });
    alert("ID Scan Simulated...")
  }
  pressMenuSaveNewClient = () => { this.saveAndClear(true); this.toggleMenu() }
  pressMenuScanLicense = () => { this.scan.bind(this)(); this.toggleMenu() }
  pressMenuExportPDF = () => { this.setState({ exportVisible: true }); this.toggleMenu() }
  pressMenuClientHistory = () => { this.setState({ clientHistoryVisible: true }); this.toggleMenu() }
  pressMenuLogOut = () => { firebase.auth().signOut(); this.toggleMenu(); this.setState({ modalMaskVisible: true }) }
  pressMenuDebugLog = () => { this.setState({ consoleIsVisible: true }); this.toggleMenu() }
  pressMenuCrash = () => { this.setState({ consoleIsVisible: true }); this.toggleMenu() }
  pressMenuSimulateIDScan = () => { this.simulateIDScan(); this.toggleMenu() }
  pressMenuSupport = () => {
    // this.setState({modalMaskVisible: true, supportVisible: true});
    this.props.setRedDot(false)
    this.props.toggleSupportModal(true);

    this.toggleMenu()
    this.props.setRedDot(false)
  }

  menuModal = () => {
    self = this
    var menuItems = [
      { title: 'Save & New Client', callback: this.pressMenuSaveNewClient },
      // {title: 'Scan Driver\'s License',callback: this.pressMenuScanLicense },
      { title: 'Client History (' + this.state.clientHistory.length + ')', callback: this.pressMenuClientHistory },
      // {title: 'Export PDF',callback: this.pressMenuExportPDF },
      { title: 'Support', callback: this.pressMenuSupport },
      // {title: 'Debug Log',callback: this.pressMenuDebugLog },
      // {title: 'Simulate ID Scan',callback: this.pressMenuSimulateIDScan },
      // {title: 'Simulate App Crash',callback: this.pressMenuCrash },
      { title: 'Log Out', callback: this.pressMenuLogOut },
    ]
    return (
      <Animated.View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        right: this.state.menuPosition,
        backgroundColor: '#FFF',
        width: 300,
        paddingRight: 50,
        paddingTop: IPHONE_X ? 49 : 20,
        height: '100%',
        zIndex: 101,
        borderWidth: 1,
        borderLeftColor: '#7680a1',
        shadowOffset: { width: -20, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        opacity: 0.95
      }}>
        <TouchableOpacity style={[styles.menuCloseIcon, { top: IPHONE_X ? 30 : 0 }]} onPress={this.toggleMenu}>
          <Text style={{ fontSize: 30, fontWeight: '100', color: '#979797' }}>&rsaquo;</Text>
        </TouchableOpacity>
        <Text style={styles.menuLogo}>insura</Text>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <View style={styles.menuItemWrap}>
            {menuItems.map((m, i) => {
              let accent = m.title == "Support" && this.props.redDotPresent ? (<Text style={styles.redNoticeDotSupport}>&nbsp;&nbsp;(NEW)</Text>) : ''
              return (<TouchableHighlight key={i} onPress={() => { self.toggleMenu; m.callback() }}><Text style={styles.menuItem}>{m.title.toUpperCase()}{accent}</Text></TouchableHighlight>)
            })}
          </View>
          <Text style={[styles.menuEmail, { marginBottom: -10 }]}>Logged in as:</Text>
          <Text style={styles.menuEmail}>{this.state.user.email !== null && this.state.user.email}</Text>
          <Text style={[styles.menuEmail, { marginBottom: -10 }]}>Version {version}</Text>

          {/*<TextInput value={firebase.auth().currentUser.uid} />*/}
        </ScrollView>
      </Animated.View>
    )
  }
  closeSupport = () => {
    // this.setState({supportVisible: false, modalMaskVisible: false})
    this.props.toggleSupportModal(false);
  }
  supportModal = () => {
    return (
      <ChatSupport />
    )
  }
  renderModalMask = () => {
    return (
      <TouchableHighlight style={styles.modalMask} onPress={() => { this.toggleMenu() }}>
        <Text>&nbsp;</Text>
      </TouchableHighlight>
    )
  }
  renderMasterInputNotice = () => {
    // console.log("render modal mask")
    return (
      <View style={styles.masterInputNoticeWrap}>
        <Text style={styles.masterInputNoticeText}>{_.upperCase(this.state.masterInputNotice)}</Text>
      </View>
    )
  }
  renderConsole = () => {

    return (
      <View style={styles.exportView}>
        <View style={{ position: 'absolute', top: 5, left: 20, zIndex: 999 }}>
          <TouchableHighlight onPress={() => { this.setState({ consoleIsVisible: false }) }}>
            <Text style={{ fontSize: 16 }}><Text style={styles.backButton}>&lsaquo;</Text> Back</Text>
          </TouchableHighlight>
        </View>
        <Text style={{ marginBottom: 20, fontSize: 20 }}>Debug Log</Text>
        <View style={styles.clientHistoryWrap}>
          <ScrollView style={{ flex: 0, height: '100%', width: '100%' }}>
            <Text selectable>{this.state.consoleContent}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
  renderNewChatModal = () => {
    return (
      <NewChatModal />
    )
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    const supportVisable = this.props.supportVisable
    const newChatModalShowing = this.props.newChatModalShowing

    return (
      <View style={styles.masterWrap}>

        {/* Modal Mask */}
        {this.state.modalMaskVisible ? this.renderModalMask() : null}

        {/* Export */}
        {this.state.exportVisible ? this.renderExport() : null}

        {/* Instructions */}
        {this.state.user.hasSeenInstructions < 2 && this.state.instructionsVisible ? this.renderInstructions() : null}

        {/* Underwriting Log */}
        {this.state.exportVisible ? this.renderUnderwritingLog() : null}

        {/* Clients */}
        {this.state.clientHistoryVisible ? this.renderClientHistory() : null}

        {/* CALCULATOR */}
        {this.state.calculatorVisible ? this.renderCalculator() : null}

        {/* REGISTER */}
        {this.state.registerVisible ? this.registerModal() : null}

        {/* LOGIN */}
        {this.state.loginVisible ? this.loginModal() : null}

        {/* CHOOSE PLAN */}
        {this.state.choosePlanVisible ? this.choosePlanModal() : null}

        {/* RESET PASSWORD */}
        {this.state.resetPasswordVisible ? this.resetPasswordModal() : null}

        {/* MENU */}
        {this.state.menuVisible ? this.menuModal() : null}

        {/* SUPPORT */}
        {supportVisable ? this.supportModal() : null}

        {/* NEW SUPPORT NOTIFICATION */}
        {newChatModalShowing ? this.renderNewChatModal() : null}

        {/* CONSOLE */}
        {this.state.consoleIsVisible ? this.renderConsole() : null}


        <View style={styles.paddingWrap}>

          {/* HEADER */}
          <View style={styles.header}>
            {this.renderLoginHeader()}
          </View>

          {/* QUESTION */}
          <View style={styles.masterQuestionWrap}>
            <View>
              <MediaQuery minHeight={1} orientation="landscape">
                <Text style={styles.masterQuestion}>{Questions[this.state.activeQuestionId].text}</Text>
              </MediaQuery>
              <MediaQuery minHeight={1} orientation="portrait">
                <Text style={styles.masterQuestion_portrait}>{Questions[this.state.activeQuestionId].text}</Text>
              </MediaQuery>

            </View>
            <TextInput
              ref="answer"
              // autoFocus={true}
              // spellCheck={false}
              autoCorrect={false}
              blurOnSubmit={true}
              autoComplete="off"
              autoCapitalize="none"
              value={typeof this.state.questionAnswer === undefined ? '' : _.toString(this.state.questionAnswer)}
              style={styles.masterInput}
              placeholder={"  " + Questions[this.state.activeQuestionId].placeholder}
              placeholderTextColor='#5e6579'
              selectionColor="white"
              onChangeText={(text) => this.watchAnswer(text)}
              onSubmitEditing={(event) => {
                if (Questions[this.state.activeQuestionId].submitByReturn) {
                  this.nextQuestion();
                  this.refs.answer.focus();
                }
              }}
            />
            {this.state.autoSuggestVisible ? this.renderOptions() : null}
            {this.state.masterInputNotice ? this.renderMasterInputNotice() : null}
            <View style={styles.questionLinksWrap}>
              <View style={styles.nextPrevButton}>
                <Button title="&laquo;" color="#000" onPress={() => this.prevQuestion()} style={{ marginTop: -10, fontSize: 30 }}>
                  <Text style={styles.nextPrevButtonText}>Prev</Text>
                </Button>
              </View>
              <View style={styles.nextPrevButton}>
                <Button title="&raquo;" color="#000" onPress={() => this.nextQuestion()}>
                  <Text style={styles.nextPrevButtonText}>Prev</Text>
                </Button>
              </View>
              <Text style={styles.questionPos}>{this.state.questionCounter}/{Questions.length}</Text>
              {this.renderIdScanButton()}
            </View>
            {this.state.answerButtonsVisible ? this.renderAnswerButtons(Questions[this.state.activeQuestionId].answerOptions || []) : null}
            {this.renderButtons(this.state.buttons)}
          </View>
          <MediaQuery minHeight={1} orientation="portrait">
            <View style={styles.footer_portrait}>
              {this.renderProviderStatus(this.state.Providers)}
            </View>
          </MediaQuery>
          <MediaQuery minHeight={1} orientation="landscape">
            <View style={styles.footer}>
              {this.renderProviderStatus(this.state.Providers)}
            </View>
          </MediaQuery>
        </View>
        <Image source={logos[0]} style={styles.backgroundLogo} />
      </View>
    );
  }

  renderAnswerButtons = (options) => {
    if (options.length > 0) {
      return (
        <View style={styles.answerButtonsWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' horizontal={true}>
            {options.map(option => (
              <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
                <View style={styles.answerButton}>
                  <Text
                    data-id={option.id}
                    style={styles.answerButtonText}>
                    {option.name}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      )
      return (
        <View style={{ position: 'absolute', top: 0, left: 0, height: 100, width: '105%', zIndex: 10 }}>
          <MediaQuery minHeight={1} orientation="landscape">
            <View style={styles.answerButtonsWrap}>
              <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' horizontal={true}>
                {options.map(option => (
                  <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
                    <View style={styles.answerButton}>
                      <Text
                        data-id={option.id}
                        style={styles.answerButtonText}>
                        {option.name}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          </MediaQuery>
          <MediaQuery minHeight={1} orientation="portrait">
            <View style={styles.answerButtonsWrap_portrait}>
              <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' horizontal={true}>
                {options.map(option => (
                  <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
                    <View style={styles.answerButton}>
                      <Text
                        data-id={option.id}
                        style={styles.answerButtonText}>
                        {option.name}</Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          </MediaQuery>
        </View>
      )
    }
  };
  prepareSavedState = (s) => {
    s.menuPosition = null
    return s
  }
  saveAndClear = (clear = false, callback = undefined) => {
    console.log("Saving client...")
    const clientInfo = c = this.state.clientInfo
    const buttons = this.state.buttons
    const userNameDobID = c.lastName + '-' + c.firstName + '-' + c.key;
    const userId = firebase.auth().currentUser.uid;
    if (c.modified === true) {
      this.saveClient(
        userId,
        userNameDobID,
        clientInfo,
        buttons
      );
    }
    if (clear) {
      name = getRandomName()
      let clientInfoRestart = {
        key: name.key,
        name: name.first + ' ' + name.last,
        firstName: name.first,
        middleName: '',
        lastName: name.last,
        gender: clientStartGender,
        age: clientStartAge,
        dob: '',
        height: clientStartHeight,
        weight: clientStartWeight,
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        race: '',
        ssn: '',
        tobacco: 'None',
      };
      this.setState(
        {
          buttons: [],
          activeQuestionId: 0,
          questionCounter: 1,
          calculatorVisible: false,
          calculatorPositionX: 0,
          calculatorFaceValue: calculatorFaceValueStart,
          calculatorTerms: calculatorTermStart,
          calculatorHiddenProducts: [],
          calculatorClientAge: clientStartAge,
          calculatorCounter: 0,
          calculator: {},
          questionAnswer: '',
          masterInputNotice: null,
          activeButtonId: 0,
          clientInfo: clientInfoRestart,
        },
        () => {
          this.updateCalculatorValues(this.state.calculatorFaceValue, this.state.calculatorTerms, 'end of saveAndClear');
        }
      );
    }
    if (callback) callback()
  };
  clear = (clear = false, callback = undefined) => {
    if (clear) {
      let clientInfoRestart = {
        key: clientStartName.key,
        name: clientStartName.first + ' ' + clientStartName.last,
        firstName: '',
        middleName: '',
        lastName: '',
        gender: clientStartGender,
        age: clientStartAge,
        dob: '',
        height: clientStartHeight,
        weight: clientStartWeight,
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        race: '',
        ssn: '',
        tobacco: 'None',
      };
      this.setState(
        {
          buttons: [],
          activeQuestionId: 0,
          questionCounter: 1,
          calculatorVisible: false,
          calculatorPositionX: 0,
          calculatorFaceValue: calculatorFaceValueStart,
          calculatorTerms: calculatorTermStart,
          calculatorHiddenProducts: [],
          calculatorClientAge: clientStartAge,
          calculatorCounter: 0,
          calculator: {},
          questionAnswer: '',
          masterInputNotice: null,
          activeButtonId: 0,
          clientInfo: clientInfoRestart,
        },
        () => {
          // console.log("saveAndClear() finished");
          // console.log(clientInfoRestart)
          // console.log(this.state);
          this.updateProviders(true, 'end of clear()');
        }
      );
    }
    if (callback) callback()
  };
  renderIdScanButton() {
    return (
      <View style={styles.idScanButtonContainer}>
        {/*<Button onPress={()=>{this.setState({exportVisible: true})}} title="Export" color="#d2d2d4"/>*/}
        <View style={{ borderWidth: 1, borderColor: '#d2d2d4', borderRadius: 4, marginRight: 10, }}>
          <Button onPress={() => this.clear(true)} title="Clear" color="#d2d2d4" />
        </View>
        <View style={{ borderWidth: 1, borderColor: '#d2d2d4', borderRadius: 4, }}>
          <Button onPress={this.scan.bind(this)} title="Scan DL" color="#d2d2d4" />
        </View>

        {/*<Button onPress={()=>{*/}
        {/*AlertIOS.alert(*/}
        {/*'Clear All Data',*/}
        {/*'This action cannot be undone.',*/}
        {/*[*/}
        {/*{*/}
        {/*text: 'Cancel',*/}
        {/*onPress: () => console.log('Cancel Clear Form Pressed'),*/}
        {/*style: 'cancel',*/}
        {/*},*/}
        {/*{*/}
        {/*text: 'Clear Form',*/}
        {/*onPress: () => this.saveAndClear(),*/}
        {/*},*/}
        {/*]*/}
        {/*);*/}
        {/*}} title="Save & Clear" color="#d2d2d4"/>*/}
      </View>
    );
  }
  async scan() {
    try {
      const scanningResult = await BlinkID.scan(
        BlinklicenseKey,
        {
          enableBeep: true,
          useFrontCamera: false,
          shouldReturnCroppedImage: true,
          shouldReturnSuccessfulImage: false,
          recognizers: [
            BlinkID.RECOGNIZER_USDL
          ]
        });
      if (scanningResult) {
        let resultList = scanningResult.resultList;
        let resultsFormattedText = "";
        let fieldDelim = ";\n";
        for (let i = 0; i < resultList.length; i++) {
          // Get individual resilt
          var recognizerResult = resultList[i];
          resultsFormattedText += "Result type: " + recognizerResult.resultType + fieldDelim;
          if (recognizerResult.resultType === "USDL result") {
            // handle USDL parsing resul
            var fields = recognizerResult.fields;
            this.log(fields)
            // USDLKeys are keys from keys/usdl_keys.js

            let clientInfo = { ...this.state.clientInfo };

            clientInfo.firstName = fields[USDLKeys.CustomerFirstName];
            clientInfo.middleName = fields[USDLKeys.CustomerMiddleName];
            clientInfo.lastName = fields[USDLKeys.CustomerFamilyName];
            clientInfo.name = _.startCase(_.toLower(clientInfo.firstName + " " + clientInfo.middleName + " " + clientInfo.lastName));
            clientInfo.dob = fields[USDLKeys.Sex];

            let m = /(.{2})(.{2})(.{4})/.exec(fields[USDLKeys.DateOfBirth]);
            clientInfo.dob = m[1] + "/" + m[2] + "/" + m[3];

            // clientInfo.height = Math.floor(parseInt(fields[USDLKeys.HeightIn]) / 12) +"-"+ parseInt(fields[USDLKeys.HeightIn]) %12;
            // clientInfo.height = Math.floor(parseInt(fields[USDLKeys.HeightIn]));
            clientInfo.height = fields[USDLKeys.HeightIn];
            clientInfo.weight = fields[USDLKeys.WeightPounds];
            clientInfo.street1 = fields[USDLKeys.AddressStreet];
            clientInfo.city = fields[USDLKeys.AddressCity];
            clientInfo.state = fields[USDLKeys.AddressJurisdictionCode];
            clientInfo.zip = fields[USDLKeys.AddressPostalCode];
            clientInfo.race = fields[USDLKeys.RaceEthnicity];
            clientInfo.ssn = fields[USDLKeys.SocialSecurityNumber];

            // this.updateButtonsFromScan(clientInfo);

            this.saveAndClear(true, () => {
              this.setState({ questionAnswer: clientInfo.name }, () => {
                this.nextQuestion()
                this.setState({ questionAnswer: clientInfo.gender }, () => {
                  this.nextQuestion()
                  this.setState({ questionAnswer: clientInfo.dob }, () => {
                    console.log(clientInfo.dob)
                    console.log(this.state.questionAnswer)
                    this.nextQuestion()
                    this.setState({ questionAnswer: clientInfo.height }, () => {
                      this.nextQuestion()
                      this.setState({ questionAnswer: clientInfo.weight }, () => {
                        this.nextQuestion()
                        this.setState({ clientInfo }, () => {
                          console.log('== Card Details Consumed ==')
                          this.setState({ activeQuestionId: 2, questionAnswer: clientInfo.dob }, () => {
                            console.log('Resubmitting DOB')
                            this.nextQuestion()
                          })
                        });
                      })
                    })
                  })
                })
              })
            })

          }
          resultsFormattedText += '\n';
          let ordered = {};
          _(fields).keys().sort().each(function (key) {
            ordered[key] = fields[key];
          });
          resultsFormattedText = stringifyObject(this.state.clientInfo);
        }
        // image is returned as base64 encoded JPEG, we expect resultImageCorpped because we have activated obtaining of cropped images (shouldReturnCroppedImage: true)
        // to obtain image from successful scan, activate option (shouldReturnSuccessfulImage: true) and get is with scanningResult.resultImageSuccessful
        this.setState({ BlinkShowImage: scanningResult.resultImageCropped, BlinkResultImage: 'data:image/jpg;base64,' + scanningResult.resultImageCropped, BlinkResults: resultsFormattedText });
      }
    } catch (error) {
      this.setState({ BlinkShowImage: false, BlinkResultImage: '', BlinkResults: error.message });
    }
  }
  setUser = (id, name, email, subscription, transactionId, originalTransactionDateIOS, originalTransactionIdentifierIOS) => {
    res = firebase.database().ref('users/' + id).set({
      id,
      name,
      email,
      subscription,
      activeSubscription: true,
      transactionId,
      originalTransactionDateIOS,
      originalTransactionIdentifierIOS
    })
  }
  saveClient = (userId, clientId, clientInfo, buttons) => {
    console.log("saveClient()")
    console.log(buttons)
    const t = (new Date).getTime()
    const data = {
      t: t,
      clientId: clientId,
      linkText: clientInfo.lastName + ', ' + clientInfo.firstName + ' (' + moment(new Date()).format("MMM[.] Do") + ')',
      buttons: buttons,
      clientInfo: clientInfo,
      version: 3
    }
    console.log("data to save...")
    console.log(data)
    console.log('saving to path: clients/' + userId + '/' + clientId)
    res = firebase.database().ref('clients/' + userId + '/' + clientId)
      .set(data)
      .then(res => {
        console.log("saveClient() .set() res: ")
        this.getClientHistory();
        console.log(res)
      })
      .catch(err => {
        console.log("SaveClient() Error:")
        console.log(err)
      })
  }
  getSupportMessages = () => {
    messagesArray = []
    ref = firebase.database().ref('support/' + firebase.auth().currentUser.uid + '/messages')
    ref.orderByChild('time')
      .startAt(3)
      .on('child_added', (snapshot) => {
        messagesArray.push(snapshot.val())
        // Send to redux store
        this.props.fetchSupportMessages(messagesArray);
        let setRed = false
        let setNewChatModal = false;
        last = _.last(messagesArray)
        if (last.senderType == 'admin') {
          setRed = true;
          setNewChatModal = true
          PushNotification.localNotification({
            title: "Insura Support Message",
            message: last.content,
          });
        } else {
          setRed = false;
          setNewChatModal = false
        }
        this.props.setRedDot(setRed)
        this.props.toggleNewChatModal(setNewChatModal)
      })
  }
  getClientHistory = (callback = null) => {
    // console.log("getClientHistory(): setting this.state.clientHistory to []")
    this.setState({ clientHistory: [] }, () => {
      ref = firebase.database().ref('clients/' + firebase.auth().currentUser.uid).orderByKey()
      clients = this.state.clientHistory
      ref.once('value').then(snapshot => {
        _.each(snapshot.val(), (client, k) => {
          // console.log("pushing client")
          clients.push(client)
        });
      }).done(() => {
        this.setState({ clientHistory: clients }, () => {
          // console.log("=== .once() updated this.client.history ===")
          // console.log(this.state.clientHistory)
        })
      })
    })
  }
  setUserMeta = (k, v, cb = () => { }) => {
    // console.log('setting user meta')
    // console.log(k)
    // console.log(v)
    value = undefined
    ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)
    ref.update({ [k]: v }, (err) => {
      if (err) {
        // console.log("setUserMeta failed...")
      } else {
        value = v
        // console.log("Meta update successfull")
        // console.log("SET: getUserMeta set key %s to value %s",k,v)
      }
    })
    cb()
    return v
  }

}

// Code Push
// let codePushOptions = { installMode: codePush.InstallMode.IMMEDIATE };
// Insura = codePush(codePushOptions)(Insura);
// export default Insura;
const mapStateToProps = (state) => {
  return {
    supportVisable: state.supportReducer.supportVisible,
    redDotPresent: state.supportReducer.redDotPresent,
    newChatModalShowing: state.supportReducer.newChatModal,
    activeSubscription: state.inAppPurchaseReducer.activeSubscription,
    subscriptionPlan: state.inAppPurchaseReducer.subscriptionPlan,
    availableProducts: state.inAppPurchaseReducer.availableProducts,
    cookedProducts: state.inAppPurchaseReducer.cookedProducts,
    selectedProductToPurchase: state.inAppPurchaseReducer.selectedProductToPurchase,
  };
};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
    fetchSupportMessages,
    setRedDot,
    toggleSupportModal,
    toggleNewChatModal,
    setActiveSubscription,
    setAvailableProducts,
    setCookedProducts,
    selectProduct
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Insura);



// Notifications Push (nothing to do with Code Push!)
Push.setListener({
  onPushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'Android background';
      message = '<empty>';
    }

    // Custom name/value pairs set in the App Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
    }
    else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  }
});


/*
 * Utility functions
 */
function epochToDate(t) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(t / 1000);
  return d
}
function getRandomName() { return { first: 'John', last: 'Doe', key: (Math.ceil(Math.random() * 100000000)).toString() } }
Number.prototype.toCurrencyString = function (prefix, suffix) {
  if (typeof prefix === 'undefined') { prefix = '$'; }
  if (typeof suffix === 'undefined') { suffix = ''; }
  var _localeBug = new RegExp((1).toLocaleString().replace(/^1/, '').replace(/\./, '\\.') + "$");
  return prefix + (~~this).toLocaleString().replace(_localeBug, '') + (this % 1).toFixed(2).toLocaleString().replace(/^[+-]?0+/, '') + suffix;
}
function number_format(number, decimals, dec_point, thousands_sep) {

  number = parseFloat(number.toString().replace(/[^0-9\.]/gm, ''));

  // console.log("number format after replace: ");
  // console.log(number);

  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function even(n) { return n % 2 }
function first_child(n) { return n === 0 }