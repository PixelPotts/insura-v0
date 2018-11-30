const state = {
  client: {
    firstName,
    middleName,
    lastName,
    gender,
    age,
    dob,
    height,
    weight,
    street1,
    street2,
    city,
    state,
    zip,
    race,
    ssn,
    tobacco,
    clientHistoryVisible,
    clientHistory: [],
  },
  question: {
    activeQuestionId,
    activeButtonId,
    questionCounter,
    buttons: [],
    autoSuggestVisable,
    autoSuggestOptions: [],
    answerButtonsVisible,
  },
  blink: {
    BlinkShowImage,
    BlinkResultImage,
    BlinkResults,
    BlinkLicenseKeyErrorMessage,
  },
  providers: {

  },
  calculator: {
    calculatorVisible,
    calculatorPositionX,
    calculatorFaceValue,
    calculatorTerms,
    calculatorHiddenProducts,
    calculatorHiddenNotices,
    calculatorClientAge,
    calculatorCounter,
    calculator,
  },
  registration: {
    registerVisible,
    registerFullName,
    registerEmail,
    registerPhone,
    registerPhoneResult,
    registerPassword,
    registerConfirmPassword,
    registerCC,
    registerCCStatuses,
    refisterCCValid,
    registerPlanID,
  },
  login: {
    loginVisible,
    loginEmail,
    loginPassword,
  },
  resetPassword: {
    resetPasswordVisible
  },
  menu: {
    menuVisible,
    menuPosition,
  },
  support: {
    supportVisible,
      supportInput,
      supportMessages: [],
  },
  underWrighting: {
    underwritingNotices,
  },
  instructions: {
    instructionsVisible
  }
}