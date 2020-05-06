import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Slider from "./ui/Slider";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "black",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
  },
  seprator: {
    border: "1px solid #fff",
    width: "50%",
    margin: "auto 0 auto 0",
  },
  titleContainer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    whiteSpace: "nowrap",
  },
  companyInfoContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  text: {
    color: "#ffffff",
  },
  header: {
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.53,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#ffffff",
    whiteSpace: "pre-wrap",
  },
  companyName: {
    fontWeight: 500,
    marginTop: "20%",
  },
  sectorGrowthContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  slider: {
    width: "30%",
    padding: 0,
    marginLeft: theme.spacing(2),
  },
  description: {
    display: "block",
  },
  readMore: {
    textDecoration: "underline",
    marginLeft: "2px",
    display: "block",
  },
}));

const StockInfo = ({ stockInfo, stock }) => {
  const classes = useStyles();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const renderStockHeader = () => {
    return (
      <Grid className={classes.headerContainer}>
        <hr className={classes.seprator} />
        <Grid item className={classes.titleContainer}>
          <Typography variant="h4" className={`${classes.header} ${classes.companyName}`}>
            {stockInfo.companyName}
          </Typography>
          <Typography variant="h5" className={classes.header} gutterBottom>
            {stockInfo.exchange.split(" ")[0].toUpperCase()} : {stock}
          </Typography>
        </Grid>
        <hr className={classes.seprator} />
      </Grid>
    );
  };

  const rednerDescription = (description) => {
    const maxDescritpionLength = 159;

    // set to full description if length is shorter
    if (!showFullDescription && description.length < maxDescritpionLength) {
      setShowFullDescription(true);
    }

    return (
      <Grid>
        {showFullDescription ? null : (
          <Grid>
            <Typography variant="subtitle2" className={`${classes.text} ${classes.description}`}>
              {description.slice(0, maxDescritpionLength) + "... "}
            </Typography>
            <Typography onClick={(e) => setShowFullDescription(true)} variant="subtitle2" className={`${classes.text} ${classes.readMore}`}>
              Read More >
            </Typography>
          </Grid>
        )}
        {showFullDescription ? (
          <Typography variant="subtitle2" className={classes.text}>
            {description}
          </Typography>
        ) : null}
      </Grid>
    );
  };

  const renderCompanyInfo = () => {
    return (
      <Grid className={classes.companyInfoContainer}>
        <Typography className={classes.text} variant="subtitle1">
          Sector: {stockInfo.sector}
        </Typography>
        <Grid className={classes.sectorGrowthContainer}>
          <Typography variant="subtitle1" className={classes.text}>
            Sector Growth: {stockInfo.sectorGrowth}
          </Typography>
          <Slider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={stockInfo.sectorGrowth.split(".")[0]} className={classes.slider} />
        </Grid>
        {rednerDescription(stockInfo.description)}
      </Grid>
    );
  };

  // grid contiaer should have spacing and streached
  return !stockInfo ? null : (
    <Grid className={classes.container}>
      {renderStockHeader()}
      {renderCompanyInfo()}
    </Grid>
  );
};

const mapStateToPros = (state) => {
  return {
    stockInfo: state.stockData.stockInfo,
    stock: state.stockData.stock,
  };
};

export default connect(mapStateToPros, null)(StockInfo);
