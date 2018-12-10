const defaultState = {
  activeSubscription: false,
  subscriptionPlan: undefined,
};

export const inAppPurchaseReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'SET_ACTIVE_SUBSCRIPTION':
      return {
        ...state,
        activeSubscription: action.activeSubscription,
        subscriptionPlan: action.subscriptionPlan
      }

    default:
      return state;
  }

};

export default inAppPurchaseReducer;
