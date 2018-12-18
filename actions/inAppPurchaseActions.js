export const setActiveSubscription = (activeSubscription, subscriptionPlan) => {
  return {
    type: 'SET_ACTIVE_SUBSCRIPTION',
    activeSubscription,
    subscriptionPlan
  };
};

export const setAvailableProducts = (availableProducts) => {
  return {
    type: 'SET_AVAILABLE_PRODUCTS',
    availableProducts
  };
};

export const setCookedProducts = (cookedProducts) => {
  return {
    type: 'SET_COOKED_PRODUCTS',
    cookedProducts
  };
};

export const selectProduct = (selectedProductToPurchase) => {
  return {
    type: 'SELECT_PRODUCT',
    selectedProductToPurchase
  };
};
