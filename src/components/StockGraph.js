import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { setGraphMode } from "../actions";
import { ONE_DAY, FIVE_DAYS, ONE_MONTH, SIX_MONTHS, YTD, ONE_YEAR, FIVE_YEAR, MAX } from "../consts";

const graphModes = [ONE_DAY, FIVE_DAYS, ONE_MONTH, SIX_MONTHS, YTD, ONE_YEAR, FIVE_YEAR, MAX];

const useStyles = makeStyles((theme) => ({
  continer: {
    backgroundColor: "black",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  modeContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
  },
  stockDataContainer: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "baseline",
  },
  mode: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    borderRight: "1px solid #fff",
  },
  lastMode: {
    borderRight: "none",
  },
  selectedMode: {
    fontWeight: "bold",
    color: "white",
  },
  modeWrapper: {
    display: "flex",
    width: "100%",
  },
  stockData: {
    color: "white",
  },
  stockPrice: {
    marginRight: theme.spacing(2),
    fontFamily: "Roboto",
  },
  stockChangePositve: {
    color: "green",
  },
  stockChangeNegative: {
    color: "red",
  },
  upArrow: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1) * 0.5,
    borderBottom: "12px solid green",
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
  },
  downArrow: {
    width: 0,
    height: 0,
    marginRight: theme.spacing(1) * 0.5,
    borderTop: "8px solid #f00",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
  },
  chartContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "relative",
  },
  loadingBarWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    zIndex: (props) => (props.loading ? "10" : "-1"),
  },
  loadingBar: {
    margin: "0 auto",
  },
  loadingBarActive: {
    zIndex: "10",
  },
}));

const StockGraph = ({ graphData, graphMode, stockData, setGraphMode }) => {
  const [loading, setLoading] = useState(false);

  const classes = useStyles({ loading });

  const adjustedGraphDataToMode = (graphData, graphMode) => {
    let ticks = [];
    const orignalGraphData = [...graphData];
    if (graphData.length > 0) {
      switch (graphMode) {
        case ONE_DAY:
          let startDayRefUnix;
          const isoWeekDayValue = moment().isoWeekday();

          // if it's the weekend take friday's data
          if (isoWeekDayValue > 5) {
            const FRIDAY = 5;
            startDayRefUnix = moment()
              .subtract(`${isoWeekDayValue - FRIDAY}`, "day")
              .startOf("day")
              .unix();
          } else {
            startDayRefUnix = moment().startOf("day").unix();
          }

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).utc().unix() > startDayRefUnix)
            .reverse()
            .groupBy((data) => moment(data.date).format("HH"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();

          console.log(graphData.length == 0);
          // if there is no value get the day before
          if (graphData.length == 0) {
            startDayRefUnix = moment().subtract("1", "day").startOf("day").unix();

            graphData = _.chain(orignalGraphData)
              .filter((data) => moment(data.date).utc().unix() > startDayRefUnix)
              .reverse()
              .groupBy((data) => moment(data.date).format("HH"))
              .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
              .sortBy((entry) => parseInt(entry.date))
              .value();
          }

          // .map((data) => Object.assign({}, { open: data.open, date: moment(data.date).format("h A") }))

          // ticks = ["10 AM", "12 PM", "2 PM", "4 PM"];
          break;
        case FIVE_DAYS:
          // get closes monday opening
          const lastFiveDaysUnix = moment().subtract("1", "week").startOf("day").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > lastFiveDaysUnix)
            .reverse()
            .sortBy((entry) => parseInt(entry.date))
            .groupBy((data) => moment(data.date).format("dd"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            // .map((data) => Object.assign({}, { open: data.open, date: moment(data.date).format("dd") }))
            .value();
          // ticks = ["Mo", "Tu", "We", "Th", "Fr"];

          break;
        case ONE_MONTH:
          const monthAgoUnix = moment().subtract("1", "months").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > monthAgoUnix)
            .groupBy((data) => moment(data.date).weeks())
            .map((entries, date) => Object.assign({}, { date: moment(_.last(entries).date).format("MMM D"), open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();

          break;
        case SIX_MONTHS:
          const sixMonthAgoUnix = moment().subtract("6", "months").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > sixMonthAgoUnix)
            .groupBy((data) => moment(data.date).format("MMM"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();
          break;
        case YTD:
          const YTDUnix = moment().startOf("year").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > YTDUnix)
            .groupBy((data) => moment(data.date).format("MMM"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();
          break;

        case ONE_YEAR:
          const yearUnix = moment().subtract("1", "year").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > yearUnix)
            .groupBy((data) => moment(data.date).format("MMM"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();

          // show the first and middle month of the year
          ticks = [graphData[0].date, graphData[Math.round(graphData.length / 2)].date];
          break;

        default:
          const fiveYearsUnix = moment().subtract("5", "year").unix();

          graphData = _.chain(graphData)
            .filter((data) => moment(data.date).unix() > fiveYearsUnix)
            .groupBy((data) => moment(data.date).format("MMM, YY"))
            .map((entries, date) => Object.assign({}, { date, open: _.meanBy(entries, (entry) => entry.open) }))
            .sortBy((entry) => parseInt(entry.date))
            .value();

          // show the first and middle month of the year
          ticks = [graphData[0].date, graphData[Math.round(graphData.length / 2)].date];
      }
    }

    return [graphData, ticks];
  };

  let [data, xasixTicker] = adjustedGraphDataToMode(graphData, graphMode);

  const onModeChnage = (mode) => {
    setLoading(true);
    setGraphMode(mode);
  };

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, [graphData]);

  // <XAxis dataKey="date" interval="preserveStartEnd" tickCount="10" tickFormatter={(timeStr) => moment(timeStr).format(tickerFormat)} />

  const rednerGraph = () => {
    return (
      <Grid className={classes.chartContainer}>
        <Grid className={classes.loadingBarWrapper}>
          <CircularProgress variant="indeterminate" disableShrink className={classes.loadingBar} size={40} thickness={8} />
        </Grid>
        <AreaChart width={window.screen.availWidth * 0.9} height={300} data={data} horizontal={false}>
          <defs>
            <linearGradient id="positive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#05c66e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="negtaive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} ticks={xasixTicker} tick={{ fontSize: "14px", color: "white" }} tickLine={false} dataKey="date" interval="preserveStartEnd" tickCount="12" />

          <YAxis dataKey="open" hide={true} type="number" domain={["dataMin - 10", "dataMax + 8"]} />

          <Area dataKey="open" type="monotone" stroke="#white" fill={stockData.changes > 0 ? "url(#positive)" : "url(#negtaive)"} />
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
              <Typography onClick={(e) => onModeChnage(mode)} variant="button" gutterBottom className={className}>
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

  return !stockData ? null : (
    <Grid className={classes.continer}>
      {renderGrpahInfo()}
      {rednerGraph()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    graphData: state.stockData.graph.data,
    graphMode: state.stockData.graph.mode,
    stockData: state.stockData.stockInfo,
  };
};

export default connect(mapStateToProps, { setGraphMode })(StockGraph);
