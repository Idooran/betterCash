import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BarChart as MatirelBarChart, Bar } from "recharts";

const useStyles = makeStyles(theme => ({
  chartContainer: {
    display: "flex",
    backgroundColor: "#4a4a4a",
    borderRadius: "6px",
    boxShadow: "0 2px 11px 0 rgba(0, 0, 0, 0.5)",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  volumeDataContianer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: theme.spacing(2)
  },
  volumeDataGraphContianer: {
    display: "flex",
    width: "100%",
    marginLeft: "10px",
    alignItems: "flex-end"
  },
  volumeData: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  volumeDataTitle: {
    fontFamily: "Roboto",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: "12px"
  },
  volumeColorMap: {
    width: "1rem",
    height: "1rem",
    backgroundColor: "#05c66e"
  },
  avgVolumeColorMap: {
    width: "1rem",
    height: "1rem",
    backgroundColor: "#ed3649"
  },
  volumeBar: {
    width: props => props.width,
    height: props => props.volumeHeight,
    borderRadius: "6px",
    backgroundImage: "linear-gradient(to top, #00ce70, #4a4a4a )"
  },
  // calcs by props!
  avgVolumeBar: {
    width: props => props.width,
    height: props => props.avgVolumeHeight,
    borderRadius: "6px",
    backgroundImage: "linear-gradient(to top, #ff3449 , #4a4a4a)"
  }
}));

const BarChart = ({ data }) => {
  const classes = useStyles({
    avgVolumeHeight: `${(data.avgVolume / (data.avgVolume + data.volume)) * 100}%`,
    volumeHeight: `${(data.volume / (data.avgVolume + data.volume)) * 100}%`,
    width: `${window.innerWidth * 0.17}%`
  });

  return (
    <Grid className={classes.chartContainer}>
      {/* volume  */}
      <Grid className={classes.volumeDataContianer}>
        <Grid className={classes.volumeData}>
          <div className={classes.volumeColorMap} />
          <Typography className={classes.volumeDataTitle}>Volume {data.volume}</Typography>
        </Grid>
        {/* avg volume  */}
        <Grid className={classes.volumeData}>
          <div className={classes.avgVolumeColorMap} />
          <Typography variant="subtitle-1" className={classes.volumeDataTitle}>
            Avg volume {data.avgVolume}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.volumeDataGraphContianer}>
        <div className={classes.volumeBar} />
        <div className={classes.avgVolumeBar} />
      </Grid>
    </Grid>
  );
};

export default BarChart;
