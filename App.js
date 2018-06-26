/*
 * TODO:
 * - Install
 * Transported App Password: esvi-nrzl-ltfd-laxw
 */

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
  LayoutAnimation,
  Animated,
  Easing,
  KeyboardAvoidingView,
  View
} from 'react-native';
import StripeToken from 'react-native-stripe-api'
import Stripe from './stripe'
import { LiteCreditCardInput } from "react-native-credit-card-input"
import * as firebase from 'firebase'
import RNPickerSelect from 'react-native-picker-select'
import Hyperlink from 'react-native-hyperlink'
import _ from 'lodash'
import styles from './styles'
const stringifyObject = require('stringify-object')
const Providers = require('./providers').default.providers
const DeclinedDrugs = require('./decline_drugs').default.medications
const CoverageLimits = require('./coverage-limits').default

let Build = {min:{},max:{}}
Build.min = require('./weight-min').default.min
Build.max = require('./weight-max').default.max

const TestFairy = require('react-native-testfairy');

const Conditions = require('./decline_conditions').default.conditions;
const Medications = require('./medications2').default.all;

const Calculator = require('./calculatorData').default;
let Questions = require('./questions').default.questions;

// BLINK ID License Key
import {BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys} from 'blinkid-react-native';
const BlinklicenseKey = Platform.select({
  ios: 'RIWAWJSR-CWCHEIUG-P2NBYJIL-PU65ZFWS-UE77OCVN-APB6INY3-CWDH4J6W-7BLWEEON',
  // ios: 'R6GH6FFH-JKIYQ76Q-QGUJSEIH-DSQCNQTR-IUZB525W-PXAH7EHI-NPUGWSGI-EDRUGFHX',
});

// STRIPE KEYS
let stripe_url = 'https://api.stripe.com/v1/';
let stripe_mode = 'TEST';
const stripe_test_key = "sk_test_4pJ7hGg9yxZxZCXibtxvzphX";
const stripe_prod_key = "sk_live_c8NPJO5bonIsTxjtryiEwmrN";
const STRIPE_API_KEY = stripe_mode === "PROD" ? stripe_prod_key : stripe_test_key;
// console.log("Stripe API Key: "+STRIPE_API_KEY);

const logos = {
  0: require('./images/insura_logo.png'),
  1: require('./images/logo_moo.jpg'),
  2: require('./images/logo_am.jpeg'),
  3: require('./images/logo_ta.png'),
  4: require('./images/logo_for.png'),
  5: require('./images/logo_cfg.jpeg'),
  6: require('./images/logo_roy.jpeg'),
  7: require('./images/logo_aig.png')
};

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

let clientStartAge = 50;
let clientStartHeight = 69;
let clientStartWeight = 170;
export default class Applify extends Component {
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
      clientInfo: {
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
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
        ssn:''
      },
      calculatorVisible: false,
      calculatorPositionX: 0,
      calculatorFaceValue: '25,000',
      calculatorTerms: '20',
      calculatorHiddenProducts: [],
      calculatorClientAge: "",
      calculatorCounter: 0,
      calculator: {},
      exportVisible: false,

      // Form / Login
      modalMaskVisible: false,
      loading: true,
      user: null,
      formError: false,
      formErrorNotice: false,
      registerVisible: false,
      registerFullName: null,
      registerEmail: null,
      registerPhone: null,
      registerPhoneResult: null,
      registerPassword: null,
      registerConfirmPassword: null,
      registerCC: {},
      registerCCStatuses: {},
      refisterCCValid: false,
      registerPlanID: 'plan_D2F3s5CVgtPEkC',
      loginVisible: false,
      loginEmail: null,
      loginPassword: null,
      resetPasswordVisible: false,
      menuVisible: false,
      menuPosition: new Animated.Value(-250),
      supportVisible: true,
      supportInput: '',
      supportMessages: []
    };
  }
  componentDidMount() {

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

    this.authSubscription = firebase.auth().onAuthStateChanged((user)=>{
      this.setState({loading: false, user});
      if(firebase.auth().currentUser === null){
        this.setState({modalMaskVisible: true, registerVisible: true});
      } else {
        this.setState({modalMaskVisible: false, registerVisible: false, loginVisible: false});
        this.getSupportMessages()
      }
    });

  }
  componentWillUnmount() {
    this.authSubscription();
    TestFairy.begin("0b43fbd57420a2d774299b1e10e75ca1ff5249af");
  }

  log = (content) => {
    // let str = stringifyObject(content) + " " + Math.floor(Date.now() / 1000) + "\n" + this.state.consoleContent;
    let str = stringifyObject(content) + "\n" + this.state.consoleContent;
    this.state.consoleContent = str.substr(0,4999);
    // console.log(str);
    // this.setState({consoleContent: updateContent});
  };
  setAnswerFromButton=(questionId)=>{
    // console.log("setAnswerFromButt() =====================")
    // console.log("questionId: "+questionId)
    // console.log("buttons:")
    // console.log(this.state.buttons)
    button = _.find(this.state.buttons,function(b){ return b.questionId==questionId})
    // console.log("button found by ID:")
    // console.log(button)
    if(typeof button != 'undefined') {
      if(button.field==='dob') button.subtitle = button.subtitle.replace(/\(.*\)/gm,'').trim(); // remove anything in ()s
      this.setState({questionAnswer: button.subtitle},()=>{console.log(this.state.questionAnswer)})
    }
  }
  nextQuestion = (skip=false) => {
    Q = Questions[this.state.activeQuestionId]
    if(Q.submitByReturn===false && !skip && Q.fieldType=='buttons'){
      this.setState({masterInputNotice:'PRESS OPTION'});
      return false
    }
    LayoutAnimation.configureNext(CustomLayoutSpring);
    if(!this.validateAnswer()) return
    // console.log("nextQuestion, answer is validated");
    if(this.state.questionCounter < Questions.length) this.setState({questionCounter: this.state.questionCounter + 1});
    if(!skip) this.processAnswer(Q.category,{answer:this.state.questionAnswer});
    if(Questions[this.state.activeQuestionId+1]) {
      this.setState({activeQuestionId: this.state.activeQuestionId+1});
      this.setState({activeButtonId: this.state.activeQuestionId+1});
      // this.setAnswerFromButton(this.state.activeQuestionId+1)
    }
  };
  prevQuestion = () => {
    if(this.state.questionCounter > 1) this.setState({questionCounter: this.state.questionCounter - 1});
    if(Questions[this.state.activeQuestionId-1]) {
      this.setState({activeQuestionId: this.state.activeQuestionId-1});
      this.setState({activeButtonId: this.state.activeQuestionId-1});
      this.setAnswerFromButton(this.state.activeQuestionId-1)
    }
  };
  validateAnswer=()=>{
    // console.log("running validateAnswer()")
    const Q = Questions[this.state.activeQuestionId]
    const a = this.state.questionAnswer
    // console.log(Q); console.log(a)
    stat = 1
    switch(Q.fieldType){
      case 'buttons':
        if(a.length < 1) {
          stat = 0
        }
      case 'options': stat = 1 // questions that use autosuggest
        break
      case 'int':
      case 'float':
        stat = parseInt(number_format(a)) > 0 ? 1 : 0
        if(stat==0) this.setState({masterInputNotice:'NUMBER NEEDED'});
        break
      case 'full-name':
        name = a.replace(/[^a-zA-Z ]/,'').trim()
        if(name.length<5) stat = 0
        if(a.split(' ').length<2) stat = 0
        if(stat==0) this.setState({masterInputNotice:'TOO SHORT'});
        break
      case 'dob':
        if(a.trim().length < 6) { this.setState({masterInputNotice:"TOO\nSHORT"}); return 0 }
        let m = /([0-9]){1,2}[^0-9]*([0-9]{1,2})[^0-9]*([0-9]{2,4})/.exec(a);
        if(!m) { this.setState({masterInputNotice:'WRONG FORMAT'}); return 0 }
        if(m.length<4) {
          stat = 0
          if(stat==0) this.setState({masterInputNotice:'WRONG FORMAT'});
        } else {
          if(m[1].length<1 || m[2].length<1 || m[3].length<2) stat = 0
          if(stat==0) this.setState({masterInputNotice:'TOO SHORT'});
        }
        break
      case 'email':
        if( ! /(.+)@(.+){2,}\.(.+){2,}/.test(a)){
          this.setState({masterInputNotice:'INVALID EMAIL'});
          return 0
        }
    }
    // console.log("stat:"); console.log(stat)
    if(stat==1) this.setState({masterInputNotice:null});
    return stat
  }
  processAnswer = (category, details) => {
    // console.log("processAnswer");
    let self = this;
    details.answer = details.value === undefined ? details.answer : details.value;
    Q = Questions[this.state.activeQuestionId];
    let clientInfo = this.state.clientInfo;

    if(Q.field==='name'){
      name = details.answer.split(' ')
      clientInfo.name       = details.answer
      clientInfo.firstName  = name[0]
      clientInfo.lastName   = name[1]
    }
    if(Q.field==='dob'){
      // console.log("=== DOB SUBMITTED ===");
      const dob = this.formatDOB(details.answer);
      // console.log(dob);
      const age = this.getAge(dob);
      clientInfo.dob = dob;
      clientInfo.age = age;
      details.answer = dob +" ("+ age+"yo)";
    }
    if(Q.field==='height'){
      clientInfo.height = details.answer;
      details.answer = this.formateHeight(details.answer);
    }
    if(Q.field==='weight'){
      clientInfo.weight = details.answer;
      details.weight = details.answer
    }

    if(Q.field==='mortgage') details.answer = '$' + number_format(details.answer);
    if(Q.field==='mortgage-rate') details.answer = parseFloat(details.answer) + "%";

    // UPDATE EXISTING BUTTON
    if(_.find(this.state.buttons,function(o){ return o.field === Q.field })
      && !(category==='MED' || category==='MED_OLD'||category==="CON") ){

      // BIO
      if(category==="BIO") { // Update an existing button
        clientInfo[Q.field] = details.answer;
        this.setState({clientInfo});
        let buttons = {...this.state.buttons};
        buttons[this.state.activeButtonId].subtitle = details.answer;
        this.setState([{buttons}]);
      }

    // START A NEW BUTTON
    } else {
      let B = {
        id: this.state.buttons.length + 1,
        category: category,
        field: Q.field,
        questionId: this.state.activeQuestionId,
        buttonButtonId: 0
      };
      if(category==="BIO") {
        let clientInfo = {...this.state.clientInfo};
        clientInfo[Q.field] = details.answer;
        // console.log("== NEW bio button ==");
        this.setState({clientInfo}, ()=>{this.updateProviders()});
        B.title = Q.title;
        B.subtitle = details.answer.toString().trim();
      }
      else if(category==="MED" || category==="MED_OLD"){
        B.title = details.name;
        B.subtitle = details.dosage;
        B.key = details.id
      }
      else if(category==="CON"){
        B.title = _.startCase(_.toLower(details.name));
        // B.subtitle = "CODE: " + details.id;
        B.key = details.id;
      }
      if(_.trim(B.title)==='') return;
      this.setState(prevState => ({buttons: [...prevState.buttons, B]}),()=>{this.updateProviders;});
    }
    if('answerOptions' in Q){
      this.nextQuestion(true);
    }

    this.setState({clientInfo: clientInfo}, ()=>{
      this.clearAnswer();
      this.updateProviders();
    });

  };
  clearAnswer = () => {
    this.setState({questionAnswer: ''});
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
    console.log("=== FORMATTING DOB ====");
    console.log(str);
    if(_.trim(str)==='') return;
    let m = /([0-9]{1,2})[^0-9]*([0-9]{1,2})[^0-9]*([0-9]{2,4})/.exec(str);
    console.log(m)
    let dob = m[1]+"/"+m[2]+"/"+m[3];
    console.log(dob)
    return dob;
  };
  formateHeight = (height) => {
    // console.log("height");
    // console.log(height);
    if(!height) return;
    return parseInt(height/12) +"' "+height%12+"'' or "+ height+"''";
  };
  updateProviders = (restart=false) => {
    // console.log("--- Updating providers ---");
    // console.log(this.state.buttons);
    // console.log(this.state.clientInfo);
    let self = this;
    let age = this.state.clientInfo.age;
    let Providers = {...this.state.Providers};
    let client = this.state.clientInfo;
    let term = this.state.calculatorTerms;
    let notices = [];
    _.each(Providers,function(Provider,ProviderKey){
      _.each(Provider.products,function(product,productKey){
        let uw = product.underwriting;
        let statuses = [];


        // Check that the products in this product support the uses current age
        let guaranteed = false;
        _.each(product.calculator.products, function(product){
          if(product.guaranteedIssue) guaranteed = true;
          // console.log("========= PRODUCT AGE CHECK ==========");
          // console.log(product);
          table = product.table;
          // CALCULATE MONTHLY AND ANUUAL COST
          let anyTermSupported = false;
          switch (product.tableType) {
            case 'term--age--gender-smokerStatus':
              anyTermSupported = false;
              _.each(table,function(term){
                // console.log("=== term ===");
                // console.log(term);
                if(typeof term[age] !== "undefined") anyTermSupported = true;
              })
              if(! anyTermSupported){
                notices.push(product.name+" does not have a term that supports age "+age);
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--term-smokerStatus':
              if(typeof table[age]==="undefined"){
                notices.push(product.name+" does not support age of "+age);
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--gender-smokerStatus':
              if(typeof table[age]==="undefined"){
                notices.push(product.name+" does not support age of "+age);
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
            case 'age--gender':
              if(typeof table[age]==="undefined"){
                notices.push(product.name+" does not support age of "+age);
                statuses.push(1);
              } else {
                statuses.push(3);
              }
              break;
          }
        })

        // If the age is supported in any of the products in the loop above, force approval
        // console.log("statuses: "); console.log(statuses);
        if(_.max(statuses)===3) statuses = [3];



        // Check the build charts for height/weight requirements
        if(client.height in Build.min && client.height in Build.max){
          // console.log("=== checking height and weight ===");
          let minWeight = Build.min[client.height][product.nickname];
          let maxWeight = Build.max[client.height][product.nickname];
          // console.log("min weight: " + minWeight);
          // console.log("max weight: " + maxWeight);

          if(maxWeight !== null){
            // console.log("checking max weight...");
            if(client.weight > maxWeight){
              // console.log("max weight is in excess!");
              if(!guaranteed) statuses.push(1);
              notices.push(product.name+" does not support weight in excess of "+maxWeight);
              if(minWeight !== null) {
                if(client.weight < minWeight){
                  if(!guaranteed) statuses.push(1);
                  notices.push(product.name+" does not support weight under "+minWeight);
                }
              }
            } else {
              // console.log("max weight is NOT in excess!");
            }
          }
        } else {
          // console.log("Did not find height in build charts...");
        }


        // check medications and conditions
        _.each(self.state.buttons,function(button){

          // If this is a medication...
          if(button.category==='MED'){
            let medication = _.find(Medications,function(o){return o.id == button.key});
            // console.log("medication:")
            // console.log(medication)
            // console.log("button")
            // console.log(button)

            // console.log("checking drug list:")

            // If the drug exists in our databases
            if(medication !== undefined){
              if(product.nickname in medication) {

                medication = _.filter(DeclinedDrugs, function (dd) {
                  // console.log("dd.name"+_.toLower(dd.name))
                  // console.log("medication.name)"+_.toLower(medication.name))
                  return _.includes(_.toLower(dd.name), _.toLower(medication.name))
                })[0]

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
                    notices.push(product.name + " does not allow medication: " + medication.name);
                    break;
                  case 'D':
                    statuses.push(1);
                    notices.push(product.name + " needs to review : " + medication.name);
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

          if(button.category==='CON'){
            let condition = _.find(Conditions,function(o){return o.id == button.key});
            // console.log("checking condition...........");
            // console.log(condition);
            // console.log(product.nickname);

            if(condition !== undefined){

              let status = condition[product.nickname];
              let query = 0;
              let arr = _.split(status,'-'); // split out encoded answers
              status = arr[0]; // update medications to use the first segment regardless
              if(arr.length > 1){ // if a second segment is found, use it
                query = arr[1];
              }

              switch (status){
                case 'A':
                  statuses.push(3); break;
                case 'IC':
                  statuses.push(2);
                  notices.push(product.name+" needs to review: "+condition.name);
                  break;
                case 'D':
                  statuses.push(1);
                  notices.push(product.name+" does not allow: "+condition.name);
                  break;
                case 'Q':
                  // console.log(" ========== Case Q ========== ");
                  // console.log("button.buttonButtonId: " + button.buttonButtonId);
                  // console.log("query: " + query);
                  if(button.buttonButtonId <= query){
                    statuses.push(1)
                    notices.push(product.name+" does not support: "+condition.name+" within "+query+" years.");
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
        });

        // Update Provider and Product
        Providers[ProviderKey].products[productKey].status = _.min(statuses);
        if(restart) Providers[ProviderKey].products[productKey].status = 3;
      })
    });
    this.setState(Providers);
    // console.log(notices);
    // console.log(this.state);
  };
  watchAnswer = (questionAnswer) => {
    // console.log("watchAnswer()")
    this.setState({questionAnswer: questionAnswer});
    if(questionAnswer===''){
      this.setState({autoSuggestVisible: false});
      return;
    }
    this.checkAutoSuggest(questionAnswer);
  };
  checkAutoSuggest = (questionAnswer) => {
    if(_.trim(questionAnswer)==='') return;
    let Q = Questions[this.state.activeQuestionId];
    if(Q.suggest){
      if(["MED","MED_OLD","CON"].includes(Q.category)){
        this.updateAutoSuggestOptions(questionAnswer, Q);
        this.setState({autoSuggestVisible: (questionAnswer)});
      }
    }
  };
  getSearchData = () => {
    let category = Questions[this.state.activeQuestionId].category;
    let data = [];
    if(category==="MED"||category==="MED_OLD"){
      data = Medications;
      // console.log(data)
    }
    else if(category==="CON") {
      data = Conditions
    }

    return data;
  };
  updateAutoSuggestOptions = (search) => {
    let matches = [];
    let terms = _.split(search,' ');
    let searchData = this.getSearchData();
    let category = Questions[this.state.activeQuestionId].category;

    // Use the first term to filter by all option names
    matches = _.filter(searchData, function(o) { return _.includes(_.toLower(o.name),_.toLower(terms[0])) }).slice(0,100);
    terms.shift();

    // console.log("matches:")
    // console.log(matches)
    // console.log("terms:")
    // console.log(terms)

    // filter matches by all remaining terms
    if(terms.length){
      let matchesTmp = [];
      _.each(terms,function(term){
        if(_.trim(term)){
          matchesTmp = _.filter(matches, function(o) {return _.includes(_.toLower(o.name),_.toLower(term.toString())) });
          if(category==='MED'||category==='MED_OLD') matchesTmp = _.concat(matchesTmp, _.filter(matches, function(o) { return _.includes(_.toLower(o.dosage),_.toLower(term.toString())) }));
          matches = matchesTmp;
        }
    });
    }
    matches = _.uniqBy(matches,'key'); // force unique (thanks Obama)
    if(category==="MED"||category==="MED_OLD") matches = matches.sort(function(a,b) { return a.name.length - b.name.length; }); // order by shortest name
    if(category==="CON") matches = _.orderBy(matches,'mifts','desc'); // order by shortest name
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({autoSuggestOptions: matches});
  };
  clickAnswer = (option) => {
    // console.log("clicked ");
    // console.log(option);
    this.processAnswer(Questions[this.state.activeQuestionId].category,option);
    this.state.autoSuggestVisible = false;
    this.clearAnswer();
  };
  renderOptions = (buttons) => {
    // console.log('=== renderOptions ===');
    // console.log(this.state.autoSuggestOptions);
    // console.log(this.state.questionAnswer);

    if(this.state.autoSuggestOptions.length > 0) {
      return (
        <View style={styles.autoSuggestWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            {this.state.autoSuggestOptions.map(option => (
              <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.key)} underlayColor="#FFF">
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
      option = {id: _.random(1000000), name: this.state.questionAnswer, dosage: '', manualEntry: true };
      return (
        <View style={styles.autoSuggestWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
              <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
                <View style={styles.autoSuggestItem}>
                  <Text
                    style={styles.autoSuggestItemTitle}>
                    {option.name} &nbsp;{option.dosage} <Text style={{fontWeight: '700'}}>(Manual Entry)</Text></Text>
                </View>
              </TouchableHighlight>
          </ScrollView>
        </View>
      )
    }
  };
  editButton = (button,key) => {
    this.setState({activeButtonId: key, questionCounter: key+1});
    let buttons = {...this.state.buttons};
    let qId = buttons[key].questionId;
    this.setState({activeQuestionId: qId});
    if(buttons[key].category==='BIO'){
      let answer = buttons[key].subtitle;
      if(buttons[key].field==='dob') answer = buttons[key].subtitle.replace(/\(.*\)/gm,'').trim(); // remove anything in ()s
      this.setState({questionAnswer: answer});
    }
  };
  deleteButton = (button,key) => {
    if(button.category=="BIO") return // disallow deleting BIO buttons
    let clientInfo = this.state.clientInfo;
    let buttons = {...this.state.buttons};
    buttons = _.filter(buttons,function(o){ return o.id !== button.id });
    this.setState({buttons});
    if (button.field === 'dob') {
      clientInfo.age = clientStartAge;
      this.setState({clientInfo: clientInfo},()=>{this.updateProviders()});
    }
    if (button.field === 'weight') {
      clientInfo.age = clientStartWeight;
      this.setState({clientInfo: clientInfo},()=>{this.updateProviders()});
    }
    if (button.field === 'height') {
      clientInfo.age = clientStartHeight;
      this.setState({clientInfo: clientInfo},()=>{this.updateProviders()});
    }

    this.updateProviders();
  };
  updateButtonsFromScan = (clientInfo) => {
    self = this;
    let fields = '';
    _.forEach(Questions,function(Q, id){
      if(Questions[id].category==='BIO' && _.trim(clientInfo[Questions[id].field])){
        Questions[id].answer = clientInfo[Questions[id].field];
        self.state.activeQuestionId = id;
        self.processAnswer('BIO',Questions[id]);
      }
    });
    this.setState({consoleContent: fields + "\n" + stringifyObject(Questions) + stringifyObject(clientInfo)});
  };
  renderButtonButtons = (button) => {
    // console.log("rendering renderButtonButtons()");
    // console.log(button);
    let o = false; // medication or condition object, known lovingly here as "o"
    if(button.category === "MED" || button.category === "MED_OLD") {
      o = _.find(DeclinedDrugs, function (o) { return o.id === button.key });
      // console.log("found medication:");
    } else if(button.category === "CON") {
      o = _.find(Conditions, function (o) { return o.id === button.key });
      // console.log("found condition:");
    }
    // console.log(o);
    let needMoreButtons = false; // there is a value like "Q-5" that prompts inner buttons
    for(var product in o){ // iterate over the status of all products for this med/con
      let arr = _.split(o[product],'-'); // split out encoded answers
      status = arr[0]; // update medications to use the first segment regardless
      if(arr.length > 1){ // if a second segment is found, use it
        let query = arr[1];
        needMoreButtons = true;
      }
    }

    let buttons = '';
    let numbers = [1,2,3,5,10];

    // console.log("needMoreButtons:");
    // console.log(needMoreButtons);
    function activeBgColor(n,active){ return n == active ? '#434343' : 'white' }
    function activeColor(n,active){ return n == active ? 'white' : 'black' }
    if(needMoreButtons)
      return (
        <View style={styles.buttonButtonsWrap}>
          <View><Text style={styles.buttonButtonTitle}>Years Ago:</Text></View>
          {numbers.map(n => (
            <TouchableHighlight
              key={n}
              onPress={()=>{this.clickedButtonButton(n,button)}}>
              <View style={[
                  styles.buttonButtonWrap,
                  {'backgroundColor': activeBgColor(n,button.buttonButtonId)}
                ]}>
                <Text style={[{'color': activeColor(n,button.buttonButtonId)},styles.buttonButtonText]}>{n}</Text>
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
    this.setState({buttons: buttons});
    this.updateProviders();
  }
  renderButtons = (buttons) => {
    return (
      <ScrollView
        contentContainerStyle={styles.infoButtonsWrap}
        keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
        {buttons.map((button,k) => (
          <TouchableHighlight onPress={()=>{this.editButton(button, k)}}
                              onLongPress={()=>{this.deleteButton(button,k)}}
                              key={button.id}
            underlayColor="transparent">
            <View style={[styles.infoButton,styles['infoButton_'+button.category]]}>
              <Text style={[styles.infoButtonTitle, styles['infoButtonTitle_'+button.category]]}>{button.title}</Text>
              <Text style={[styles.infoButtonSubtitle, styles['infoButtonSubtitle_'+button.category]]}>{button.subtitle}</Text>
              {this.renderButtonButtons(button)}
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  };
  renderProviderStatus = (Providers) => {
    return (
      <TouchableHighlight onPress={()=>{this.setState({
        calculatorVisible: true,
        calculatorProduct: 1,
        updateCalculatorValues: this.updateCalculatorValues(this.state.calculatorFaceValue,this.state.calculatorTerms)
      })}}>
      <View style={styles.providerStatusContainer}>
          {Providers.map(provider => (
            <View key={provider.id} style={styles.providerStatusWrap}>
              {/*<View><Text style={styles.providerTitle}>{provider.nickname}</Text></View>*/}
              <View><Text style={styles.providerTitle}>{provider.nickname}</Text></View>
              {provider.products.map(product => (
                <View key={product.id}
                      style={[styles.providerTitleProductWrap, styles['providerTitleProductWrapStatus_'+product.status]]}>
                  <Text style={[styles.providerTitleProduct,styles['providerTitleProduct_'+product.status]]}>{product.nickname}</Text>
                </View>
              ))}
            </View>
          ))}
      </View>
      </TouchableHighlight>
    )
  };
  hideCalculator = () => {
    // console.log('test')
    this.setState({calculatorVisible: false});
  };
  check = (o,k) => {
    if (!(k in o)) {

    }
  }
  getProductCostAvailability = (product,age,gender,smokerStatus,faceValue,term) => {
    let cost = { month: 0, annual: 0, notice: '' };
    let rate = 0;

    // console.log("=-=-=-=-=-= PRODUCT TABLE =-=-=-=-=-=-=");
    table = product.table;
    // console.log(table);
    // CALCULATE SHOW/HIDE STATUS
    // console.log(product.tableType);

    // CALCULATE MONTHLY AND ANUUAL COST
    switch (product.tableType) {
      case 'term--age--gender-smokerStatus':
        if(!(term in table)){
          cost.notice = "The term of '"+term+"' was not found in the rate table.";
          return cost;
        } 
        else if(!(age in table[term])){
          cost.notice = "The age of '"+age+"' was not found in the rate table.";
          return cost;
        }
        rate = table[term][age][gender+"-"+smokerStatus];
        break;
      case 'age--term-smokerStatus':
        if(!(age in table)){
          cost.notice = "The age of '"+age+"' was not found in the rate table.";
          return cost;
        }
        if(!(term+"-"+smokerStatus in table[age])){
          cost.notice = "The term/smoker of '"+term+"-"+smokerStatus+"' was not found in the rate table.";
          return cost;
        }
        if(table[age][term+"-"+smokerStatus] === undefined) return cost;
        rate = table[age][term+"-"+smokerStatus];
        break;
      case 'age--gender-smokerStatus':
        if(!(age in table)){
          cost.notice = "The age of '"+age+"' was not found in the rate table.";
          return cost;
        }
        if(!(gender+"-"+smokerStatus in table[age])){
          cost.notice = "The gender/smoker of '"+gender+"-"+smokerStatus+"' was not found in the rate table.";
          return cost;
        }
        if(table[age][gender+"-"+smokerStatus] === undefined) return cost;
        rate = table[age][gender+"-"+smokerStatus];
        break;
      case 'age--gender':
        if(!(age in table)){
          cost.notice = "The age of '"+age+"' was not found in the rate table.";
          return cost;
        }
        if(table[age][gender] === undefined) return cost;
        rate = table[age][gender];
        break;
    }

    // Check for riders and add to the rate
    if('rider' in product){
      if(!(age in product.rider)){
        console.log("AGE not in product.rider")
        cost.notice = "The age of '"+age+"' was not found in the rate table.";
        console.log(cost.notice);
        return cost;
      } else {
        rate += product.rider[age]
      }
    }

    cost.annual = rate * (_.toInteger(faceValue) / product.multiplier) + product.fee;
    if(product.id===403)
      cost.annual = (rate * (_.toInteger(faceValue) / product.multiplier) + product.fee) * 12;
    cost.month = cost.annual * product.monthFactor;
    return cost;
  }
  updateCalculatorValues = (updatedFaceValue, updatedTerms) => {
    getProductCostAvailability = this.getProductCostAvailability;
    // console.log("state:");
    // console.log(this.state);
    // console.log("==== start updateCalculatorValues ====");
    // console.log("updatedFaceValue: ");
    // console.log(updatedFaceValue);
    // console.log("updatedTerms: ");
    // console.log(updatedTerms);

    updatedFaceValue = updatedFaceValue === null ? this.state.calculatorFaceValue : updatedFaceValue;
    updatedTerms = updatedTerms === null ? this.state.calculatorTerms : updatedTerms;
    this.setState({calculatorClientAge: this.state.clientInfo.age+""});

    updatedFaceValue = updatedFaceValue.toString().replace(/[^0-9\.]/gm,'');
    if(updatedFaceValue<2000) updatedFaceValue = 2000;

    smokerButton = _.find(this.state.buttons,function(b){return b.field == "tobacco-use-type"});
    genderButton = _.find(this.state.buttons,function(b){return b.field == "gender"});
    age = this.state.clientInfo.age;

    let smokerStatus;
    if(!smokerButton){
      smokerStatus = "NS";
    } else {
      smokerStatus = smokerButton.subtitle;
      smokerStatus = smokerStatus === smokerStatus == "None" ? "NS" : "S";
    }

    let gender;
    if(!genderButton){
      gender = "M"
    } else {
      gender = genderButton.subtitle === "Male" ? "M" : "F";
    }

    age = this.state.clientInfo.age;

    // console.log("smoker status");
    // console.log(smokerStatus);


    // console.log("PROPS UPDATED:");
    // console.log("updatedFaceValue: ");
    // console.log(updatedFaceValue);
    // console.log("updatedTerms: ");
    // console.log(updatedTerms);

    calc = this.state.calculator;
    this.setState({calculatorHiddenProducts: []});
    notices = []
    hiddenIds = []

    _.each(Providers,function(provider){
      // console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== Provider ==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==");
      // console.log(provider);
      _.each(provider.products,function(product){
        // console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== Product === ");
        // console.log(product);
        _.each(product.calculator.products,function(calculatorProduct){
          // console.log(calculatorProduct);

          // console.log("product.calculator.type: ");
          // console.log(product.calculator.type);
          // console.log("calculatorProduct");
          // console.log(calculatorProduct);
          // console.log(" === COST VARIABLES ===");
          // console.log("updatedTerms");
          // console.log(updatedTerms);
          // console.log("updatedFaceValue");
          // console.log(updatedFaceValue);
          // console.log("age");
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
          cost = getProductCostAvailability(calculatorProduct,age,gender,smokerStatus,updatedFaceValue,updatedTerms);
          calc[calculatorProduct.id] = cost;
          if(cost.annual == 0) hiddenIds.push(calculatorProduct.id);

          // Check the coverage limits
          console.log("======="+product.nickname+"========");
          face = updatedFaceValue/1000;
          console.log("faceValue: "+face);
          console.log("coverage Limits");
          console.log(CoverageLimits[product.nickname]);
          const cMin = CoverageLimits[product.nickname].min
          const cMax = CoverageLimits[product.nickname].max
          ages = CoverageLimits[product.nickname]
          // delete ages.min, delete ages.max
          console.log("cMin: "+cMin);
          console.log("cMax: "+cMax);
          console.log("ages: ");
          console.log(ages);

          if(cMin != null && cMax != null){
            if(face<cMin){
              hiddenIds.push(calculatorProduct.id)
              notices.push(calculatorProduct.name+" does not support coverage of less than "+cMin+"k")
            }
            if(face>cMax){
              hiddenIds.push(calculatorProduct.id)
              notices.push(calculatorProduct.name+" does not support coverage of more than "+cMax+"k")
            }
          }


        })
      })
    })

    console.log("=== Hidden Calculator Products ===");
    console.log(_.sortedUniq(hiddenIds));

    console.log("=== Hidden Calculator Notices ===");
    console.log(notices);

    console.log("=== CALCULATOR OUTPUT ===");
    console.log(calc);

    this.setState({calculator: calc});
    this.setState({calculatorHiddenProducts: _.sortedUniq(hiddenIds)},console.log("hidden IDs state set"));

    this.updateProviders()
    return 1
  }
  renderCalculatorProduct = (provider, product, calculatorProduct) => {
    console.log("=== renderCalculatorProduct() ===");
    console.log(provider);
    console.log(product);
    console.log(calculatorProduct);
    console.log(this.state.calculatorHiddenProducts);

    function renderStarRating(productId){
      const ratings = {200:4,201:5,202:4,203:5,2021:3,2031:4,2041:3};
      const rating = productId in ratings ? ratings[productId] : _.random(2,5);
      return (<Text style={{color: '#b0b10d'}}>{_.repeat('★',rating)}{"\n"} {rating} stars </Text>)
    }

    // Hide products from the hide array
    console.log('index check:')
    console.log(_.indexOf(this.state.calculatorHiddenProducts,calculatorProduct.id))

    if(_.indexOf(this.state.calculatorHiddenProducts,calculatorProduct.id)!=-1) return false
    if(this.state.calculator[calculatorProduct.id].annual===0) return false;

    return (
      <View style={styles.calculatorCompanyWrap} key={calculatorProduct.id}>
        <View style={styles.calculatorProductWrap}>
          <Image source={logos[provider.id]} style={styles.calculatorLogo}/>
          <View style={styles.calculatorProductPeriodCostWrapProduct}>
            <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${number_format(this.state.calculator[calculatorProduct.id].month,2)}
              </Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${number_format(this.state.calculator[calculatorProduct.id].annual,2)}
              </Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            {/*<Hyperlink linkDefault={true} linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }>*/}
              {/*<Text>Americo</Text>*/}
            {/*</Hyperlink>*/}
            {renderStarRating(calculatorProduct.id)}
          </View>
        </View>
      </View>
    )
  }
  renderCalculator = () => {

    // console.log(" --- RENDER CALCULATOR ---");

    //let Providers = Calculator.providers;
    this.inputRefs = {};
    self = this;
    renderCalculatorProduct = this.renderCalculatorProduct;
    let productsRender = [];
    LayoutAnimation.configureNext(CustomLayoutLinear);

    return (
       <View style={[styles.calculator,{top: 22}]}>
         <View style={{ position:'absolute', top: 20, left: 20, zIndex:999 }}>
           <TouchableHighlight onPress={()=>{this.setState({calculatorVisible: false})}}>
             <Text style={{fontSize:16}}><Text style={{fontWeight:'900'}}>&lsaquo;</Text> Questions</Text>
           </TouchableHighlight>
         </View>
         {/*<Text style={{fontSize: 20}}>Coverage Options for {this.state.clientInfo.firstName}</Text>*/}
         <View style={styles.calculatorHeader}>

           {/* FACE VALUE SELECT */}
           <View style={styles.calculatorFaceValueWrap}>
             <Text>Face Value</Text>
             {/*<TextInput style={styles.calculatorFaceValue} placeholder="10, 15, 20, or 30"/>*/}

             <View style={styles.calculatorTermDropDown}>
               <RNPickerSelect
                 // placeholder={{
                 //   label: 'Select...',
                 //   value: null,
                 // }}
                 items={[{"label":"1,000","value":"1,000"},{"label":"2,000","value":"2,000"},{"label":"3,000","value":"3,000"},{"label":"4,000","value":"4,000"},{"label":"5,000","value":"5,000"},{"label":"6,000","value":"6,000"},{"label":"7,000","value":"7,000"},{"label":"8,000","value":"8,000"},{"label":"9,000","value":"9,000"},{"label":"10,000","value":"10,000"},{"label":"15,000","value":"15,000"},{"label":"20,000","value":"20,000"},{"label":"25,000","value":"25,000"},{"label":"30,000","value":"30,000"},{"label":"35,000","value":"35,000"},{"label":"40,000","value":"40,000"},{"label":"45,000","value":"45,000"},{"label":"50,000","value":"50,000"},{"label":"55,000","value":"55,000"},{"label":"60,000","value":"60,000"},{"label":"65,000","value":"65,000"},{"label":"70,000","value":"70,000"},{"label":"75,000","value":"75,000"},{"label":"80,000","value":"80,000"},{"label":"85,000","value":"85,000"},{"label":"90,000","value":"90,000"},{"label":"95,000","value":"95,000"},{"label":"100,000","value":"100,000"},{"label":"110,000","value":"110,000"},{"label":"120,000","value":"120,000"},{"label":"130,000","value":"130,000"},{"label":"140,000","value":"140,000"},{"label":"150,000","value":"150,000"},{"label":"160,000","value":"160,000"},{"label":"170,000","value":"170,000"},{"label":"180,000","value":"180,000"},{"label":"190,000","value":"190,000"},{"label":"200,000","value":"200,000"},{"label":"210,000","value":"210,000"},{"label":"220,000","value":"220,000"},{"label":"230,000","value":"230,000"},{"label":"240,000","value":"240,000"},{"label":"250,000","value":"250,000"},{"label":"300,000","value":"300,000"},{"label":"350,000","value":"350,000"},{"label":"400,000","value":"400,000"},{"label":"450,000","value":"450,000"},{"label":"500,000","value":"500,000"},{"label":"550,000","value":"550,000"},{"label":"600,000","value":"600,000"},{"label":"650,000","value":"650,000"},{"label":"700,000","value":"700,000"},{"label":"750,000","value":"750,000"},{"label":"800,000","value":"800,000"},{"label":"850,000","value":"850,000"},{"label":"900,000","value":"900,000"},{"label":"950,000","value":"950,000"},{"label":"1,000,000","value":"1,000,000"},{"label":"1,100,000","value":"1,100,000"},{"label":"1,200,000","value":"1,200,000"},{"label":"1,300,000","value":"1,300,000"},{"label":"1,400,000","value":"1,400,000"},{"label":"1,500,000","value":"1,500,000"},{"label":"1,600,000","value":"1,600,000"},{"label":"1,700,000","value":"1,700,000"},{"label":"1,800,000","value":"1,800,000"},{"label":"1,900,000","value":"1,900,000"},{"label":"2,000,000","value":"2,000,000"},{"label":"2,250,000","value":"2,250,000"},{"label":"2,500,000","value":"2,500,000"},{"label":"2,750,000","value":"2,750,000"},{"label":"3,000,000","value":"3,000,000"},{"label":"3,250,000","value":"3,250,000"},{"label":"3,500,000","value":"3,500,000"},{"label":"3,750,000","value":"3,750,000"},{"label":"4,000,000","value":"4,000,000"},{"label":"4,250,000","value":"4,250,000"},{"label":"4,500,000","value":"4,500,000"},{"label":"4,750,000","value":"4,750,000"},{"label":"5,000,000","value":"5,000,000"},{"label":"5,500,000","value":"5,500,000"},{"label":"6,000,000","value":"6,000,000"},{"label":"6,500,000","value":"6,500,000"},{"label":"7,000,000","value":"7,000,000"},{"label":"7,500,000","value":"7,500,000"},{"label":"8,000,000","value":"8,000,000"},{"label":"8,500,000","value":"8,500,000"},{"label":"9,000,000","value":"9,000,000"},{"label":"9,500,000","value":"9,500,000"},{"label":"10,000,000","value":"10,000,000"},{"label":"11,000,000","value":"11,000,000"},{"label":"12,000,000","value":"12,000,000"},{"label":"13,000,000","value":"13,000,000"},{"label":"14,000,000","value":"14,000,000"},{"label":"15,000,000","value":"15,000,000"},{"label":"16,000,000","value":"16,000,000"},{"label":"17,000,000","value":"17,000,000"},{"label":"18,000,000","value":"18,000,000"},{"label":"19,000,000","value":"19,000,000"},{"label":"20,000,000","value":"20,000,000"}]}
                 onValueChange={(value) => {
                   this.setState({ calculatorFaceValue: value });
                   this.updateCalculatorValues(value,null);
                 }}
                 onUpArrow={() => {
                   this.inputRefs.name.focus();
                 }}
                 onDownArrow={() => {
                   this.inputRefs.picker2.togglePicker();
                 }}
                 style={{icon: {marginTop:-16, marginRight:-8}}}
                 value={this.state.calculatorFaceValue}
                 ref="faceValues"
               />
             </View>

           </View>

         {/* TERMS SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Term</Text>
            {/*<TextInput style={styles.calculatorFaceValue} placeholder="10, 15, 20, or 30"/>*/}

            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                // placeholder={{
                //   label: 'Select...',
                //   value: null,
                // }}
                items={[
                  {label:'5',value:'5'},
                  {label:'10',value:'10'},
                  {label:'15',value:'15'},
                  {label:'20',value:'20'},
                  {label:'25',value:'25'},
                  {label:'30',value:'30'}
                ]}
                onValueChange={(value) => {
                  this.setState({ calculatorTerms: value });
                  this.updateCalculatorValues(null,value);
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker3.togglePicker();
                }}
                style={{icon: {marginTop:-16, marginRight:-8}}}
                value={this.state.calculatorTerms}
                ref="terms"
              />
            </View>

          </View>

         {/* AGE SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Age</Text>
            {/*<TextInput style={styles.calculatorFaceValue} placeholder="10, 15, 20, or 30"/>*/}

            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                // placeholder={{
                //   label: 'Select...',
                //   value: null,
                // }}
                items={[{"label":"0","value":"0"},{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"},{"label":"4","value":"4"},{"label":"5","value":"5"},{"label":"6","value":"6"},{"label":"7","value":"7"},{"label":"8","value":"8"},{"label":"9","value":"9"},{"label":"10","value":"10"},{"label":"11","value":"11"},{"label":"12","value":"12"},{"label":"13","value":"13"},{"label":"14","value":"14"},{"label":"15","value":"15"},{"label":"16","value":"16"},{"label":"17","value":"17"},{"label":"18","value":"18"},{"label":"19","value":"19"},{"label":"20","value":"20"},{"label":"21","value":"21"},{"label":"22","value":"22"},{"label":"23","value":"23"},{"label":"24","value":"24"},{"label":"25","value":"25"},{"label":"26","value":"26"},{"label":"27","value":"27"},{"label":"28","value":"28"},{"label":"29","value":"29"},{"label":"30","value":"30"},{"label":"31","value":"31"},{"label":"32","value":"32"},{"label":"33","value":"33"},{"label":"34","value":"34"},{"label":"35","value":"35"},{"label":"36","value":"36"},{"label":"37","value":"37"},{"label":"38","value":"38"},{"label":"39","value":"39"},{"label":"40","value":"40"},{"label":"41","value":"41"},{"label":"42","value":"42"},{"label":"43","value":"43"},{"label":"44","value":"44"},{"label":"45","value":"45"},{"label":"46","value":"46"},{"label":"47","value":"47"},{"label":"48","value":"48"},{"label":"49","value":"49"},{"label":"50","value":"50"},{"label":"51","value":"51"},{"label":"52","value":"52"},{"label":"53","value":"53"},{"label":"54","value":"54"},{"label":"55","value":"55"},{"label":"56","value":"56"},{"label":"57","value":"57"},{"label":"58","value":"58"},{"label":"59","value":"59"},{"label":"60","value":"60"},{"label":"61","value":"61"},{"label":"62","value":"62"},{"label":"63","value":"63"},{"label":"64","value":"64"},{"label":"65","value":"65"},{"label":"66","value":"66"},{"label":"67","value":"67"},{"label":"68","value":"68"},{"label":"69","value":"69"},{"label":"70","value":"70"},{"label":"71","value":"71"},{"label":"72","value":"72"},{"label":"73","value":"73"},{"label":"74","value":"74"},{"label":"75","value":"75"},{"label":"76","value":"76"},{"label":"77","value":"77"},{"label":"78","value":"78"},{"label":"79","value":"79"},{"label":"80","value":"80"},{"label":"81","value":"81"},{"label":"82","value":"82"},{"label":"83","value":"83"},{"label":"84","value":"84"},{"label":"85","value":"85"},{"label":"86","value":"86"},{"label":"87","value":"87"},{"label":"88","value":"88"},{"label":"89","value":"89"},{"label":"90","value":"90"},{"label":"91","value":"91"},{"label":"92","value":"92"},{"label":"93","value":"93"},{"label":"94","value":"94"},{"label":"95","value":"95"},{"label":"96","value":"96"},{"label":"97","value":"97"},{"label":"98","value":"98"},{"label":"99","value":"99"},{"label":"100","value":"100"},{"label":"101","value":"101"},{"label":"102","value":"102"},{"label":"103","value":"103"},{"label":"104","value":"104"},{"label":"105","value":"105"},{"label":"106","value":"106"},{"label":"107","value":"107"},{"label":"108","value":"108"},{"label":"109","value":"109"},{"label":"110","value":"110"},{"label":"111","value":"111"},{"label":"112","value":"112"},{"label":"113","value":"113"},{"label":"114","value":"114"},{"label":"115","value":"115"},{"label":"116","value":"116"},{"label":"117","value":"117"},{"label":"118","value":"118"},{"label":"119","value":"119"},{"label":"120","value":"120"}]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.age = parseInt(value);
                  this.setState({ clientInfo: clientInfo });
                  this.updateCalculatorValues(null,null);
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker4.togglePicker();
                }}
                style={{icon: {marginTop:-16, marginRight:-8}}}
                value={_.toString(this.state.clientInfo.age)}
                ref="ages"
              />
            </View>

          </View>


         </View>

         <View style={styles.calculatorProductsCounter}>
           <Text>
             Showing
             <Text style={styles.calculatorProductsCounterHighlight}> {Object.keys(this.state.calculator).length - this.state.calculatorHiddenProducts.length} </Text>
             eligible of
             <Text style={styles.calculatorProductsCounterHighlight}> {Object.keys(this.state.calculator).length} </Text>
             products:
           </Text>
         </View>


         <ScrollView style={styles.calculatorContentScrollView}>


           {Providers.map(function(provider){
             provider.products.map(function(product){
               product.calculator.products.map(function(calculatorProduct){
                 productsRender.push(renderCalculatorProduct(provider,product,calculatorProduct));
                 // console.log("--- Rendering ---");
               })
             })
           })}

           {productsRender}

           <Text>&nbsp;</Text>

        </ScrollView>
         {this.renderProviderStatus(Providers)}
      </View>
    )
  };
  renderExport = () => {
    buttons = this.state.buttons;
    medButtons = _.filter(buttons,function(b){return b.category==='MED'});
    conButtons = _.filter(buttons,function(b){return b.category==='CON'});
    return (
      <View style={styles.exportView}>
        <View style={{ position:'absolute', top: 5, left: 20, zIndex:999 }}>
          <TouchableHighlight onPress={()=>{this.setState({exportVisible: false})}}>
            <Text style={{fontSize:16}}><Text style={styles.backButton}>&lsaquo;</Text> Questions</Text>
          </TouchableHighlight>
        </View>
        <Text style={{marginBottom: 20, fontSize: 20}}>Underwriting Info Export</Text>
        <View style={styles.exportContentWrap}>
          {_.filter(this.state.buttons,function(b){return b.category!='MED' && b.category!='CON'}).map(b => (
            <View style={styles.exportLineItemWrap} key={b.id}>
              <Text style={styles.exportLineItemHeader}>{b.title}</Text>
              <Text style={styles.exportLineItem}>{b.subtitle}</Text>
            </View>
          ))}
          <View style={styles.exportLineItemWrap} key="10001">
            <Text style={styles.exportLineItemHeader}>Medications</Text>
            {medButtons.map(b => ( <Text key={b.id} style={styles.exportLineItem}>{b.title}, </Text> ))}
          </View>
          <View style={styles.exportLineItemWrap} key="10002">
            <Text style={styles.exportLineItemHeader}>Conditions</Text>
            {conButtons.length && conButtons.map(b => ( <Text key={b.id} style={styles.exportLineItem}>{b.title}, </Text> ))}
          </View>

        </View>
      </View>
    )
  }
  toggleMenu = () => {
    vis = this.state.menuVisible
    if(!vis) this.setState({menuVisible: true, modalMaskVisible: true})
    Animated.timing(this.state.menuPosition, {
      toValue: vis ? -250 : -50,
      easing: Easing.back(),
      duration: 200,
    }).start(()=>{
      this.setState({menuVisible: !vis, modalMaskVisible: !vis})
    })

  }
  renderLoginHeader = () => {
    return (
      <View style={styles.headerTopRight}>
        <View style={styles.loginRegisterLinks}>
          <Button title="☰" style={[styles.signOutLink,{marginRight: 20}]} onPress={()=>{this.toggleMenu()}} color="#ffb601"/>
        </View>
      </View>
    )
  }
  // renderLoginHeader = () => {
  //   if(this.state.loading) {
  //     return (
  //       <View style={styles.headerTopRight}>
  //         <View><Text style={styles.loggedInUserName}>Updating...</Text></View>
  //       </View>
  //     )
  //   } else {
  //     let user = firebase.auth().currentUser;
  //     if(user === null){
  //       return (
  //         <View style={styles.headerTopRight}>
  //           <View style={styles.loginRegisterLinks}>
  //             <Button title="Register" style={[styles.signOutLink,{marginRight: 20}]} onPress={()=>{this.setState({registerVisible: true, loginVisible: false})}} color="#ffb601"/>
  //             <Button title="Sign In" style={[styles.signOutLink,{marginRight: 20}]} onPress={()=>{this.setState({registerVisible: false, loginVisible: true})}} color="#ffb601"/>
  //           </View>
  //         </View>
  //       )
  //     } else {
  //       return (
  //         <View style={styles.headerTopRight}>
  //           <View style={styles.loginRegisterLinks}>
  //             <Button title="☰" style={[styles.signOutLink,{marginRight: 20}]} onPress={()=>{firebase.auth().signOut()}} color="#ffb601"/>
  //           </View>
  //         </View>
  //       )
  //     }
  //   }
  // }
  setFormError = (code,message) => {
    this.setState({formError: code, formErrorNotice: message},console.log(this.state.formErrorNotice));
  }
  clearFormError = () => {
    this.setState({formErrorNotice: '', formError: false});
  }
  onLogin = () => {
    this.clearFormError();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;
    // const phone = this.state.registerPhone;
    if(email==''||email==null) {this.setFormError(1,'Please enter your email.'); return false}
    if(password==''||password==null) {this.setFormError(1,'Please enter your password.'); return false}
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.setState({user: user},console.log(this.state.user));
        console.log(this.state.user);
        this.setState({loginVisible: false});
        console.log("SUCCESSFUL LOGIN");
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(message);
        this.setFormError(code,message);
      });
  }
  charge=()=>{
    console.log("running charge()")
    console.log(this.state.registerCC)
    cc = this.state.registerCC.values
    m = cc.expiry.split('/')
  }
  onRegister = () => {
    this.clearFormError();
    this.setState({formErrorNotice: "Processing. Please wait..."})
    let ccNoticeField = false;

    const email =                   this.state.registerEmail
    const password =                this.state.registerPassword
    const confirmPassword =         this.state.registerConfirmPassword
    const fullName =                this.state.registerFullName
    if(fullName != null) {
      const {firstName,lastName} =  fullName.toString().trim().split(' ')
    }
    const planId =                  this.state.registerPlanID
    const cc =                      this.state.registerCC

    if(fullName==''|| fullName==null)   {this.setFormError(1,'A full name is required to register.'); return false}
    if(email==''||    email==null)      {this.setFormError(1,'An email is required to register.');    return false}
    if(password==''|| password==null)   {this.setFormError(1,'A password is required to register.');  return false}
    if(password!==    confirmPassword)  {this.setFormError(1,'Your passwords do not match.');         return false}
    if(!cc.valid)                       {this.setFormError(9,"Please confirm you card numbers.");     return false}

    const client = new StripeToken(STRIPE_API_KEY)
    let card_error = false
    date = cc.values.expiry.split('/')
    console.log(cc)
    console.log(cc.values.number)
    client.createToken({number:cc.values.number, exp_month: date[0], exp_year: date[1], cvc: cc.values.cvc})
      .then(token=>{
        console.log("token:")
        console.log(token)
        if(token.error){
          console.log("STRIPE ERROR: CREATE TOKEN FAILED ****************")
          this.setFormError('1009',token.error.message);
          card_error = true
        }
        const customer = Stripe.createCustomer(token.id, email)
          .then(customer=>{
            if(customer.error){
              console.log("STRIPE ERROR: CREATE CUSTOMER FAILED ****************")
              if(!card_error) this.setFormError('1008',customer.error.message);
              card_error = true
            }
            console.log("customer:")
            console.log(customer)
            Stripe.subscribe(customer.id,planId)
              .then(subscribe=>{
                console.log("subscription:")
                console.log(subscribe)
                if(subscribe.error){
                  console.log("STRIPE ERROR: SUBSCRIBE FAILED ****************")
                  if(!card_error) this.setFormError('1008',subscribe.error.message);
                  card_error = true
                }
                if(!card_error){
                  firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {

                      this.setState({user: user},console.log(this.state.user))
                      let verifyEmail = firebase.auth().currentUser.sendEmailVerification()
                      this.setState({registerVisible: false},()=>this.setState({loginVisible: true}))
                      console.log("creating user with email and password...")
                      u = firebase.auth().currentUser;
                      this.setUser(u.uid,fullName,email,null);
                    })
                    .catch((error) => {
                      console.log("FIREBASE ERROR: COULD NOT CREATE AN ACCOUNT ****************")
                      const { code, message } = error;
                      this.setFormError(code,message);
                    });
                } else {
                  console.log("========= CARD ERROR ===========")
                }

              })
              .catch(err=>{
                console.log("STRIPE ERROR: SUBSCRIBE FAILED ****************");
                card_error = true
                console.log(err)
              })
          })
          .catch(err=>{
            console.log("STRIPE ERROR: CREATE CUSTOMER FAILED ****************");
            card_error = true
            console.log(err)
          })
      })
      .catch(err=>{
        console.log("STRIPE ERROR: CREATE TOKEN FAILED ****************");
        this.setFormError('1009',error.message);
        card_error = true
        console.log(err)
      })

  }
  registerPhone = () => {
    firebase.auth().signInWithPhoneNumber(phone).then((res) => {
      console.log("phone confirmation result object:"); console.log(res);
      this.setState({registerPhoneResult: res});
    }).catch((err)=>{
      this.setFormError(err.code, err.message);
    })
  }
  registerModal = () => {
    return(
      <KeyboardAvoidingView style={styles.modalWrap}>
        <View style={styles.modal}>
          {/*<TouchableHighlight onPress={()=>{this.setState({registerVisible: false})}}>*/}
            {/*<Text style={{fontSize:16,marginBottom:13}}><Text style={{fontWeight:'900'}}>&nbsp;</Text> &nbsp;</Text>*/}
          {/*</TouchableHighlight>*/}
          <View style={{position: 'absolute',right: 15, top: 15}}>
            <TouchableHighlight onPress={()=>{this.setState({registerVisible: false, loginVisible: true})}}>
              <Text style={{fontSize:16,marginBottom:13}}>Log In <Text style={{fontWeight:'900'}}>&rsaquo;</Text></Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.modalHeading}>Register New Account</Text>
          {/*<Text style={{marginBottom: 10}}>Please enter your account info:</Text>*/}
          <TextInput
            ref="registerFullName"
            placeholder="First & Last Name"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({registerFullName: v})}
            value={this.state.registerFullName}
            autoCapitalize='words'
          />
          <TextInput
            ref="registerEmail"
            placeholder="Email"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({registerEmail: v})}fLoginz
            value={this.state.registerEmail}
            autoCapitalize='none'
          />
          <TextInput
            ref="registerPassword"
            placeholder="Password"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({registerPassword: v})}
            value={this.state.registerPassword}
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <TextInput
            ref="registerPasswor2"
            placeholder="Confirm Password"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({registerConfirmPassword: v})}
            value={this.state.registerConfirmPassword}
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <Text style={{marginBottom: 10, marginTop: 15}}>Select a plan:</Text>
          <RNPickerSelect
            items={[
              {label:'Monthly – $89 – 7 Day Trial',value:'plan_D2F3s5CVgtPEkC'},
              {label:'6 Months – $400 – 15 Day Trial',value:'plan_D2F7qblyYSuea2'},
              {label:'Annual – $530 – 30 Day Trial',value:'plan_D2F9m6oyVdqmGD'},
            ]}
            onValueChange={(value) => {this.setState({registerPlanID:value})}}
            onUpArrow={() => { this.inputRefs.name.focus(); }}
            onDownArrow={() => {
              this.inputRefs.picker4.togglePicker();
            }}
            style={{icon: {marginTop:-16, marginRight:0 }, inputIOS: {fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#c8cffd', paddingBottom: 7,marginBottom: 3 }}}
            value={this.state.registerPlanID}
            ref="terms"
          />
          <LiteCreditCardInput onChange={(cc)=>{this.setState({registerCC: cc})}} />
          <Text style={{marginTop: 10}}>Please provide a credit or debit card for the plan.</Text>
          {/*<Text style={{marginBottom: 10}}>The first payment is charged after your trial.</Text>*/}

          <Text style={styles.formErrorMessage}>
            {this.state.formErrorNotice && this.state.formErrorNotice}
          </Text>
          <View style={styles.modalSubmit}>
            <Button
              title="Submit"
              onPress={()=>{this.onRegister();console.log(this.state.registerErr)}}
            />

          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  loginModal = () => {
    return(
      <View style={styles.modalWrap}>
        <View style={styles.modal}>
          {/*<View style={{position: 'absolute',right: 15, top: 15}}>*/}
            {/*<TouchableHighlight onPress={()=>{this.setState({registerVisible: true, loginVisible: false})}}>*/}
              {/*<Text style={{fontSize:16,marginBottom:13}}>Register <Text style={{fontWeight:'900'}}>&rsaquo;</Text></Text>*/}
            {/*</TouchableHighlight>*/}
          {/*</View>*/}
          <TouchableHighlight onPress={()=>{this.setState({registerVisible: true, loginVisible: false})}} style={{width: 100}}>
            <Text style={{fontSize:16,marginBottom:13}}><Text style={{fontWeight:'900'}}>&lsaquo;</Text> Register</Text>
          </TouchableHighlight>
          <Text style={styles.modalHeading}>Sign In</Text>
          <Text style={{marginBottom: 10}}>Please enter your account credentials:</Text>
          <TextInput
            ref="loginEmail"
            placeholder="Email"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({loginEmail: v})}
            value={this.state.loginEmail}
            autoCapitalize='none'
          />
          {/*<TextInput*/}
            {/*ref="registerPhone"*/}
            {/*placeholder="Phone Number"*/}
            {/*style={styles.modalInput}*/}
            {/*onChangeText={(v)=>this.setState({registerPhone: v})}*/}
            {/*value={this.state.registerPhone}*/}
          {/*/>*/}
          <TextInput
            ref="loginPassword"
            placeholder="Password"
            style={styles.modalInput}
            onChangeText={(v)=>this.setState({loginPassword: v})}
            value={this.state.loginPassword}
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <Text style={styles.formErrorMessage}>
            {this.state.formErrorNotice && this.state.formErrorNotice}
          </Text>

          <View style={styles.modalSubmit}>
            <Button
              title="Sign In"
              onPress={()=>{this.onLogin();console.log(this.state.registerErr)}}
              // disabled={(this.state.formError !== false)}
            />
            <Button
              title="Reset Password"
              onPress={()=>{this.setState()}}
              // disabled={(this.state.formError !== false)}
            />

          </View>
        </View>
      </View>
    );
  }
  pressMenuSaveNewClient=()=>{this.saveAndClear(); this.toggleMenu()}
  pressMenuScanLicense=()=>{this.scan.bind(this)(); this.toggleMenu()}
  pressMenuExportPDF=()=>{this.setState({exportVisible: true}); this.toggleMenu()}
  pressMenuLogOut=()=>{firebase.auth().signOut(); this.toggleMenu(); this.setState({modalMaskVisible: true})}
  pressMenuSupport=()=>{this.toggleMenu(); this.setState({modalMaskVisible: true, supportVisible: true})}
  menuModal = () => {
    self=this
    var menuItems = [
      {title: 'Save & New Client',callback: this.pressMenuSaveNewClient },
      {title: 'Scan Driver\'s License',callback: this.pressMenuScanLicense },
      {title: 'Export PDF',callback: this.pressMenuExportPDF },
      {title: 'Support',callback: this.pressMenuSupport },
      {title: 'Log Out',callback: this.pressMenuLogOut },
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
        paddingTop: 20,
        height: '100%',
        zIndex: 101,
        borderWidth: 1,
        borderLeftColor: '#7680a1',
        shadowOffset:{  width: -20,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        opacity: 0.95
      }}>
        <TouchableHighlight style={styles.menuCloseIcon} onPress={this.toggleMenu}>
          <Text style={{fontSize:30,fontWeight:'100',color: '#979797'}}>&rsaquo;</Text>
        </TouchableHighlight>
        <Text style={styles.menuLogo}>insura</Text>
        <View style={styles.menuItemWrap}>
          {menuItems.map(function (m,i) {
            return (<TouchableHighlight key={i} onPress={()=>{self.toggleMenu; m.callback()}}><Text style={styles.menuItem}>{m.title.toUpperCase()}</Text></TouchableHighlight>)
          })}
        </View>
      </Animated.View>
    )
  }
  sendSupportMessage = () => {
    console.log("sendSupportMessage Called =======")
    console.log(this.state.supportInput)
    this.saveSupportMessage(this.state.supportInput)
  }
  supportModal = () => {
    return (
      <View style={styles.supportModal}>
        <ScrollView style={styles.supportMessagesWrap}>
          {this.state.supportMessages.length && this.state.supportMessages.map(m=>{
            <Text>{m.content}</Text>
          })}
        </ScrollView>
        <TextInput
          value={this.state.supportInput}
          placeholder={"test"}
          // multiline
          blurOnSubmit
          onChangeText={(text)=>this.setState({supportInput:text})}
          onSubmitEditing={()=>this.sendSupportMessage()}
          style={styles.supportMessageInput}
        />
      </View>
    )
  }
  renderModalMask = () => {
    return (
      <TouchableHighlight style={styles.modalMask} onPress={()=>{this.toggleMenu()}}>
        <View>&nbsp;</View>
      </TouchableHighlight>
    )
  }
  renderMasterInputNotice=()=>{
    return (
      <View style={styles.masterInputNoticeWrap}>
        <Text style={styles.masterInputNoticeText}>{_.upperCase(this.state.masterInputNotice)}</Text>
      </View>
    )
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.masterWrap}>

        {/* Modal Mask */}
        {this.state.modalMaskVisible ? this.renderModalMask() : null}

        {/* Export */}
        {this.state.exportVisible ? this.renderExport() : null}

        {/* CALCULATOR */}
        {this.state.calculatorVisible ? this.renderCalculator() : null}

        {/* REGISTER */}
        {this.state.registerVisible ? this.registerModal() : null}

        {/* LOGIN */}
        {this.state.loginVisible ? this.loginModal() : null}

        {/* MENU */}
        {this.state.menuVisible ? this.menuModal() : null}

        {/* SUPPORT */}
        {this.state.supportVisible ? this.supportModal() : null}

        <View style={styles.paddingWrap}>

          {/* CONSOLE */}
          <ScrollView style={styles.console}>
            <Text>{this.state.consoleContent}</Text>
          </ScrollView>

          {/* HEADER */}
          <View style={styles.header}>
            {this.renderLoginHeader()}
          </View>

          {/* QUESTION */}
          <View style={styles.masterQuestionWrap}>
            <View style={styles.innerQuestionWraps}>
              <Text style={styles.masterQuestion}>{Questions[this.state.activeQuestionId].text}</Text>
            </View>
            <TextInput
              ref="answer"
              autoFocus={true}
              spellCheck={false}
              autoCorrect={false}
              blurOnSubmit={false}
              autoComplete="off"
              autoCapitalize="none"
              value={typeof this.state.questionAnswer === undefined ? '' : this.state.questionAnswer.toString()}
              style={styles.masterInput}
              placeholder={"  "+Questions[this.state.activeQuestionId].placeholder}
              placeholderTextColor='#5e6579'
              selectionColor="white"
              onChangeText={(text)=> this.watchAnswer(text)}
              onSubmitEditing={(event) => {
                if(Questions[this.state.activeQuestionId].submitByReturn){
                  this.nextQuestion();
                  this.refs.answer.focus();
                }
              }}
            />
            {this.state.answerButtonsVisible ? this.renderAnswerButtons(Questions[this.state.activeQuestionId].answerOptions||[]) : null}
            {this.state.autoSuggestVisible ? this.renderOptions() : null}
            {this.state.masterInputNotice ? this.renderMasterInputNotice() : null}
            <View style={styles.questionLinksWrap}>
              <Button title="Prev" color="#ffb601" onPress={()=>this.prevQuestion()}><Text>Prev</Text></Button>
              <Button title="Next" color="#ffb601" onPress={()=>this.nextQuestion()}><Text>Next</Text></Button>
              <Text style={{color: '#b6b8be', marginTop: 11, marginLeft: 13}}>{this.state.questionCounter} of {Questions.length}</Text>
              {this.renderIdScanButton()}
            </View>
            {this.renderButtons(this.state.buttons)}
          </View>
          <View style={styles.footer}>
            {this.renderProviderStatus(this.state.Providers)}
          </View>
        </View>
        <Image source={logos[0]} style={styles.backgroundLogo}/>
      </View>
    );
  }

  renderAnswerButtons = (options) => {
    if(options.length > 0) {
      return (
        <View style={styles.answerButtonsWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' horizontal={true}>
            {options.map(option => (
              <TouchableHighlight onPress={() => this.clickAnswer(option)}  key={(option.id)} underlayColor="#FFF">
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
    }
  };
  prepareSavedState = (s) => {
    s.menuPosition = null
    return s
  }
  saveAndClear = () => {
    c = this.state.clientInfo
    this.saveClient(
      firebase.auth().currentUser.uid,
      _.replace(c.name+"--".trim(),/ /g,'')+_.replace(c.dob,/[^0-9]/g,''),
      c
    );
    // this.setState({menuPosition: null});
    this.setState({buttons: []},()=>{});
    this.setState({activeQuestionId: 0});
    this.setState({questionCounter: 1});
    this.updateProviders(true);
    console.log("saveAndClear()");
    console.log(this.state);
  };
  renderIdScanButton() {
    return (
      <View style={styles.idScanButtonContainer}>
        {/*<Button onPress={()=>{this.setState({exportVisible: true})}} title="Export" color="#d2d2d4"/>*/}
        <Button onPress={this.scan.bind(this)} title="Scan DL" color="#d2d2d4"/>
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
            // USDLKeys are keys from keys/usdl_keys.js

              let clientInfo = {...this.state.clientInfo};

              clientInfo.firstName = fields[USDLKeys.CustomerFirstName];
              clientInfo.middleName = fields[USDLKeys.CustomerMiddleName];
              clientInfo.lastName = fields[USDLKeys.CustomerFamilyName];
              clientInfo.name = _.startCase(_.toLower(clientInfo.firstName +" "+ clientInfo.middleName +" "+ clientInfo.lastName));

              let m = /(.{2})(.{2})(.{4})/.exec(fields[USDLKeys.DateOfBirth]);
              clientInfo.dob = m[1]+"/"+m[2]+"/"+m[3];

              clientInfo.height = Math.floor(parseInt(fields[USDLKeys.HeightIn]) / 12) +"-"+ parseInt(fields[USDLKeys.HeightIn]) %12;
              clientInfo.weight = fields[USDLKeys.WeightPounds];
              clientInfo.street1 = fields[USDLKeys.AddressStreet];
              clientInfo.city = fields[USDLKeys.AddressCity];
              clientInfo.state = fields[USDLKeys.AddressJurisdictionCode];
              clientInfo.zip = fields[USDLKeys.AddressPostalCode];
              clientInfo.race = fields[USDLKeys.RaceEthnicity];
              clientInfo.ssn = fields[USDLKeys.SocialSecurityNumber];
              this.setState({clientInfo});

              this.updateButtonsFromScan(clientInfo);

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
        this.setState({ BlinkShowImage: scanningResult.resultImageCropped, BlinkResultImage: 'data:image/jpg;base64,' + scanningResult.resultImageCropped, BlinkResults: resultsFormattedText});
      }
    } catch(error) {
      this.setState({ BlinkShowImage: false, BlinkResultImage: '', BlinkResults: error.message});
    }
  }
  setUser=(id,name,email,card)=>{
    console.log("setUser()")
    console.log(u)
    res = firebase.database().ref('users/'+id).set({
      id: id,
      name: name,
      email: email,
      stripe_customer_id: 'null',
      stripe_token_id: 'null',
      activeSubscription: true
    })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }
  saveClient=(userId,clientId,state)=>{
    console.log("saveClient()")
    console.log(userId)
    console.log(clientId)
    console.log(state)
    state.user = null
    state.autoSuggestOptions = null
    res = firebase.database().ref('clients/'+clientId).set({
      userId: userId,
      clientId: clientId,
      state: state,
    })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }
  saveSupportMessage=(message)=>{
    t = (new Date).getTime()
    ref = firebase.database().ref('support/'+firebase.auth().currentUser.uid)
    msgRef = ref.push()
    console.log("new msg ref key")
    console.log(msgRef.key)
    msgRef.setWithPriority({
      time: t,
      content: message
    },-t).done(
      this.setState({supportInput: ''})
    )
  }
  getSupportMessages=()=>{
    self=this
    messagesRef = firebase.database().ref('support/'+firebase.auth().currentUser.uid)
    messagesRef.on('value',function(snap) {
      messages = self.state.supportMessages
      messages.push(snap.val())
      self.setState({supportMessages: messages},console.log(supportMessages))
    })
  }

}

Number.prototype.toCurrencyString = function(prefix, suffix) {
  if (typeof prefix === 'undefined') { prefix = '$'; }
  if (typeof suffix === 'undefined') { suffix = ''; }
  var _localeBug = new RegExp((1).toLocaleString().replace(/^1/, '').replace(/\./, '\\.') + "$");
  return prefix + (~~this).toLocaleString().replace(_localeBug, '') + (this % 1).toFixed(2).toLocaleString().replace(/^[+-]?0+/,'') + suffix;
}

function number_format(number, decimals, dec_point, thousands_sep) {

  number = parseFloat(number.toString().replace(/[^0-9\.]/gm,''));

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