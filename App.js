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
  TouchableHighlight,
  View
} from 'react-native';
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

// import './images/logo_moo.jpg';

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
      consoleIsVisible: false,
      consoleContent: "App restarted\n",
      calculatorVisible: false,
      calculatedBMI: false,
      BlinkShowImage: false,
      BlinkResultImage: '',
      BlinkResults: '',
      BlinkLicenseKeyErrorMessage: '',
      Providers: Providers,
      clientAge: undefined,
      clientInfo: {
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        age: undefined,
        height: 0,
        weight: 0,
        bmi: 0,
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        race: '',
        ssn:''
      }
    };
  }
  log = (content) => {
    // let str = stringifyObject(content) + " " + Math.floor(Date.now() / 1000) + "\n" + this.state.consoleContent;
    let str = stringifyObject(content) + "\n" + this.state.consoleContent;
    this.state.consoleContent = str.substr(0,4999);
    console.log(str);
    // this.setState({consoleContent: updateContent});
  };
  nextQuestion = () => {
    this.processAnswer(Questions[this.state.activeQuestionId].category,{answer:this.state.questionAnswer});
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
    let self = this;
    Q = Questions[this.state.activeQuestionId];
    let clientInfo = {...this.state.clientInfo};
    if(Q.field==='dob') details.answer = this.formatDate(details.answer);
    if(Q.field==='height') details.answer = this.formateHeight(details.answer);
    if(Q.field==='mortgage') details.answer = '$' + details.answer;
    // If the button exists
    if(_.find(this.state.buttons,function(o){ return o.field === Q.field })
      && !(category==='MED' || category==='MED_OLD'||category==="CON") ){
      // this.log('updating existing button');
      if(category==="BIO") { // Update an existing button
        clientInfo[Q.field] = details.answer;
        // this.log(Q.field);
        // this.log(details.answer);
        this.setState({clientInfo},()=>{ this.updateProviders();});
        let buttons = {...this.state.buttons};
        buttons[this.state.activeButtonId].subtitle = details.answer;
        this.setState([{buttons}],()=>{this.processBMI()});
      }
      // Start a new button
    } else {
      let B = {id: this.state.buttons.length+1, category: category, field: Q.field, questionId: this.state.activeQuestionId};
      if(category==="BIO") {
        let clientInfo = {...this.state.clientInfo};
        clientInfo[Q.field] = details.answer;
        this.setState({clientInfo},()=>{this.processBMI(); });
        B.title = Q.title;
        B.subtitle = details.answer;
      }
      else if(category==="MED" || category==="MED_OLD"){
        B.title = details.name;
        B.subtitle = details.dosage;
        B.key = details.id
      }
      else if(category==="CON"){
        B.title = _.startCase(_.toLower(details.name));
        B.subtitle = "CODE: " + details.id;
        B.key = details.id;
      }
      if(_.trim(B.title)==='') return;
      this.setState(prevState => ({buttons: [...prevState.buttons, B]}),this.updateProviders);
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
    // this.log("running updateProviders()");
    // this.logf(this.state.clientInfo);
    let Providers = {...this.state.Providers};
    let client = this.state.clientInfo;
    _.each(Providers,function(Provider,ProviderKey){
     //self.log("=== "+Provider.name+" ===");
      _.each(Provider.products,function(product,productKey){
       //self.log("=== "+Provider.name+" ===");
        let uw = product.underwriting;
        let statuses = [];
        if(client.age) statuses.push(_.inRange(client.age,uw.age.min,uw.age.max) ? 3 : 1);
        if(client.bmi) statuses.push(_.inRange(client.bmi,uw.bmi.min,uw.bmi.max) ? 3 : 1);

        // if(product.id===110){
          //self.log("=== Provider: "+Provider.name+" ===");
          //self.log("=== Product: "+product.name+" ===");

          _.each(self.state.buttons,function(button){

          // check more info drugs
            if(button.category==='MED'){

              let medication = _.find(DeclinedDrugs,function(o){return o.id == button.key});
              self.log("found medication:");
              self.log(button);
              self.log(medication);

              debugger;

              switch (medication[product.nickname]){
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
              self.log("found condition:");
              self.log(condition);

              switch (condition[product.nickname]){
                case 'A':
                  statuses.push(3); break;
                case 'IC':
                  statuses.push(2); break;
                case 'D':
                  statuses.push(1); break;

                default:
                  statuses.push(3);
              }
              // Americo
              if(product.id === 201){
                statuses.push(condition.HMSP === "D" ? 1 : 3);
              }
              else if(product.id === 2011){
                statuses.push(condition['HMSP-DI'] === "D" ? 1 : 3);
              }

            }

            //
            // // check decline conditions
            // if(button.category==='CON'){
            //   // self.log("=== Searching CON category ===");
            //   // self.log("CON TO SEARCH: "+button.title);
            //   if(uw.conditions.seeDecline) {
            //     // self.log("SeeDecline ID FOUND: "+ uw.drugs.seeDecline);
            //     // self.log("SeeDecline Decline: ");
            //     let drugsSee = _.find(Providers[ProviderKey].products, function(o){return o.id===uw.drugs.seeDecline});
            //    //self.log(drugsSee.underwriting.drugs.decline);
            //     uw.drugs.decline = drugsSee.underwriting.drugs.decline;
            //   } else {
            //     //self.log("SEE NOT FOUND");
            //   }
            //   //self.log("conditions in array:");
            //   //self.log(uw.conditions.decline);
            //   _.each(uw.conditions.decline,function(thisDeclinedCondition){
            //     //self.log("array item:");
            //     //self.log(thisDeclinedCondition);
            //
            //   });
            //   _.each(uw.conditions.info,function(thisInfoCondition){
            //     //self.log("array item:");
            //     //self.log(thisInfoCondition);
            //     //self.log("button item:");
            //     //self.log(button);
            //
            //     //self.log("client age: "+ self.state.clientAge);
            //     //self.log("drug maxAge: "+thisInfoCondition.maxAge);
            //     //self.log("thisInfoCondition.name: "+thisInfoCondition.name);
            //     //self.log("button key: "+button.key);
            //
            //     statuses.push(thisInfoCondition.key===button.key && self.state.clientAge > thisInfoCondition.maxAge ? 1 : 3);
            //   });
            // }
            //
          });

        // } // check product 101

        // check more info conditions
        // check decline drugs
        // Update Provider and Product
        Providers[ProviderKey].products[productKey].status = _.min(statuses);
      })
    });
    // this.log("should be running renderButtons() here...");
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
  clickAutoSuggestOption = (option) => {
    this.log(option);
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
              <TouchableHighlight onPress={() => this.clickAutoSuggestOption(option)}  key={(option.id)} underlayColor="#FFF">
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
  renderButtons = (buttons) => {
    // this.log("running renderButtons()");
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
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  };
  renderProviderStatus = (Providers) => {
    return (
      <TouchableHighlight onPress={()=>{this.setState({calculatorVisible: true})}}>
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
  checkDrugBlacklist = () => {
    self = this;
    let consoleContent = this.state.consoleContent;
    let diff = [];
    let diffString = '';
    _.each(MooDrugs.tle_decline,function(md){
      diff = _.filter(Medications.all, function(o) { return _.includes(_.toLower(o.name),_.toLower(md.name)) });
      if(diff.length<1){
        diffString += md.name + ", ";
      }
    });
    // this.log(diffString)
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
  renderCalculator = () => {
    //let Providers = Calculator.providers;
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
            <Text>Coverage Amount</Text>
            <TextInput style={styles.calculatorFaceValue} placeholder="$5,000 – $5,000,000"/>
          </View>
          <View style={styles.calculatorFaceValueWrap}>
            <Text>Duration (Years)</Text>
            <TextInput style={styles.calculatorFaceValue} placeholder="10, 15, 20, or 30"/>
          </View>
         </View>
         <ScrollView>
            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_moo.jpg')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://accounts.mutualofomaha.com/' ? 'Mutual of Omaha' : url }
                  >
                    <Text>Mutual of Omaha</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

           <View style={styles.calculatorCompanyWrap}>
             <Image source={require('./images/logo_am.jpeg')} style={styles.calculatorLogo}/>
             <View style={styles.calculatorProductWrap}>
               <View style={styles.calculatorProductPeriodCostWrap}>
                 <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                 <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
               </View>
               <View style={styles.calculatorProductPeriodCostWrap}>
                 <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                 <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
               </View>
               <View style={styles.calculatorProductPeriodCostWrap}>
                 <Hyperlink
                   linkDefault={true}
                   linkText={url => url === 'https://adfs.americo.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aagent.americo.com%3asharepoint&wctx=https%3a%2f%2fagent.americo.com%2f_layouts%2fAuthenticate.aspx%3fSource%3d%252F' ? 'Select' : url }
                 >
                   <Text>Americo</Text>
                 </Hyperlink>
               </View>
             </View>
           </View>

            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_aig.png')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://estationsecure.americangeneral.com/Login/Login.aspx?returnurl=%2fdisplay%2frouter.aspx%3fdocid%3d143' ? 'AIG' : url }
                  >
                    <Text>https://estationsecure.americangeneral.com/Login/Login.aspx?returnurl=%2fdisplay%2frouter.aspx%3fdocid%3d143</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_cfg.jpeg')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://www.cfglife.com/producer-login' ? 'Select' : url }
                  >
                    <Text>Columbian Financial Group</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_for.png')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://portal.foresters.biz/' ? 'Select' : url }
                  >
                    <Text>Foresters</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_roy.jpeg')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://agent.royalneighbors.org/Login.aspx?ReturnUrl=%2FHome.aspx' ? 'Select' : url }
                  >
                    <Text>Royal Neighbors</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

            <View style={styles.calculatorCompanyWrap}>
              <Image source={require('./images/logo_ta.png')} style={styles.calculatorLogo}/>
              <View style={styles.calculatorProductWrap}>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                  <Text style={styles.calculatorProductWrapSubtitle}>–</Text>
                </View>
                <View style={styles.calculatorProductPeriodCostWrap}>
                  <Hyperlink
                    linkDefault={true}
                    linkText={url => url === 'https://www.transamerica.com/fp-login/' ? 'Select' : url }
                  >
                    <Text>TransAmerica</Text>
                  </Hyperlink>
                </View>
              </View>
            </View>

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
