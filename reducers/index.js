import { combineReducers } from "redux";
import supportReducer from './supportReducer';
import inAppPurchaseReducer from './inAppPurchaseReducer'


export default combineReducers({
  supportReducer,
  inAppPurchaseReducer
});