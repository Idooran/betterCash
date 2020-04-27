import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PieChart as MatrielPieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["#02c96e", "#90f305", "#f0c208"];

const useStyles = makeStyles(theme => ({
  chartMapContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2)
  },
  chartMap0: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[0]}`
  },
  chartMap1: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[1]}`
  },
  chartMap2: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[2]}`
  },
  singleChartMapWrapper: {
    display: "flex",
    alignItems: "center"
  },
  mapColorTitle: {
    fontSize: "1rem"
  }
}));

const PieChart = ({ data }) => {
  const classes = useStyles();
  const chartData = Object.keys(data).map(key => {
    return {
      name: key,
      value: data[key]
    };
  });

  return (
    <Grid>
      <MatrielPieChart width={window.screen.availWidth * 0.8} height={window.screen.availWidth * 0.8}>
        <Pie data={chartData} innerRadius={75} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS?.length]} />
          ))}
        </Pie>
      </MatrielPieChart>
      <Grid className={classes.chartMapContainer}>
        {chartData.map((entry, index) => (
          <Grid className={classes.singleChartMapWrapper}>
            <div className={classes[`chartMap${index}`]} />
            <Typography className={classes.mapColorTitle}>{entry.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PieChart;
