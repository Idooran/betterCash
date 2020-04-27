import React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme";
import { setStock } from "./actions";

import StockGraph from "./components/StockGraph";
import StockInfo from "./components/StockInfo";
import StockParams from "./components/StockParams";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "black"
  },
  linksContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    "&:first-child": {
      backgroundColor: "white"
    }
  },
  linkWrapper: {
    display: "flex",
    width: "100%",
    backgroundColor: "black"
  },
  stockDataContainer: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "baseline"
  },
  discalimerContainer: {
    backgroundColor: "black",
    color: "white",
    margin: theme.spacing(2)
  },
  link: {
    color: "white",
    width: "100%",
    textAlign: "center",
    borderRight: "1px solid #fff"
  },
  lastLink: {
    border: "none"
  }
}));

function App({ setStock }) {
  const classes = useStyles();

  const stock = window.location.pathname.replace("/", "");
  setStock(stock);

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <StockInfo />
        <StockGraph />
        <StockParams />
        <div className={classes.discalimerContainer}>
          <Typography variant="subtitle-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </div>
        <Grid className={classes.linksContainer}>
          {["Help", "About", "TOS", "Privacy"].map((link, index) => {
            var className = index == 3 ? `${classes.link} ${classes.lastLink}` : classes.link;

            return (
              // <Typography variant="button" gutterBottom className={className}>
              <Typography variant="button" gutterBottom className={className}>
                {link}
              </Typography>
            );
          })}
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default connect(null, { setStock })(App);
