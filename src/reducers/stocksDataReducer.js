import { SET_STOCK, FETCH_STOCK_DATA, FETCH_STOCK_INFO, FETCH_STOCK_PARMS, FETCH_GRPAH_DATA, SET_GRPAH_MODE } from "../actions/types";

const INIT_STATE = {
  stock: "",
  graph: { data: [], mode: "1D" },
  stockInfo: null,
  stockParams: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_STOCK:
      return { ...state, stock: action.payload };
    case FETCH_STOCK_INFO:
      return { ...state, ["stockInfo"]: action.payload };
    case FETCH_STOCK_PARMS:
      return { ...state, ["stockParams"]: action.payload };
    case SET_GRPAH_MODE:
      return { ...state, graph: { data: state.graph.data, mode: state.graph.mode } };
    case FETCH_GRPAH_DATA: {
      return { ...state, graph: { data: action.payload, mode: state.graph.mode } };
    }
    default:
      return state;
  }
};
