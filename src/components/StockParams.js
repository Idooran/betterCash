import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GaugeChart from "react-gauge-chart";
import TabsSection from "./ui/TabsSection";
import Slider from "./ui/Slider";
import PieChart from "./ui/PieChart";
import { convertToBigNumberFormat } from "../helpers";

const useStyles = makeStyles((theme) => ({
  paramsContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paramValueWrapper: {
    width: "100%",
  },
  minMaxContaier: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
  },
  slider: {
    padding: 0,
  },
  paramName: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
  },
  paramValue: {
    fontSize: "0.8rem",
    color: "#2ecb98",
    marginLeft: theme.spacing(1),
  },
  minMax: {
    fontWeight: 300,
    fontFamily: "Roboto",
    fontSize: "0.8rem",
  },
  negative: {
    color: "red",
  },
  gaugeChartWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  chartTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  pieChartWrapper: {
    marginTop: theme.spacing(3),
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#4a4a4a",
  },
  sliderWrapper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pieChartTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  sliderTitle: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
  sliderText: {
    textAlign: "center",
    marginBottom: theme.spacing(0.5),
    color: (props) => (props.epsPostive ? "#2ecb98" : "#2ecb98"),
  },
  epsContianer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const StockParams = ({ stockParmas }) => {
  const classes = useStyles();

  const rednerStandAlone = () => {
    // marekt cap
    // free cash flow
    // revenue
    // revnue growth
    // Earnings
    // Earnings Growh
    // P/E
    // div yield

    // bars - volume | avg volume
    // eps / revenue ??

    // in a line indcies included | alpha | beta

    // pie charts what are they spending there money on

    // pie charts market share

    const calcVolumeProperties = (volume, avgVolume) => {
      let volumePercent, volumeBeginColor, volumeEndColor;

      if (volume >= avgVolume) {
        volumeBeginColor = "#4a4a4a";
        volumeEndColor = "#11b067";
        volumePercent = volume / (avgVolume * 2);
        volumePercent = volumePercent > 1 ? 1 : volumePercent;
      } else {
        volumeBeginColor = "#f63549";
        volumeEndColor = "#4a4a4a";
        volumePercent = volume / (avgVolume * 2);
      }

      return [volumePercent, volumeBeginColor, volumeEndColor];
    };

    const [volumePercent, volumeBeginColor, volumeEndColor] = calcVolumeProperties(stockParmas.volume, stockParmas.avgVolume);

    return (
      <Grid>
        <Grid container spacing={3} className={classes.paramsContainer}>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.marketCap, "Market Cap")}
          </Grid>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.cashFlow, "Free Cash Flow")}
          </Grid>

          <Grid item xs={6}>
            {renderParamSlider(stockParmas.revenue, "Revenue")}
          </Grid>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.revenueGrowth, "Revenue Growth")}
          </Grid>

          <Grid item xs={6}>
            {renderParamSlider(stockParmas.earning, "Earning")}
          </Grid>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.earningGrowh, "Earning Growth")}
          </Grid>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.pe, "P/E")}
          </Grid>
          <Grid item xs={6}>
            {renderParamSlider(stockParmas.divYieldReturn, "Div Yield")}
          </Grid>
        </Grid>
        <Grid className={classes.gaugeChartWrapper}>
          <Typography className={classes.chartTitle}>{`Volume ${convertToBigNumberFormat(stockParmas.volume)}`}</Typography>

          <GaugeChart id="gauge-chart" hideText={true} animate={false} nrOfLevels={6} colors={[volumeBeginColor, volumeEndColor]} percent={volumePercent} />

          <Typography className={classes.chartTitle}>{`Avg Volume ${convertToBigNumberFormat(stockParmas.avgVolume)}`}</Typography>
        </Grid>

        <Grid className={`${classes.sliderContainer} ${classes.epsContianer}`}>
          <Typography className={classes.sliderTitle}>EPS</Typography>
          <Typography className={classes.sliderText}>${stockParmas.eps.current}</Typography>
          <Grid className={classes.sliderWrapper}>
            <Slider valueLabelDisplay="auto" aria-label="pretto slider" displayMode="thick" defaultValue={stockParmas.eps.current} min={stockParmas.eps.min} max={stockParmas.eps.max} className={classes.slider} />
          </Grid>
        </Grid>

        <Grid className={classes.pieChartWrapper}>
          <Typography className={classes.pieChartTitle}>What are they spending their money on?</Typography>
          <PieChart data={stockParmas.expenses} />
        </Grid>
      </Grid>
    );
  };

  const renderParamSlider = (values, paramName) => {
    // fix thsi
    const negativeValue = values.current < 0;

    return (
      <Grid className={classes.paramValueWrapper}>
        <Typography className={classes.paramName}>{paramName}</Typography>
        <Typography className={classes.paramValue + " " + (negativeValue ? classes.negative : "")}>{convertToBigNumberFormat(values.current)}</Typography>
        <Slider valueLabelDisplay="auto" negtaive={negativeValue} className={classes.slider} aria-label="pretto slider" defaultValue={values.current} min={values.min} max={values.max} />
        <Grid className={classes.minMaxContaier}>
          <Typography className={classes.minMax}>Min</Typography>
          <Typography className={classes.minMax}>Max</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderCompared = () => {
    return <div>compared</div>;
  };

  return !stockParmas ? null : <TabsSection standAloneContent={rednerStandAlone()} comparedContent={renderCompared()} />;
};

const mapStateToProps = (state) => {
  return {
    stockParmas: state.stockData.stockParams,
  };
};

export default connect(mapStateToProps, null)(StockParams);
