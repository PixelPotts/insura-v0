import React, { Component } from 'react';
import { MediaQuery } from "react-native-responsive-ui";
import Device from "react-native-responsive-ui/lib/Device";
import MediaQuerySelector from "react-native-responsive-ui/lib/MediaQuerySelector";
const {width, height} = Device.dimensions.window;
const PHONE = MediaQuerySelector.query({ orientation: "portrait", minHeight: 1 }, width, height)
import styles from './styles'

export default class CalculatorProduct extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    if(PHONE)
      return(
        <View style={styles.calculatorCompanyWrap_portrait} key={calculatorProduct.id}>
          <View>
            <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',borderWidth:0, borderColor: 'orange'}}>
            <View>
              <Image source={logos[provider.id]} style={styles.calculatorLogo}/>
            </View>
            {available !== false && (
              <View>
                <View style={styles.calculatorProductPeriodCostWrapProduct_portrait}>
                  <View style={styles.calculatorProductPeriodCostWrap_portrait}>
                    <Text style={styles.calculatorProductWrapTitle}>Monthly</Text>
                    <Text style={styles.calculatorProductWrapSubtitle_portrait}>
                      ${number_format(this.state.calculator[calculatorProduct.id].month,2)}
                    </Text>
                  </View>
                  <View style={styles.calculatorProductPeriodCostWrap_portrait}>
                    <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
                    <Text style={styles.calculatorProductWrapSubtitle_portrait}>
                      ${number_format(this.state.calculator[calculatorProduct.id].annual,2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {available === false && (
              <View>
                {this.state.calculatorHiddenNotices[calculatorProduct.id].short.map((notice,k)=>{
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
            <View style={[styles.calculatorProductPeriodCostWrap,{marginLeft: 30}]}>
              <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
              <Text style={styles.calculatorProductWrapSubtitle}>
                ${number_format(this.state.calculator[calculatorProduct.id].annual,2)}
              </Text>
            </View>
          </View>
        )}
        {available === false && (
          <View style={styles.calculatorProductWrap}>
            <Image source={logos[provider.id]} style={styles.calculatorLogo}/>
            <View style={styles.calculatorProductPeriodCostWrapProduct}>
              <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
            </View>
            <View>
              {this.state.calculatorHiddenNotices[calculatorProduct.id].short.map((notice,k)=>{
                console.log("NOTICE:");
                console.log(notice);
                return (<Text key={k}>{notice}</Text>)
              })}
            </View>
          </View>
        )}
      </View>
    )
  }


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