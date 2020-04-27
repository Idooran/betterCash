import { combineReducers } from "redux";

import stockDataReducer from "./stocksDataReducer";

export default combineReducers({
  stockData: stockDataReducer
});
