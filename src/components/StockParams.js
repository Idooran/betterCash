import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TabsSection from "./ui/TabsSection";
import Slider from "./ui/Slider";
import PieChart from "./ui/PieChart";
import BarChart from "./ui/BarChart";

const useStyles = makeStyles(theme => ({
  paramsRowContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  paramValueWrapper: {
    width: "100%",
    "&:first-child": {
      marginRight: "18px"
    }
  },
  minMaxContaier: {
    display: "flex",
    justifyContent: "space-between"
  },
  slider: {
    padding: 0
  },
  paramName: {
    fontSize: "1rem",
    marginBottom: theme.spacing(1)
  },
  paramValue: {
    fontSize: "0.8rem",
    color: "#2ecb98",
    marginLeft: theme.spacing(1)
  },
  minMax: {
    fontWeight: 300,
    fontFamily: "Roboto",
    fontSize: "0.8rem"
  },
  barChartWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  pieChartWrapper: {
    marginTop: theme.spacing(3)
  },
  pieChartTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(3)
  }
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

    console.log(stockParmas.revenueGrowth);

    return (
      <Grid>
        <Grid className={classes.paramsRowContainer}>
          {renderParamSlider(stockParmas.revenue, "Revenue")}
          {renderParamSlider(stockParmas.revenueGrowth, "Revenue Growth")}
        </Grid>
        <Grid className={classes.paramsRowContainer}>
          {renderParamSlider(stockParmas.earning, "Earning")}
          {renderParamSlider(stockParmas.earningGrowh, "Earning Growth")}
        </Grid>
        <Grid className={classes.paramsRowContainer}>
          {renderParamSlider(stockParmas.pe, "P/E")}
          {renderParamSlider(stockParmas.divYieldReturn, "Div Yield")}
        </Grid>
        <Grid className={classes.barChartWrapper}>
          <BarChart className={classes.barChart} data={{ volume: stockParmas.volume, avgVolume: stockParmas.avgVolume }} />
        </Grid>
        <Grid className={classes.pieChartWrapper}>
          <Typography className={classes.pieChartTitle}>What is their market share in their sector?</Typography>
          <PieChart data={stockParmas.expenses} />
        </Grid>
      </Grid>
    );
  };

  const renderParamSlider = (values, paramName) => {
    return (
      <Grid className={classes.paramValueWrapper}>
        <Typography className={classes.paramName}>{paramName}</Typography>
        <Typography className={classes.paramValue}>{values.current}</Typography>
        <Slider valueLabelDisplay="auto" className={classes.slider} aria-label="pretto slider" defaultValue={values.current} min={values.min} max={values.max} />
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

const mapStateToProps = state => {
  return {
    stockParmas: state.stockData.stockParams
  };
};

export default connect(mapStateToProps, null)(StockParams);
