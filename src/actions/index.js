import _ from "lodash";
import fromExponential from "from-exponential";
import { FETCH_STOCK_DATA, TICKER_NOT_FOUND, SET_GRPAH_MODE, SET_STOCK, FETCH_STOCK_INFO, FETCH_STOCK_PARMS, FETCH_GRPAH_DATA } from "./types";
import { profileApi, quotesApi, financeApi, financeGrowthApi, companyMatrixApi, cashFlowApi, sectorApi, graphApi } from "../services/apis";

const stockInfoProps = ["sector", "price", "beta", "changes", "changesPercentage", "description", "exchange", "companyName"];

export const setStock = (stockName) => async (disptach, getState) => {
  disptach({
    type: SET_STOCK,
    payload: stockName,
  });

  const profileRes = await profileApi(stockName);
  console.log("profileRes", profileRes.data);

  if (Object.keys(profileRes.data).length === 0) {
    disptach({ type: TICKER_NOT_FOUND });

    return;
  }

  const quotesRes = await quotesApi(stockName);
  const finacneRes = await financeApi(stockName);
  const financeGrowthRes = await financeGrowthApi(stockName);
  const companyMatrixRes = await companyMatrixApi(stockName);
  const cashFlowRes = await cashFlowApi(stockName);
  const sectorRes = await sectorApi(stockName);

  const stockInfoData = getStockInfoData(profileRes, sectorRes);
  const stockParamsData = getStockParamsData(quotesRes, finacneRes, financeGrowthRes, companyMatrixRes, cashFlowRes);

  disptach({ type: FETCH_STOCK_INFO, payload: stockInfoData });
  disptach({ type: FETCH_STOCK_PARMS, payload: stockParamsData });

  setGraphMode(getState().stockData.graph.mode)(disptach, getState);
};

const getStockInfoData = (profileRes, sectorRes) => {
  const stockInfo = {};

  stockInfoProps.forEach((prop) => {
    stockInfo[prop] = profileRes.data.profile[prop];
  });

  const sectorData = sectorRes.data.sectorPerformance.find((sectorData) => sectorData.sector === stockInfo.sector);

  const changesPercentageNumericValue = parseFloat(sectorData.changesPercentage.slice(0, sectorData.changesPercentage.length - 1)).toFixed(2);

  stockInfo.sectorGrowth = `${changesPercentageNumericValue}%`;
  return stockInfo;
};

const getStockParamsData = (quotesRes, finacneRes, financeGrowthRes, companyMatrixRes, cashFlowRes) => {
  const stockParamsData = {};

  stockParamsData["marketCap"] = buildScaleFromParam(quotesRes.data, "marketCap");
  stockParamsData["volume"] = buildScaleFromParam(quotesRes.data, "volume");
  stockParamsData["pe"] = buildScaleFromParam(quotesRes.data, "pe");

  stockParamsData["revenue"] = buildScaleFromParam(finacneRes.data.financials, "Revenue");
  stockParamsData["revenueGrowth"] = buildScaleFromParam(finacneRes.data.financials, "Revenue Growth");
  stockParamsData["eps"] = buildScaleFromParam(finacneRes.data.financials, "EPS");

  stockParamsData["cashFlow"] = buildScaleFromParam(cashFlowRes.data.financials, "Free Cash Flow");

  stockParamsData["earning"] = buildScaleFromParam(finacneRes.data.financials, "Net Income");
  stockParamsData["earningGrowh"] = buildScaleFromParam(financeGrowthRes.data.growth, "Net Income Growth");

  stockParamsData["divYieldReturn"] = buildScaleFromParam(companyMatrixRes.data.metrics, "Dividend Yield");

  stockParamsData["expenses"] = {
    "R&D": parseFloat(finacneRes.data.financials[0]["R&D Expenses"]),
    "SG&A": parseFloat(finacneRes.data.financials[0]["SG&A Expense"]),
    Operating: parseFloat(finacneRes.data.financials[0]["Operating Expenses"]),
  };

  console.log("quotesRes.data", quotesRes.data);

  stockParamsData["volume"] = quotesRes.data[0]["volume"];

  stockParamsData["avgVolume"] = quotesRes.data[0]["avgVolume"];

  return stockParamsData;
};

const buildScaleFromParam = (allTimeData, param) => {
  const paramData = allTimeData.map((data) => parseFloat(parseFloat(data[`${param}`]).toFixed(2)));
  const current = paramData[0];

  const min = _.min(paramData);
  const max = _.max(paramData);

  return { current, min, max };
};

export const setGraphMode = (graphMode) => async (disptach, getState) => {
  const grapRes = await graphApi(getState().stockData.stock, graphMode);

  const graphData = grapRes.data.historical ? grapRes.data.historical : grapRes.data;

  disptach({ type: SET_GRPAH_MODE, payload: graphMode });
  disptach({ type: FETCH_GRPAH_DATA, payload: graphData });
};
