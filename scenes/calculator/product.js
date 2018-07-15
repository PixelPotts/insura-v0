import React, { Component } from 'react'
import {
  View
} from 'react-native'


export default class RenderCalculatorProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // props: provider, product, calculatorProduct


  // console.log("=== renderCalculatorProduct() ===");
  // console.log(provider);
  // console.log(product);
  // console.log(calculatorProduct);
  // console.log(this.state.calculatorHiddenProducts);

  renderStarRating = (productId) => {
    const ratings = {200: 4, 201: 5, 202: 4, 203: 5, 2021: 3, 2031: 4, 2041: 3};
    const rating = productId in ratings ? ratings[productId] : _.random(2, 5);
    return (<Text style={{color: '#b0b10d'}}>{_.repeat('★', rating)}{"\n"} {rating} stars </Text>)
  }

  render() {
    // Hide products from the hide array
    // console.log('index check:')
    // console.log(_.indexOf(this.state.calculatorHiddenProducts,calculatorProduct.id))

    if (_.indexOf(this.state.calculatorHiddenProducts, calculatorProduct.id) != -1) return false
    if (this.state.calculator[calculatorProduct.id].annual === 0) return false;

    if (PHONE)
      return (
        <View style={styles.calculatorCompanyWrap_portrait} key={calculatorProduct.id}>
          <View>
            <Text style={styles.calculatorProductWrapProduct}>{calculatorProduct.name}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'orange'}}>
            <View>
              <Image source={logos[provider.id]} style={styles.calculatorLogo}/>
            </View>
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
          </View>
        </View>
      )
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
              ${number_format(this.state.calculator[calculatorProduct.id].month, 2)}
            </Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            <Text style={styles.calculatorProductWrapTitle}>Annual</Text>
            <Text style={styles.calculatorProductWrapSubtitle}>
              ${number_format(this.state.calculator[calculatorProduct.id].annual, 2)}
            </Text>
          </View>
          <View style={styles.calculatorProductPeriodCostWrap}>
            {/*{renderStarRating(calculatorProduct.id)}*/}
          </View>
        </View>
      </View>
    )
  }
}