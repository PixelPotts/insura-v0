/*
 * TODO:
 * - Install
 */

import React, { Component } from 'react';
import {
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

const Calculator = require('./calculatorData').default;
let Questions = require('./questions').default.questions;

// BLINK ID License Key
import {BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys} from 'blinkid-react-native';
const BlinklicenseKey = Platform.select({
  ios: 'R6GH6FFH-JKIYQ76Q-QGUJSEIH-DSQCNQTR-IUZB525W-PXAH7EHI-NPUGWSGI-EDRUGFHX',
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

export default class Applify extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      questionAnswer: '',
      activeQuestionId: 0,
      activeButtonId: 0,
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
      clientAge: 50,
      clientInfo: {
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        age: undefined,
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
    if(!skip) this.processAnswer(Questions[this.state.activeQuestionId].category,{answer:this.state.questionAnswer});
    if(Questions[this.state.activeQuestionId+1]) {
      this.setState({activeQuestionId: this.state.activeQuestionId+1});
      this.setState({activeButtonId: this.state.activeQuestionId+1});
    }
  };
  prevQuestion = () => {
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
    if(Q.field==='dob') details.answer = this.formatDate(details.answer) + " ("+ this.state.clientAge+"yo)";
    if(Q.field==='height') details.answer = this.formateHeight(details.answer);
    if(Q.field==='mortgage') details.answer = '$' + details.answer;

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
    this.state.clientAge = clientInfo.age;
    this.setState({clientInfo});
    return dob;
  };
  formateHeight = (str) => {
    if(!str) return;
    let m = /([0-9]){1}[^0-9]*([0-9]{1,2})/.exec(str);
    return m[1]+"' "+m[2]+"''"+" or "+((parseInt(m[1])*12)+parseInt(m[2]))+"''";
  };
  updateProviders = () => {
    let self = this;
    let age = this.state.clientInfo.age;
    let Providers = {...this.state.Providers};
    let client = this.state.clientInfo;
    _.each(Providers,function(Provider,ProviderKey){
      _.each(Provider.products,function(product,productKey){
        let uw = product.underwriting;
        let statuses = [];
        if(client.age) statuses.push(_.inRange(client.age,uw.age.min,uw.age.max) ? 3 : 1);
        if(client.bmi) statuses.push(_.inRange(client.bmi,uw.bmi.min,uw.bmi.max) ? 3 : 1);

        _.each(self.state.buttons,function(button){

        // check more info drugs
          if(button.category==='MED'){
            let medication = _.find(DeclinedDrugs,function(o){return o.id == button.key});

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

            //self.log("=== Searching MED category ===");
            //self.log("MED TO SEARCH: "+button.title);

            // _.each(uw.drugs.decline,function(thisDeclinedDrug){
            //   statuses.push(thisDeclinedDrug.name===button.title ? 1 : 3);
            // });
          }
          if(button.category==='CON'){
            let condition = _.find(Conditions,function(o){return o.id == button.key});

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
    if(!button.auto){
      let buttons = {...this.state.buttons};
      buttons = _.filter(buttons,function(o){ return o.id !== button.id });
      this.setState({buttons});
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
  updateCalculatorValues = (updatedFaceValue, updatedTerms) => {
    console.log("state:");
    console.log(this.state);

    console.log("==== start updateCalculatorValues ====");
    console.log("updatedFaceValue: ");
    console.log(updatedFaceValue);
    console.log("updatedTerms: ");
    console.log(updatedTerms);

    updatedFaceValue = updatedFaceValue === null ? this.state.calculatorFaceValue : updatedFaceValue;
    updatedTerms = updatedTerms === null ? this.state.calculatorTerms : updatedTerms;

    updatedFaceValue = updatedFaceValue.toString().replace(/[^0-9\.]/gm,'');
    if(updatedFaceValue<2000) updatedFaceValue = 2000;

    smokerButton = _.find(this.state.buttons,function(b){return b.field == "tobacco-use-type"});
    genderButton = _.find(this.state.buttons,function(b){return b.field == "gender"});
    age = this.state.clientAge;

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
      console.log("provider:");
      console.log(provider);
      _.each(provider.products,function(product){
        console.log("product");
        console.log(product);
        _.each(product.calculator.products,function(calculatorProduct){

          console.log("product.calculator.type: ");
          console.log(product.calculator.type);

          let rate, cost;
          if(product.calculator.type === "term") {
            rate = _.find(calculatorProduct.rates,function(o){return o.years == updatedTerms});

            // // Skip this product if this term is not supported
            // if(rate === undefined) {
            //   hiddenIds.push(calculatorProduct.id);
            //   return;
            // }

            // cost = rate[smokerStatus];

          } else if(product.calculator.type === "whole"){
            rate = calculatorProduct.rate;
            cost = rate[smokerStatus];
          }

          // Skip this product if this smoker status is not supported
          // if(smokerStatus in rate) {} else {
          //   hiddenIds.push(calculatorProduct.id);
          //   return;
          // }

          console.log("calculatorProduct");
          console.log(calculatorProduct);
          console.log(" === COST VARIABLES ===");
          console.log("updatedTerms");
          console.log(updatedTerms);
          console.log("updatedFaceValue");
          console.log(updatedFaceValue);
          console.log("rate");
          console.log(rate);
          console.log("age");
          console.log(age);
          console.log("gender");
          console.log(gender);
          console.log("cost");
          console.log(cost);
          console.log("calculatorProduct.multiplier");
          console.log(calculatorProduct.multiplier);
          console.log("multiplier applied:");
          console.log(_.toInteger(updatedFaceValue) / calculatorProduct.multiplier);

          console.log("rate table");
          console.log(calculatorProduct.table);

          calc[calculatorProduct.id] = {month: 0, annual: 0};



          if("table" in calculatorProduct){

            // Skip this product if this age isn't available
            if(!(age in calculatorProduct.table)){
              hiddenIds.push(calculatorProduct.id);
              return;
            }

            // Americo
            if(provider.id === 2) {

              if(product.calculator.type === "term"){
                console.log(" table by age: ");
                console.log(updatedTerms+"-"+smokerStatus);
                console.log(calculatorProduct.table[age]);
                calc[calculatorProduct.id].annual = number_format(calculatorProduct.table[age][updatedTerms+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee,2);
                calc[calculatorProduct.id].month = number_format((calculatorProduct.table[age][updatedTerms+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee) * calculatorProduct.monthFactor,2);
                if(_.includes([2021],calculatorProduct.id)){
                  console.log("=== Product ID 2021 ===");
                  calc[calculatorProduct.id].annual = number_format(calculatorProduct.table[age][gender+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee,2);
                  calc[calculatorProduct.id].month = number_format((calculatorProduct.table[age][gender+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee) * calculatorProduct.monthFactor,2);
                }
                if(_.includes([2031,2041],calculatorProduct.id)){
                  console.log("=== Product ID 2031 ===");
                  calc[calculatorProduct.id].annual = number_format(calculatorProduct.table[age][gender] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee,2);
                  calc[calculatorProduct.id].month = number_format((calculatorProduct.table[age][gender] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee) * calculatorProduct.monthFactor,2);
                }

              } else if(product.calculator.type === "whole"){

              }

            }

            // MOO
            if(provider.id === 1) {

              if(product.calculator.type === "term"){

              } else if(product.calculator.type === "whole"){

                console.log(" table by gender, age: ");
                console.log(gender+"-"+smokerStatus);
                console.log(calculatorProduct.table[age]);

                if(_.includes([131], calculatorProduct.id)){
                  console.log("=== Product 131 ===");
                  if(!(age in calculatorProduct.table)) { hiddenIds.push(calculatorProduct.id); return; }
                  calc[calculatorProduct.id].annual = number_format(calculatorProduct.table[age][gender] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee,2);
                  calc[calculatorProduct.id].month = number_format((calculatorProduct.table[age][gender] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee) * calculatorProduct.monthFactor,2);
                } else {
                  console.log("=== Not Product 131 ===");
                  console.log(calculatorProduct.table[age][gender+"-"+smokerStatus]);
                  if(!(age in calculatorProduct.table)) { hiddenIds.push(calculatorProduct.id); return; }
                  calc[calculatorProduct.id].annual = number_format(calculatorProduct.table[age][gender+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee,2);
                  calc[calculatorProduct.id].month = number_format((calculatorProduct.table[age][gender+"-"+smokerStatus] * (_.toInteger(updatedFaceValue) / calculatorProduct.multiplier) + calculatorProduct.fee) * calculatorProduct.monthFactor,2);

                }

              }

            }

          }


        })
      })
    })

    console.log("=== Hidden Calculator Products ===");
    console.log(hiddenIds);

    console.log("=== CALCULATOR OUTPUT ===");
    console.log(calc);

    this.setState({calculator: calc});
    this.setState({calculatorHiddenProducts: hiddenIds});
  }

  renderCalculatorProduct = (provider, product, calculatorProduct) => {
    console.log("=== renderCalculatorProduct() ===");
    console.log(provider);
    console.log(product);
    console.log(calculatorProduct);

    // Hide products from the hide array
    if(calculatorProduct.id in this.state.calculatorHiddenProducts) return;

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
              ${this.state.calculator[calculatorProduct.id].month}
              </Text>
            <Text
              value={this.state.questionAnswer}
              style={styles.calculatorProductWrapSubtitle}></Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${this.state.calculator[calculatorProduct.id].annual}
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
          <View style={styles.calculatorFaceValueWrap}>
            <Text>Coverage Amount ($)</Text>
            <TextInput
              style={styles.calculatorFaceValue}
              ref="calculatorFaceValue"
              // placeholder="100,000"
              onChangeText={(value)=> {
                console.log("=== calling onChangeText ===");
                console.log("value:");
                console.log(value);
                this.updateCalculatorValues(number_format(value,2),null)
                this.setState({calculatorFaceValue: number_format(value,2)})
              }}
              value={number_format(this.state.calculatorFaceValue)}
            />
          </View>
          <View style={styles.calculatorFaceValueWrap}>
            <Text>Term (Years)</Text>
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
                  this.inputRefs.picker2.togglePicker();
                }}
                style={{icon: {marginTop:-16, marginRight:-8}}}
                value={this.state.calculatorTerms}
                ref="terms"
              />
            </View>

          </View>
         </View>


         <ScrollView>

           {Providers.map(function(provider){
             provider.products.map(function(product){
               product.calculator.products.map(function(calculatorProduct){
                 productsRender.push(renderCalculatorProduct(provider,product,calculatorProduct));
               })
             })
           })}
           {productsRender}

           {/*<Text style={styles.calculatorProductWrapProduct}>Gtd Universal Life Exp</Text>*/}







           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_for.png')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>PlanRight</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}



           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_for.png')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>Strong Foundation</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}



           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_for.png')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>Smart UL</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}



           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_cfg.jpeg')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>Dignified Choice - Final Exp</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}



           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_roy.jpeg')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>Simplified Issue Whole</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}


           {/*<View style={styles.calculatorCompanyWrap}>*/}
             {/*<Image source={require('./images/logo_aig.png')} style={styles.calculatorLogo}/>*/}
             {/*<View style={styles.calculatorProductWrap}>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrapProduct}>*/}
                 {/*<Text style={styles.calculatorProductWrapProduct}>Guaranteed Issue Whole</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Monthly</Text>*/}
                 {/*<Text style={styles.calculatorProductWrapSubtitle}>${this.state.calculator.MOO_monthly}</Text>*/}
                 {/*<Text*/}
                   {/*value={this.state.questionAnswer}*/}
                   {/*style={styles.calculatorProductWrapSubtitle}></Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Text style={styles.calculatorProductWrapTitle}>Annual</Text>*/}
               {/*</View>*/}
               {/*<View style={styles.calculatorProductPeriodCostWrap}>*/}
                 {/*<Hyperlink*/}
                   {/*linkDefault={true}*/}
                   {/*linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }*/}
                 {/*>*/}
                   {/*<Text>Americo</Text>*/}
                 {/*</Hyperlink>*/}
               {/*</View>*/}
             {/*</View>*/}
           {/*</View>*/}



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
            <Button title="Prev" color="#2548B2" onPress={this.prevQuestion}><Text>Prev</Text></Button>
            <Button title="Next" color="#2548B2" onPress={this.nextQuestion}><Text>Next</Text></Button>
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
  renderIdScanButton() {
    return (
      <View style={styles.idScanButtonContainer}>
        <Button onPress={this.scan.bind(this)} title="Scan DL" color="#0F35AB"/>
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