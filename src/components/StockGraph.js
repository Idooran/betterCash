import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "../theme";
import { setGraphMode } from "../actions";
import { ONE_DAY, FIVE_DAYS, ONE_MONTH, SIX_MONTHS, YTD, ONE_YEAR, FIVE_YEAR, MAX } from "../consts";

const graphModes = [ONE_DAY, FIVE_DAYS, ONE_MONTH, SIX_MONTHS, YTD, ONE_YEAR, FIVE_YEAR, MAX];

const useStyles = makeStyles(theme => ({
  continer: {
    backgroundColor: "black"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  modeContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2)
  },
  stockDataContainer: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "baseline"
  },
  mode: {
    color: "white",
    width: "100%",
    textAlign: "center",
    borderRight: "1px solid #fff"
  },
  lastMode: {
    borderRight: "none"
  },
  selectedMode: {
    fontWeight: "bold",
    color: "white"
  },
  modeWrapper: {
    display: "flex",
    width: "100%"
  },
  stockData: {
    color: "white"
  },
  stockPrice: {
    marginRight: theme.spacing(2),
    fontFamily: "Roboto"
  },
  stockChangePositve: {
    color: "green"
  },
  stockChangeNegative: {
    color: "red"
  },
  upArrow: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1) * 0.5,
    borderBottom: "12px solid green",
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent"
  },
  downArrow: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1) * 0.5,
    borderTop: "8px solid #f00",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  chartContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

const adjustedGraphDataToMode = (graphData, graphMode) => {
  var tickerFormat = "";
  if (graphData.length > 0) {
    switch (graphMode) {
      case ONE_DAY:
        // take all relavent dates and parse them by the mode
        tickerFormat = "HH:mm";
        const maxDayDataRecord = 78;
        graphData = _.reverse(graphData.slice(0, maxDayDataRecord));
        break;
      case FIVE_DAYS:
        tickerFormat = "HH:mm";
    }
  }

  return [graphData, tickerFormat];
};

const StockGraph = ({ graphData, graphMode, stockData, setGraphMode }) => {
  const classes = useStyles();

  console.log("graphData", graphData);

  var [graphData, tickerFormat] = adjustedGraphDataToMode(graphData, graphMode);

  const gradientOffset = () => {
    const dataMax = Math.max(...graphData.map(i => i.open));
    const dataMin = Math.min(...graphData.map(i => i.open));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const rednerGraph = () => {
    return (
      <Grid className={classes.chartContainer}>
        <AreaChart
          margin={{
            top: 0,
            right: theme.spacing(1),
            left: theme.spacing(1),
            bottom: 0
          }}
          width={window.screen.availWidth * 0.9}
          height={300}
          data={graphData}
          horizontal={false}
        >
          <XAxis dataKey="date" interval="preserveStartEnd" type="category" tickCount="10" tickFormatter={timeStr => moment(timeStr).format(tickerFormat)} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#05c66e" stopOpacity={0.49} />
              <stop offset={off} stopColor="#fc2828" stopOpacity={0.49} />
            </linearGradient>
          </defs>
          <YAxis hide="true" type="number" domain={["auto", "auto"]} />

          <Area dataKey="open" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
      </Grid>
    );
  };

  const renderGrpahInfo = () => {
    const stockPriceUp = stockData.changes > 0;
    const stockPriceClass = stockPriceUp ? classes.stockChangePositve : classes.stockChangeNegative;

    const priceIndcator = stockPriceUp ? classes.upArrow : classes.downArrow;

    return (
      <Grid className={classes.infoContainer}>
        <Grid className={classes.modeContainer}>
          {graphModes.map((mode, index) => {
            let className = mode === graphMode ? `${classes.selectedMode} ${classes.mode}` : classes.mode;
            if (index == graphModes.length - 1) className = `${className} ${classes.lastMode}`;

            return (
              <Typography onClick={e => setGraphMode(mode)} variant="button" gutterBottom className={className}>
                {mode}
              </Typography>
            );
          })}
        </Grid>

        {/* open value and change */}
        <Grid className={classes.stockDataContainer}>
          <Typography variant="h5" className={`${classes.stockData} ${classes.stockPrice}`}>
            {stockData.price}
          </Typography>
          <div className={priceIndcator}></div>
          <Typography variant="subtitle-1" className={stockPriceClass}>
            {stockData.changes}
          </Typography>
          <Typography variant="subtitle-1" gutterBottom className={stockPriceClass}>
            {stockData.changesPercentage}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const off = gradientOffset();

  console.log("stockData", stockData);

  return !stockData ? null : (
    <Grid className={classes.continer}>
      {renderGrpahInfo()}
      {rednerGraph()}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    graphData: state.stockData.graph.data,
    graphMode: state.stockData.graph.mode,
    stockData: state.stockData.stockInfo
  };
};

export default connect(mapStateToProps, { setGraphMode })(StockGraph);
