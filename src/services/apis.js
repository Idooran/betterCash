import axios from "axios";
import moment from "moment";

import { ONE_DAY, FIVE_DAYS, ONE_MONTH, SIX_MONTHS, YTD, ONE_YEAR, FIVE_YEAR, MAX } from "../consts";

const host = "https://financialmodelingprep.com";

// gets  sector, description
export const profileApi = (stockId) => axios.get(host + `/api/v3/company/profile/${stockId}`);

// market cap & volume, P/E
export const quotesApi = (stockId) => axios.get(host + `/api/v3/quote/${stockId}`);

// free cash flow, revenue, revenueGrowth,Earning
export const financeApi = (stockId) => axios.get(host + `/api/v3/financials/income-statement/${stockId}`);

// earningGrowth
export const financeGrowthApi = (stockId) => axios.get(host + `/api/v3/financial-statement-growth/${stockId}`);

// Div Yield
export const companyMatrixApi = (stockId) => axios.get(host + `/api/v3/company-key-metrics/${stockId}`);

export const cashFlowApi = (stockId) => axios.get(host + `/api/v3/financials/cash-flow-statement/${stockId}`);

// sector performance
export const sectorApi = () => axios.get(host + "/api/v3/stock/sectors-performance");

export const graphApi = (stockId, mode) => {
  let endPoint;
  switch (mode) {
    case ONE_DAY:
      endPoint = `/api/v3/historical-chart/5min/${stockId}`;
      break;
    case FIVE_DAYS:
      endPoint = `/api/v3/historical-chart/15min/${stockId}`;
      break;
    case ONE_MONTH:
      endPoint = `/api/v3/historical-price-full/${stockId}?from=${getMonth(1)}&to=${getToday()}`;
      break;
    case SIX_MONTHS:
      endPoint = `/api/v3/historical-price-full/${stockId}?from=${getMonth(6)}&to=${getToday()}`;
      break;
    case YTD:
      endPoint = `/api/v3/historical-price-full/${stockId}?from=${getFromYear()}&to=${getToday()}`;
      break;
    case ONE_YEAR:
      endPoint = `/api/v3/historical-price-full/${stockId}?from=${getYear(1)}&to=${getToday()}`;
      break;
    case FIVE_YEAR:
      endPoint = `/api/v3/historical-price-full/${stockId}?from=${getYear(5)}&to=${getToday()}`;
      break;
    case MAX:
      endPoint = `/api/v3/historical-price-full/${stockId}`;
  }

  console.log("host + endPoint", host + endPoint);

  return axios.get(host + endPoint);
};

const getToday = () => {
  return moment().format("YYYY-MM-DD");
};

const getMonth = (interval) => {
  return moment().subtract(interval, "month").format("YYYY-MM-DD");
};

const getFromYear = () => {
  return `${moment().year()}-01-01`;
};

const getYear = (interval) => {
  return moment().subtract(interval, "year").format("YYYY-MM-DD");
};
