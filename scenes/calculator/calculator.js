import React, { Compnent } from 'react'
import {
  View
} from 'react-native'
import CalculatorProduct from "../../calculatorProduct";

export default class CalculatorScene extends Compnent {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){

    // console.log(" --- RENDER CALCULATOR ---");
    // console.log(this.state.clientInfo)

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
        <ScrollView horizontal={true} style={styles.calculatorHeader}>

          {/* FACE VALUE SELECT */}
          <View style={styles.calculatorFaceValueWrap}>
            <Text>Face Value</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{"label":"1,000","value":"1,000"},{"label":"2,000","value":"2,000"},{"label":"3,000","value":"3,000"},{"label":"4,000","value":"4,000"},{"label":"5,000","value":"5,000"},{"label":"6,000","value":"6,000"},{"label":"7,000","value":"7,000"},{"label":"8,000","value":"8,000"},{"label":"9,000","value":"9,000"},{"label":"10,000","value":"10,000"},{"label":"15,000","value":"15,000"},{"label":"20,000","value":"20,000"},{"label":"25,000","value":"25,000"},{"label":"30,000","value":"30,000"},{"label":"35,000","value":"35,000"},{"label":"40,000","value":"40,000"},{"label":"45,000","value":"45,000"},{"label":"50,000","value":"50,000"},{"label":"55,000","value":"55,000"},{"label":"60,000","value":"60,000"},{"label":"65,000","value":"65,000"},{"label":"70,000","value":"70,000"},{"label":"75,000","value":"75,000"},{"label":"80,000","value":"80,000"},{"label":"85,000","value":"85,000"},{"label":"90,000","value":"90,000"},{"label":"95,000","value":"95,000"},{"label":"100,000","value":"100,000"},{"label":"110,000","value":"110,000"},{"label":"120,000","value":"120,000"},{"label":"130,000","value":"130,000"},{"label":"140,000","value":"140,000"},{"label":"150,000","value":"150,000"},{"label":"160,000","value":"160,000"},{"label":"170,000","value":"170,000"},{"label":"180,000","value":"180,000"},{"label":"190,000","value":"190,000"},{"label":"200,000","value":"200,000"},{"label":"210,000","value":"210,000"},{"label":"220,000","value":"220,000"},{"label":"230,000","value":"230,000"},{"label":"240,000","value":"240,000"},{"label":"250,000","value":"250,000"},{"label":"300,000","value":"300,000"},{"label":"350,000","value":"350,000"},{"label":"400,000","value":"400,000"},{"label":"450,000","value":"450,000"},{"label":"500,000","value":"500,000"},{"label":"550,000","value":"550,000"},{"label":"600,000","value":"600,000"},{"label":"650,000","value":"650,000"},{"label":"700,000","value":"700,000"},{"label":"750,000","value":"750,000"},{"label":"800,000","value":"800,000"},{"label":"850,000","value":"850,000"},{"label":"900,000","value":"900,000"},{"label":"950,000","value":"950,000"},{"label":"1,000,000","value":"1,000,000"},{"label":"1,100,000","value":"1,100,000"},{"label":"1,200,000","value":"1,200,000"},{"label":"1,300,000","value":"1,300,000"},{"label":"1,400,000","value":"1,400,000"},{"label":"1,500,000","value":"1,500,000"},{"label":"1,600,000","value":"1,600,000"},{"label":"1,700,000","value":"1,700,000"},{"label":"1,800,000","value":"1,800,000"},{"label":"1,900,000","value":"1,900,000"},{"label":"2,000,000","value":"2,000,000"},{"label":"2,250,000","value":"2,250,000"},{"label":"2,500,000","value":"2,500,000"},{"label":"2,750,000","value":"2,750,000"},{"label":"3,000,000","value":"3,000,000"},{"label":"3,250,000","value":"3,250,000"},{"label":"3,500,000","value":"3,500,000"},{"label":"3,750,000","value":"3,750,000"},{"label":"4,000,000","value":"4,000,000"},{"label":"4,250,000","value":"4,250,000"},{"label":"4,500,000","value":"4,500,000"},{"label":"4,750,000","value":"4,750,000"},{"label":"5,000,000","value":"5,000,000"},{"label":"5,500,000","value":"5,500,000"},{"label":"6,000,000","value":"6,000,000"},{"label":"6,500,000","value":"6,500,000"},{"label":"7,000,000","value":"7,000,000"},{"label":"7,500,000","value":"7,500,000"},{"label":"8,000,000","value":"8,000,000"},{"label":"8,500,000","value":"8,500,000"},{"label":"9,000,000","value":"9,000,000"},{"label":"9,500,000","value":"9,500,000"},{"label":"10,000,000","value":"10,000,000"},{"label":"11,000,000","value":"11,000,000"},{"label":"12,000,000","value":"12,000,000"},{"label":"13,000,000","value":"13,000,000"},{"label":"14,000,000","value":"14,000,000"},{"label":"15,000,000","value":"15,000,000"},{"label":"16,000,000","value":"16,000,000"},{"label":"17,000,000","value":"17,000,000"},{"label":"18,000,000","value":"18,000,000"},{"label":"19,000,000","value":"19,000,000"},{"label":"20,000,000","value":"20,000,000"}]}
                onValueChange={(value) => {
                  this.setState({ calculatorFaceValue: value },()=>{this.updateCalculatorValues(value,null)});
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
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[
                  {label:'5',value:'5'},
                  {label:'10',value:'10'},
                  {label:'15',value:'15'},
                  {label:'20',value:'20'},
                  {label:'25',value:'25'},
                  {label:'30',value:'30'}
                ]}
                onValueChange={(value) => {
                  this.setState({ calculatorTerms: value },()=>{this.updateCalculatorValues(null,value)});
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
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{"label":"0","value":"0"},{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"},{"label":"4","value":"4"},{"label":"5","value":"5"},{"label":"6","value":"6"},{"label":"7","value":"7"},{"label":"8","value":"8"},{"label":"9","value":"9"},{"label":"10","value":"10"},{"label":"11","value":"11"},{"label":"12","value":"12"},{"label":"13","value":"13"},{"label":"14","value":"14"},{"label":"15","value":"15"},{"label":"16","value":"16"},{"label":"17","value":"17"},{"label":"18","value":"18"},{"label":"19","value":"19"},{"label":"20","value":"20"},{"label":"21","value":"21"},{"label":"22","value":"22"},{"label":"23","value":"23"},{"label":"24","value":"24"},{"label":"25","value":"25"},{"label":"26","value":"26"},{"label":"27","value":"27"},{"label":"28","value":"28"},{"label":"29","value":"29"},{"label":"30","value":"30"},{"label":"31","value":"31"},{"label":"32","value":"32"},{"label":"33","value":"33"},{"label":"34","value":"34"},{"label":"35","value":"35"},{"label":"36","value":"36"},{"label":"37","value":"37"},{"label":"38","value":"38"},{"label":"39","value":"39"},{"label":"40","value":"40"},{"label":"41","value":"41"},{"label":"42","value":"42"},{"label":"43","value":"43"},{"label":"44","value":"44"},{"label":"45","value":"45"},{"label":"46","value":"46"},{"label":"47","value":"47"},{"label":"48","value":"48"},{"label":"49","value":"49"},{"label":"50","value":"50"},{"label":"51","value":"51"},{"label":"52","value":"52"},{"label":"53","value":"53"},{"label":"54","value":"54"},{"label":"55","value":"55"},{"label":"56","value":"56"},{"label":"57","value":"57"},{"label":"58","value":"58"},{"label":"59","value":"59"},{"label":"60","value":"60"},{"label":"61","value":"61"},{"label":"62","value":"62"},{"label":"63","value":"63"},{"label":"64","value":"64"},{"label":"65","value":"65"},{"label":"66","value":"66"},{"label":"67","value":"67"},{"label":"68","value":"68"},{"label":"69","value":"69"},{"label":"70","value":"70"},{"label":"71","value":"71"},{"label":"72","value":"72"},{"label":"73","value":"73"},{"label":"74","value":"74"},{"label":"75","value":"75"},{"label":"76","value":"76"},{"label":"77","value":"77"},{"label":"78","value":"78"},{"label":"79","value":"79"},{"label":"80","value":"80"},{"label":"81","value":"81"},{"label":"82","value":"82"},{"label":"83","value":"83"},{"label":"84","value":"84"},{"label":"85","value":"85"},{"label":"86","value":"86"},{"label":"87","value":"87"},{"label":"88","value":"88"},{"label":"89","value":"89"},{"label":"90","value":"90"},{"label":"91","value":"91"},{"label":"92","value":"92"},{"label":"93","value":"93"},{"label":"94","value":"94"},{"label":"95","value":"95"},{"label":"96","value":"96"},{"label":"97","value":"97"},{"label":"98","value":"98"},{"label":"99","value":"99"},{"label":"100","value":"100"},{"label":"101","value":"101"},{"label":"102","value":"102"},{"label":"103","value":"103"},{"label":"104","value":"104"},{"label":"105","value":"105"},{"label":"106","value":"106"},{"label":"107","value":"107"},{"label":"108","value":"108"},{"label":"109","value":"109"},{"label":"110","value":"110"},{"label":"111","value":"111"},{"label":"112","value":"112"},{"label":"113","value":"113"},{"label":"114","value":"114"},{"label":"115","value":"115"},{"label":"116","value":"116"},{"label":"117","value":"117"},{"label":"118","value":"118"},{"label":"119","value":"119"},{"label":"120","value":"120"}]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.age = parseInt(value);
                  this.setState({ clientInfo: clientInfo },()=>{this.updateCalculatorValues(null,null)});
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


          {/* GENDER SELECT */}
          <View style={styles.calculatorTermsWrap}>
            <Text>Gender</Text>
            <View style={styles.calculatorTermDropDown}>
              <RNPickerSelect
                items={[{"label":"Male","value":"M"},{"label":"Female","value":"F"}]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.gender = value;
                  this.setState({ clientInfo: clientInfo },()=>{this.updateCalculatorValues(null,null)});
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker5.togglePicker();
                }}
                style={{icon: {marginTop:-16, marginRight:-8}}}
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
                items={[{"label":"Yes","value":"Cigarettes"},{"label":"No","value":"None"}]}
                onValueChange={(value) => {
                  clientInfo = this.state.clientInfo;
                  clientInfo.tobacco = value;
                  this.setState({ clientInfo: clientInfo },()=>{this.updateCalculatorValues(null,null);});
                }}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker6.togglePicker();
                }}
                style={{icon: {marginTop:-16, marginRight:-8}}}
                value={this.state.clientInfo.tobacco}
                ref="ages"
              />
            </View>
          </View>

        </ScrollView>

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


          {this.calculatorHiddenNotices.map((o,k)=>{
            <CalculatorProduct/>
          })}

          {/*{Providers.map(function(provider){*/}
            {/*provider.products.map(function(product){*/}
              {/*product.calculator.products.map(function(calculatorProduct){*/}
                {/*productsRender.push(renderCalculatorProduct(provider,product,calculatorProduct));*/}
                {/*// console.log("--- Rendering ---");*/}
              {/*})*/}
            {/*})*/}
          {/*})}*/}

          {/*{productsRender}*/}

          <Text>&nbsp;</Text>

        </ScrollView>
        {/*{this.renderProviderStatus(Providers)}*/}
      </View>
    )
  }


}