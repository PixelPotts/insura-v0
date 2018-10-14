"use strict";


let stripe_url = 'https://api.stripe.com/v1/';
let stripe_mode = 'PROD';
const stripe_test_key = "sk_test_4pJ7hGg9yxZxZCXibtxvzphX";
const stripe_prod_key = "sk_live_c8NPJO5bonIsTxjtryiEwmrN";
const STRIPE_API_KEY = stripe_mode === "PROD" ? stripe_prod_key : stripe_test_key;
console.log("Stripe API Key: "+STRIPE_API_KEY);

module.exports.createCardToken = function (cardNumber, expMonth, expYear, cvc) {
  let cardDetails = {
    "card[number]": cardNumber,
    "card[exp_month]": expMonth,
    "card[exp_year]": expYear,
    "card[cvc]": cvc
  };

  let formBody = [];
  for (let property in cardDetails) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return fetch(stripe_url + 'tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + STRIPE_API_KEY
    },
    body: formBody
  }).then(res=>res.json());
};

module.exports.createCustomer = function (tokenId,uid='unknown') {
  let fields = {
    description: `Subscription for Customer Id: `+uid,
    source: tokenId
  };

  let formBody = [];
  for (let property in fields) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(fields[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(stripe_url + 'customers', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + STRIPE_API_KEY
    },
    body: formBody
  }).then(res=>res.json());
};

module.exports.subscribe = function (customerId,planId) {
  return fetch(stripe_url + 'subscriptions', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + STRIPE_API_KEY
    },
    body: "items[0][plan]=" +encodeURIComponent(planId)
          +"&customer=" +encodeURIComponent(customerId)
  }).then(res=>res.json());
};
