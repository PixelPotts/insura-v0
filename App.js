/*
 * TODO:
 * - Install
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
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Hyperlink from 'react-native-hyperlink';
import _ from 'lodash';
import styles from './styles';
const stringifyObject = require('stringify-object');
const Providers = require('./providers').default.providers;
const DeclinedDrugs = require('./decline_drugs').default.medications;

// Diseases Import (>> NO LONGER USED <<)
// const Diseases = Object.assign(require('./diseases').default;
// let DiseasesFull = []; _.each(Diseases,function(type){ DiseasesFull = _.concat(DiseasesFull,type);});

const Conditions = require('./decline_conditions').default.conditions;
// const Medications = require('./medications2').default.all;

const Calculator = require('./calculatorData').default;
let Questions = require('./questions').default.questions;

// BLINK ID License Key
import {BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys} from 'blinkid-react-native';
const BlinklicenseKey = Platform.select({
  ios: 'RIWAWJSR-CWCHEIUG-P2NBYJIL-PU65ZFWS-UE77OCVN-APB6INY3-CWDH4J6W-7BLWEEON',
  // ios: 'R6GH6FFH-JKIYQ76Q-QGUJSEIH-DSQCNQTR-IUZB525W-PXAH7EHI-NPUGWSGI-EDRUGFHX',
});

const logos = {
  1: require('./images/logo_moo.jpg'),
  2: require('./images/logo_am.jpeg'),
  3: require('./images/logo_ta.png'),
  4: require('./images/logo_for.png'),
  5: require('./images/logo_cfg.jpeg'),
  6: require('./images/logo_roy.jpeg'),
  7: require('./images/logo_aig.png')
};
let clientStartAge = 50;
export default class Applify extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      questionAnswer: '',
      activeQuestionId: 0,
      activeButtonId: 0,
      questionCounter: 1,
      buttons: [],
      autoSuggestVisible: false,
      autoSuggestOptions: [],
      answerButtonsVisible: true,
      consoleIsVisible: false,
      consoleContent: "App restarted\n",
      calculatedBMI: false,
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
        age: 50,
        dob: '',
        height: 0,
        weight: 0,
        bmi: 25,
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        race: '',
        ssn:''
      },
      calculatorVisible: false,
      calculatorFaceValue: '25,000',
      calculatorTerms: '20',
      calculatorHiddenProducts: [],
      calculatorClientAge: "",
      calculator: {}
    };
  }

  log = (content) => {
    // let str = stringifyObject(content) + " " + Math.floor(Date.now() / 1000) + "\n" + this.state.consoleContent;
    let str = stringifyObject(content) + "\n" + this.state.consoleContent;
    this.state.consoleContent = str.substr(0,4999);
    console.log(str);
    // this.setState({consoleContent: updateContent});
  };
  nextQuestion = (skip=false) => {
    if(this.state.questionCounter < Questions.length) this.setState({questionCounter: this.state.questionCounter + 1});
    if(!skip) this.processAnswer(Questions[this.state.activeQuestionId].category,{answer:this.state.questionAnswer});
    if(Questions[this.state.activeQuestionId+1]) {
      this.setState({activeQuestionId: this.state.activeQuestionId+1});
      this.setState({activeButtonId: this.state.activeQuestionId+1});
    }
  };
  prevQuestion = () => {
    if(this.state.questionCounter > 1) this.setState({questionCounter: this.state.questionCounter - 1});
    if(Questions[this.state.activeQuestionId-1]) {
      this.setState({activeQuestionId: this.state.activeQuestionId-1});
      this.setState({activeButtonId: this.state.activeQuestionId-1});
    }
  };
  processAnswer = (category, details) => {
    console.log("processing answer");
    console.log(category);
    console.log(details);
    let self = this;
    details.answer = details.value === undefined ? details.answer : details.value;
    Q = Questions[this.state.activeQuestionId];
    let clientInfo = {...this.state.clientInfo};
    if(Q.field==='dob') details.answer = this.formatDate(details.answer) + " ("+ this.state.clientInfo.age+"yo)";
    if(Q.field==='height') details.answer = this.formateHeight(details.answer);
    if(Q.field==='mortgage') details.answer = '$' + number_format(details.answer);

    // UPDATE EXISTING BUTTON
    if(_.find(this.state.buttons,function(o){ return o.field === Q.field })
      && !(category==='MED' || category==='MED_OLD'||category==="CON") ){

      // BIO
      if(category==="BIO") { // Update an existing button
        clientInfo[Q.field] = details.answer;
        this.setState({clientInfo},()=>{ this.updateProviders();});
        let buttons = {...this.state.buttons};
        buttons[this.state.activeButtonId].subtitle = details.answer;
        this.setState([{buttons}],()=>{this.processBMI()});
        this.updateProviders();
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
        this.setState({clientInfo},()=>{this.processBMI(); });
        B.title = Q.title;
        B.subtitle = details.answer;
        // if this Q has preset answers
      }
      else if(category==="MED" || category==="MED_OLD"){
        B.title = details.name;
        // B.subtitle = details.dosage;
        B.key = details.id
      }
      else if(category==="CON"){
        B.title = _.startCase(_.toLower(details.name));
        // B.subtitle = "CODE: " + details.id;
        B.key = details.id;
      }
      if(_.trim(B.title)==='') return;
      this.setState(prevState => ({buttons: [...prevState.buttons, B]}),this.updateProviders);
    }
    if('answerOptions' in Q){
      this.nextQuestion(true);
    }
    this.clearAnswer();
  };

  clearAnswer = () => {
    this.setState({questionAnswer: ''});
  };
  getAge = (dob) => {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  formatDate = (str) => {
    if(_.trim(str)==='') return;
    let m = /([0-9]){1,2}[^0-9]*([0-9]{1,2})[^0-9]*([0-9]{2,4})/.exec(str);
    let dob = m[1]+"/"+m[2]+"/"+m[3];
    let clientInfo = {...this.state.clientInfo};
    clientInfo.dob = dob;
    clientInfo.age = this.getAge(dob);
    this.state.clientInfo.age = clientInfo.age;
    this.setState({clientInfo});
    return dob;
  };
  formateHeight = (height) => {
    console.log("height");
    console.log(height);
    if(!height) return;
    return parseInt(height/12) +"' "+height%12+"'' or "+ height+"''";
  };
  updateProviders = (restart=false) => {
    console.log("--- Updating providers ---");
    console.log(this.state.buttons);
    console.log(this.state.clientInfo);
    let self = this;
    let age = this.state.clientInfo.age;
    let Providers = {...this.state.Providers};
    let client = this.state.clientInfo;
    let term = this.state.calculatorTerms;
    _.each(Providers,function(Provider,ProviderKey){
      _.each(Provider.products,function(product,productKey){
        let uw = product.underwriting;
        let statuses = [];
        console.log("age:");
        console.log(age);
        // if(client.age) statuses.push(_.inRange(client.age,uw.age.min,uw.age.max) ? 3 : 1);
        if(client.bmi) statuses.push(_.inRange(client.bmi,uw.bmi.min,uw.bmi.max) ? 3 : 1);

        // Check that the products in this product support the uses current age
        let check = {notice:''};
        _.each(product.calculator.products, function(product){
          console.log("========= PRODUCT AGE CHECK ==========");
          console.log(product);
          table = product.table;
          // CALCULATE MONTHLY AND ANUUAL COST
          switch (product.tableType) {
            case 'term--age--gender-smokerStatus':
              if(typeof table[term][age] === "undefined"){
                check.notice = "The age of '"+age+"' was not found in the rate table.";
                statuses.push(1);
              }
              break;
            case 'age--term-smokerStatus':
              if(typeof table[age]==="undefined"){
                check.notice = "The age of '"+age+"' was not found in the rate table.";
                statuses.push(1);
              }
              break;
            case 'age--gender-smokerStatus':
              if(typeof table[age]==="undefined"){
                check.notice = "The age of '"+age+"' was not found in the rate table.";
                statuses.push(1);
              }
              break;
            case 'age--gender':
              if(typeof table[age]==="undefined"){
                check.notice = "The age of '"+age+"' was not found in the rate table.";
                statuses.push(1);
              }
              break;
          }
        })

        _.each(self.state.buttons,function(button){

          // If this is a medication...
          if(button.category==='MED'){
            let medication = _.find(DeclinedDrugs,function(o){return o.id == button.key});

            // If the drug exists in our databases
            if(medication !== undefined){
              let status = medication[product.nickname];
              let arr = _.split(status,'-'); // split out encoded answers
              status = arr[0]; // update medications to use the first segment regardless
              query = 0;
              if(arr.length > 1){ // if a second segment is found, use it
                let query = arr[1];
              }

              switch (status){
                case 'A':
                  statuses.push(3); break;
                case 'IC':
                  statuses.push(2); break;
                case 'D':
                  statuses.push(1); break;

                default:
                  statuses.push(3);
              }

            // If the drug does not exist in our databses, it must be a manual entry that we want to allow
            } else {
              statuses.push(3);
            }

            //self.log("=== Searching MED category ===");
            //self.log("MED TO SEARCH: "+button.title);

            // _.each(uw.drugs.decline,function(thisDeclinedDrug){
            //   statuses.push(thisDeclinedDrug.name===button.title ? 1 : 3);
            // });
          }
          if(button.category==='CON'){
            let condition = _.find(Conditions,function(o){return o.id == button.key});
            console.log("checking condition...........");
            console.log(condition);
            console.log(product.nickname);
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
                statuses.push(2); break;
              case 'D':
                statuses.push(1); break;
              case 'Q':
                console.log(" ========== Case Q ========== ");
                console.log("button.buttonButtonId: " + button.buttonButtonId);
                console.log("query: " + query);
                if(button.buttonButtonId <= query){
                  statuses.push(1)
                } else {
                  statuses.push(3);
                }
                break;

              default:
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
  };
  processBMI = () => {
    let height = this.state.clientInfo.height;
    let weight = this.state.clientInfo.weight;
    let bmi = this.state.clientInfo.bmi;
    if(height && weight){ this.getBMI() }
  };
  watchAnswer = (questionAnswer) => {
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
      data = DeclinedDrugs;
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
    matches = _.uniqBy(matches,'id'); // force unique (thanks Obama)
    if(category==="MED"||category==="MED_OLD") matches = matches.sort(function(a,b) { return a.name.length - b.name.length; }); // order by shortest name
    if(category==="CON") matches = _.orderBy(matches,'mifts','desc'); // order by shortest name
    this.setState({autoSuggestOptions: matches});
  };
  clickAnswer = (option) => {
    console.log("clicked ");
    console.log(option);
    this.processAnswer(Questions[this.state.activeQuestionId].category,option);
    this.state.autoSuggestVisible = false;
    this.clearAnswer();
  };
  renderOptions = (buttons) => {
    console.log('=== renderOptions ===');
    console.log(this.state.autoSuggestOptions);
    console.log(this.state.questionAnswer);

    if(this.state.autoSuggestOptions.length > 0) {
      return (
        <View style={styles.autoSuggestWrap}>
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
            {this.state.autoSuggestOptions.map(option => (
              <TouchableHighlight onPress={() => this.clickAnswer(option)} key={(option.id)} underlayColor="#FFF">
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
    // this.log(this.state.buttons);
    if(!button.auto){
      this.setState({activeButtonId: key});
      let buttons = {...this.state.buttons};
      let qId = buttons[key].questionId;
      this.setState({activeQuestionId: qId});
      if(buttons[key].category==='BIO'){
        this.setState({questionAnswer: buttons[key].subtitle});
      }
    } else {
      if(button.field==='bmi'){
        alert('BMI is auto calculated from height and weight.');
      }
    }
  };
  deleteButton = (button,key) => {
    let clientInfo = this.state.clientInfo;
    if(!button.auto){
      let buttons = {...this.state.buttons};
      buttons = _.filter(buttons,function(o){ return o.id !== button.id });
      this.setState({buttons});
      if (button.field === 'dob') {
        clientInfo.age = clientStartAge;
        this.setState({clientInfo: clientInfo});
      }
    } else {
      if (button.field === 'bmi') {
        alert('BMI is auto calculated and cannot be deleted.');
      }

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

  // The inner buttons on medications/conditions e.g. [1] [[2]
  renderButtonButtons = (button) => {
    console.log("rendering renderButtonButtons()");
    console.log(button);
    let o = false; // medication or condition object, known lovingly here as "o"
    if(button.category === "MED" || button.category === "MED_OLD") {
      o = _.find(DeclinedDrugs, function (o) { return o.id === button.key });
      console.log("found medication:");
    } else if(button.category === "CON") {
      o = _.find(Conditions, function (o) { return o.id === button.key });
      console.log("found condition:");
    }
    console.log(o);
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

    console.log("needMoreButtons:");
    console.log(needMoreButtons);
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
    console.log('clicked button button');
    console.log(n);
    console.log(activeButton);
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
        null: this.updateCalculatorValues(this.state.calculatorFaceValue,this.state.calculatorTerms)
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

  getBMI = () => {
    let clientInfo = this.state.clientInfo;
    let height = /([0-9]){1}[^0-9]*([0-9]{1,2})/.exec(clientInfo.height);
    let bmi = clientInfo.bmi = (clientInfo.weight/Math.pow(parseInt(height[1])*12+parseInt(height[2]),2))*703;
    this.setState({clientInfo});
    let bmiButton = _.find(this.state.buttons,function(o){return o.field==='bmi'});
    if(bmiButton){
      let buttons = {...this.state.buttons};
      bmiButton.subtitle = Math.round(bmi *100) / 100;
      buttons[_.findIndex(this.state.buttons,function(o){return o.field==='bmi'})] = bmiButton;
      this.setState([{buttons}]);
    } else {
      let B = {id: 100, category: 'BIO', field: 'bmi', questionId: undefined, auto: 1};
      B.title = "BMI";
      B.subtitle = Math.round(clientInfo.bmi *100) / 100;
      this.setState(prevState => ({buttons: [...prevState.buttons, B]}));
    }
    this.updateProviders();
  };
  hideCalculator = () => {
    console.log('test')
    this.setState({calculatorVisible: false});
  };
  check = (o,k) => {
    if (!(k in o)) {
      
    }
  }
  
  getProductCostAvailability = (product,age,gender,smokerStatus,faceValue,term) => {
    let cost = { month: 0, annual: 0, notice: '' };
    let rate = 0;
    console.log("=-=-=-=-=-= PRODUCT TABLE =-=-=-=-=-=-=");
    table = product.table;
    console.log(table);
    // CALCULATE SHOW/HIDE STATUS
    console.log(product.tableType);

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
    cost.annual = rate * (_.toInteger(faceValue) / product.multiplier) + product.fee;
    if(product.id===403)
      cost.annual = (rate * (_.toInteger(faceValue) / product.multiplier) + product.fee) * 12;
    cost.month = cost.annual * product.monthFactor;
    return cost;
  }

  updateCalculatorValues = (updatedFaceValue, updatedTerms) => {
    getProductCostAvailability = this.getProductCostAvailability;
    console.log("state:");
    console.log(this.state);
    console.log("==== start updateCalculatorValues ====");
    console.log("updatedFaceValue: ");
    console.log(updatedFaceValue);
    console.log("updatedTerms: ");
    console.log(updatedTerms);

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

    console.log("smoker status");
    console.log(smokerStatus);


    console.log("PROPS UPDATED:");
    console.log("updatedFaceValue: ");
    console.log(updatedFaceValue);
    console.log("updatedTerms: ");
    console.log(updatedTerms);

    let calc = this.state.calculator;
    this.setState({calculatorHiddenProducts: []});
    let hiddenIds = this.state.calculatorHiddenProducts;

    _.each(Providers,function(provider){
      console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== Provider ==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==");
      console.log(provider);
      _.each(provider.products,function(product){
        console.log("==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-== Product === ");
        console.log(product);
        _.each(product.calculator.products,function(calculatorProduct){
          console.log(calculatorProduct);

          console.log("product.calculator.type: ");
          console.log(product.calculator.type);
          console.log("calculatorProduct");
          console.log(calculatorProduct);
          console.log(" === COST VARIABLES ===");
          console.log("updatedTerms");
          console.log(updatedTerms);
          console.log("updatedFaceValue");
          console.log(updatedFaceValue);
          console.log("age");
          console.log(age);
          console.log("gender");
          console.log(gender);
          console.log("calculatorProduct.multiplier");
          console.log(calculatorProduct.multiplier);
          console.log("multiplier applied:");
          console.log(_.toInteger(updatedFaceValue) / calculatorProduct.multiplier);
          console.log("rate table");
          console.log(calculatorProduct.table);

          let cost = getProductCostAvailability(calculatorProduct,age,gender,smokerStatus,updatedFaceValue,updatedTerms);
          calc[calculatorProduct.id] = cost;
          if(cost.annual == 0) hiddenIds.push(calculatorProduct.id);

          console.log("-0-0-0-0-0-0-0-0 CALCULATOR 0-0-0-0-0-0-0-0-0-");
          console.log(calc);

        })
      })
    })

    console.log("=== Hidden Calculator Products ===");
    console.log(hiddenIds);

    console.log("=== CALCULATOR OUTPUT ===");
    console.log(calc);

    // this.setState({calculator: calc});
    // this.setState({calculatorHiddenProducts: hiddenIds});
  }

  renderCalculatorProduct = (provider, product, calculatorProduct) => {
    console.log("=== renderCalculatorProduct() ===");
    console.log(provider);
    console.log(product);
    console.log(calculatorProduct);

    // Hide products from the hide array
    if(_.indexOf(this.state.calculatorHiddenProducts,calculatorProduct.id)>0) return;

    return (
      <View style={styles.calculatorCompanyWrap} key={calculatorProduct.id}>
        <Image source={logos[provider.id]} style={styles.calculatorLogo}/>
        <View style={styles.calculatorProductWrap}>
          <View style={styles.calculatorProductPeriodCostWrapProduct}>
            <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${number_format(this.state.calculator[calculatorProduct.id].month,2)}
              </Text>
            <Text
              value={this.state.questionAnswer}
              style={styles.calculatorProductWrapSubtitle}></Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${number_format(this.state.calculator[calculatorProduct.id].annual,2)}
              </Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Hyperlink
              linkDefault={true}
              linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }>
              <Text>Americo</Text>
            </Hyperlink>
          </View>
        </View>
      </View>
    )
  }

  renderCalculator = () => {

    console.log(" --- RENDER CALCULATOR ---");

    //let Providers = Calculator.providers;
    this.inputRefs = {};
    self = this;
    renderCalculatorProduct = this.renderCalculatorProduct;
    let productsRender = [];
    return (
       <View style={styles.calculator}>
         <View style={{ position:'absolute', top: 20, right: 20, zIndex:999 }}>
           <TouchableHighlight onPress={()=>{this.setState({calculatorVisible: false})}}>
             <Text>Close</Text>
           </TouchableHighlight>
         </View>
         {/*<Text style={{fontSize: 20}}>Coverage Options for {this.state.clientInfo.firstName}</Text>*/}
         <View style={styles.calculatorHeader}>
          {/*<View style={styles.calculatorFaceValueWrap}>*/}
            {/*<Text>Coverage Amount ($)</Text>*/}
            {/*<TextInput*/}
              {/*style={styles.calculatorFaceValue}*/}
              {/*ref="calculatorFaceValue"*/}
              {/*// placeholder="100,000"*/}
              {/*onChangeText={(value)=> {*/}
                {/*console.log("=== calling onChangeText ===");*/}
                {/*console.log("value:");*/}
                {/*console.log(value);*/}
                {/*this.updateCalculatorValues(number_format(value,2),null)*/}
                {/*// this.setState({calculatorFaceValue: number_format(value,2)})*/}
              {/*}}*/}
              {/*value={number_format(this.state.calculatorFaceValue)}*/}
            {/*/>*/}
          {/*</View>*/}

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


         <ScrollView>


           {Providers.map(function(provider){
             provider.products.map(function(product){
               product.calculator.products.map(function(calculatorProduct){
                 productsRender.push(renderCalculatorProduct(provider,product,calculatorProduct));
                 console.log("--- Rendering ---");
               })
             })
           })}

           {productsRender}




        </ScrollView>
      </View>
    )
  };
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.masterWrap}>

        {/* CONSOLE */}
        <ScrollView style={styles.console}>
          <Text>{this.state.consoleContent}</Text>
        </ScrollView>

        {/* CALCULATOR */}
        {this.state.calculatorVisible ? this.renderCalculator() : null}

        {/* HEADER */}
        <View style={styles.header}>
          {/*<View><Text style={styles.logo}>Insurā <Text style={{fontWeight: '300', fontSize: 13}}>BETA</Text></Text></View>*/}
          <View style={styles.headerTopRight}>
            <View><Text style={styles.loggedInUserName}>Guest User</Text></View>
            <View><Text style={styles.signOutLink}>Sign Out</Text></View>
          </View>
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
            value={this.state.questionAnswer}
            style={styles.masterInput}
            placeholder={Questions[this.state.activeQuestionId].placeholder}
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
          <View style={styles.questionLinksWrap}>
            <Button title="Prev" color="#ffb601" onPress={this.prevQuestion}><Text>Prev</Text></Button>
            <Button title="Next" color="#ffb601" onPress={this.nextQuestion}><Text>Next</Text></Button>
            <Text style={{color: '#b6b8be', marginTop: 11, marginLeft: 13}}>{this.state.questionCounter} of {Questions.length}</Text>
            {this.renderIdScanButton()}
          </View>
          {this.renderButtons(this.state.buttons)}
        </View>
        <View style={styles.footer}>
          {this.renderProviderStatus(this.state.Providers)}
        </View>
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
  clearForm = () => {
    this.setState({buttons: []},()=>{});
    this.setState({activeQuestionId: 0});
    this.setState({questionCounter: 1});
    this.updateProviders(true);
  };
  renderIdScanButton() {
    return (
      <View style={styles.idScanButtonContainer}>
        <Button onPress={this.scan.bind(this)} title="Scan DL" color="#d2d2d4"/>
        <Button onPress={()=>{
          AlertIOS.alert(
            'Clear All Data',
            'This action cannot be undone.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Clear Form Pressed'),
                style: 'cancel',
              },
              {
                text: 'Clear Form',
                onPress: () => this.clearForm(),
              },
            ]
          );
        }} title="Clear" color="#d2d2d4"/>
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
}
Number.prototype.toCurrencyString = function(prefix, suffix) {
  if (typeof prefix === 'undefined') { prefix = '$'; }
  if (typeof suffix === 'undefined') { suffix = ''; }
  var _localeBug = new RegExp((1).toLocaleString().replace(/^1/, '').replace(/\./, '\\.') + "$");
  return prefix + (~~this).toLocaleString().replace(_localeBug, '') + (this % 1).toFixed(2).toLocaleString().replace(/^[+-]?0+/,'') + suffix;
}

function number_format(number, decimals, dec_point, thousands_sep) {

  number = parseFloat(number.toString().replace(/[^0-9\.]/gm,''));

  console.log("number format after replace: ");
  console.log(number);

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