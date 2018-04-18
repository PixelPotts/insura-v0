/**
 * Sample React Native App for BlinkID
 * https://github.com/BlinkID/blinkid-react-native
 */

/**
 * Use these recognizer types
 * Available: RECOGNIZER_USDL, RECOGNIZER_MRTD, RECOGNIZER_EUDL, RECOGNIZER_DOCUMENT_FACE
 * RECOGNIZER_USDL - scans barcodes located on the back of US driver license
 * RECOGNIZER_MRTD - scans Machine Readable Travel Document, contained in various IDs and passports
 * RECOGNIZER_EUDL - scans the front of European driver license
 * RECOGNIZER_MYKAD - scans the front of Malaysian ID
 * RECOGNIZER_DOCUMENT_FACE - scans documents with face image and returns document images
 */

/**
 * There are several options you need to pass to scan function to add recognizers and to obtain the image and BlinkResults
 * available:
 * enableBeep : if it is set to true, successful scan will play a sound
 * useFrontCamera : if it is set to false, back camera is used, else front
 * shouldReturnCroppedImage : if true, cropped images in the recognition process will be returned
 * shouldReturnSuccessfulImage : if true, image on which scan gave valid scanning result will be returned
 * recognizers : array which contains recognizers that will be activated
 */

/**
 * Scan method returns scan fields in JSON format and image(s) (image is returned as Base64 encoded JPEG)
 * scanningResult.resultImageCropped : cropped document image
 * scanningResult.resultImageSuccessful : full image on which scan gave valid scanning result
 * scanningResult.resultList : array of scanning BlinkResults in JSON format (each activated recognizer can produce its own result)
 */


import React, { Component } from 'react';
import {BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys} from 'blinkid-react-native';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button
} from 'react-native';

const BlinkLicenseKey = Platform.select({
  // iOS license key for applicationID: org.reactjs.native.example.BlinkIDReactNative
  ios: '5XHL5ZTZ-3ODPWSUO-MGNXJVYF-HQ63APCA-6HS34T2M-NBHNVYJX-K37EXHIV-4IEXOAD3',
})

var renderIf = function(condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

export default class BlinkIDReactNative extends Component {
  constructor(props) {
    super(props);
    this.state = {BlinkShowImage: false,
      BlinkResultImage: '',
      BlinkResults: '',
      BlinkLicenseKeyErrorMessage: ''};
  }
  async scan() {
    try {
      const scanningResult = await BlinkID.scan(
        BlinkLicenseKey,
        {
          enableBeep: true,
          useFrontCamera: false,
          shouldReturnCroppedImage: true,
          shouldReturnSuccessfulImage: false,
          recognizers: [
            // scans documents with face image and returns document images
            // BlinkID.RECOGNIZER_DOCUMENT_FACE,
            // scans documents with MRZ (Machine Readable Zone)
            BlinkID.RECOGNIZER_MRTD,
            // scans USDL (US Driver License)
            BlinkID.RECOGNIZER_USDL,
            // scans EUDL (EU Driver License)
            BlinkID.RECOGNIZER_EUDL,
            // scans MyKad (Malaysian ID)
            BlinkID.RECOGNIZER_MYKAD
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
          if (recognizerResult.resultType == "USDL result") {
            // handle USDL parsing resul
            var fields = recognizerResult.fields
            // USDLKeys are keys from keys/usdl_keys.js
            resultsFormattedText += /** Personal information */
              "USDL version: " + fields[USDLKeys.StandardVersionNumber] + fieldDelim +
              "Family name: " + fields[USDLKeys.CustomerFamilyName] + fieldDelim +
              "First name: " + fields[USDLKeys.CustomerFirstName] + fieldDelim +
              "Date of birth: " + fields[USDLKeys.DateOfBirth] + fieldDelim +
              "Sex: " + fields[USDLKeys.Sex] + fieldDelim +
              "Eye color: " + fields[USDLKeys.EyeColor] + fieldDelim +
              "Height: " + fields[USDLKeys.Height] + fieldDelim +
              "Street: " + fields[USDLKeys.AddressStreet] + fieldDelim +
              "City: " + fields[USDLKeys.AddressCity] + fieldDelim +
              "Jurisdiction: " + fields[USDLKeys.AddressJurisdictionCode] + fieldDelim +
              "Postal code: " + fields[USDLKeys.AddressPostalCode] + fieldDelim +
              /** License information */
              "Issue date: " + fields[USDLKeys.DocumentIssueDate] + fieldDelim +
              "Expiration date: " + fields[USDLKeys.DocumentExpirationDate] + fieldDelim +
              "Issuer ID: " + fields[USDLKeys.IssuerIdentificationNumber] + fieldDelim +
              "Jurisdiction version: " + fields[USDLKeys.JurisdictionVersionNumber] + fieldDelim +
              "Vehicle class: " + fields[USDLKeys.JurisdictionVehicleClass] + fieldDelim +
              "Restrictions: " + fields[USDLKeys.JurisdictionRestrictionCodes] + fieldDelim +
              "Endorsments: " + fields[USDLKeys.JurisdictionEndorsementCodes] + fieldDelim +
              "Customer ID: " + fields[USDLKeys.CustomerIdNumber] + fieldDelim;
          }
          resultsFormattedText += '\n';
        }
        // image is returned as base64 encoded JPEG, we expect resultImageCorpped because we have activated obtaining of cropped images (shouldReturnCroppedImage: true)
        // to obtain image from successful scan, activate option (shouldReturnSuccessfulImage: true) and get is with scanningResult.resultImageSuccessful
        this.setState({ BlinkShowImage: scanningResult.resultImageCropped, BlinkResultImage: 'data:image/jpg;base64,' + scanningResult.resultImageCropped, BlinkResults: resultsFormattedText});
      }
    } catch(error) {
      this.setState({ BlinkShowImage: false, BlinkResultImage: '', BlinkResults: error.message});
    }

  }

  render() {
    let displayFields = this.state.BlinkResults;
    return (
      <View style={styles.BlinkContainer}>
        <Text style={styles.label}>MicroBlink Ltd</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.scan.bind(this)}
            title="Scan"
            color="#87c540"
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}y>
          {renderIf(this.state.BlinkShowImage,
            <View style={styles.imageContainer}>
              <Image
                resizeMode='contain'
                source={{uri: displayImage, scale: 3}} style={styles.imageResult}/>
            </View>
          )}
          <Text style={styles.BlinkResults}>{displayFields}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BlinkContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
  },
  buttonContainer: {
    margin: 20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('BlinkIDReactNative', () => BlinkIDReactNative);