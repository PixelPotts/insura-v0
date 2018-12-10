export const setActiveSubscription = (activeSubscription, subscriptionPlan) => {
  return {
    type: 'SET_ACTIVE_SUBSCRIPTION',
    activeSubscription,
    subscriptionPlan
  };
};