const defaultState = {
  activeSubscription: false,
  subscriptionPlan: undefined,
  availableProducts: [],
  cookedProducts: [],
  selectedProductToPurchase: undefined
};

export const inAppPurchaseReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'SET_ACTIVE_SUBSCRIPTION':
      return {
        ...state,
        activeSubscription: action.activeSubscription,
        subscriptionPlan: action.subscriptionPlan
      }
    case 'SET_AVAILABLE_PRODUCTS':
      return {
        ...state,
        availableProducts: action.availableProducts,
      }
    case 'SET_COOKED_PRODUCTS':
      return {
        ...state,
        cookedProducts: action.cookedProducts,
      }
    case 'SELECT_PRODUCT':
      return {
        ...state,
        selectedProductToPurchase: action.selectedProductToPurchase,
      }

    default:
      return state;
  }

};

export default inAppPurchaseReducer;
