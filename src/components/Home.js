import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { setStock } from "../actions";

import StockGraph from "./StockGraph";
import StockInfo from "./StockInfo";
import StockParams from "./StockParams";

const useStyles = makeStyles((theme) => ({
  discalmierWrapper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  discalmier: {
    color: "white",
    fontSize: "0.8rem",
  },
  container: {
    background: "black",
  },
  loadingBar: {
    margin: "0 auto",
  },
  loadingBarWrapper: {
    width: "100%",
    height: "100vh",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
  },
}));

const Home = ({ setStock, tickerNotFound, stockInfo }) => {
  const classes = useStyles();
  const [showLoading, setShowLoading] = useState(true);

  const pathName = useLocation().pathname;
  const history = useHistory();

  if (pathName === "/" || tickerNotFound) {
    history.push("/not-found");
  }

  useEffect(() => {
    setStock(pathName.slice(1, pathName.length).toUpperCase());
  }, []);

  return stockInfo ? (
    <Grid className={classes.container}>
      <StockInfo />
      <StockGraph />
      <StockParams />
      <Grid className={classes.discalmierWrapper}>
        <Typography variant="subtitle-1" className={classes.discalmier}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Grid>
    </Grid>
  ) : showLoading ? (
    <Grid className={classes.loadingBarWrapper}>
      <CircularProgress variant="indeterminate" disableShrink className={classes.loadingBar} size={40} thickness={8} />
    </Grid>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    tickerNotFound: state.stockData.tickerNotFound,
    stockInfo: state.stockData.stockInfo,
  };
};

export default connect(mapStateToProps, { setStock })(Home);
