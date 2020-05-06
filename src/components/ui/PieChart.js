import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PieChart as MatrielPieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["#90f305", "#05e6a7", "#f76b1c", "f0c208"];

const useStyles = makeStyles((theme) => ({
  chartMapContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  pieWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  chartMap1: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[0]}`,
  },
  chartMap2: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[1]}`,
  },
  chartMap3: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[2]}`,
  },
  chartMap4: {
    width: "1rem",
    height: "1rem",
    marginRight: "8px",
    backgroundColor: `${PIE_COLORS[3]}`,
  },
  singleChartMapWrapper: {
    display: "flex",
    alignItems: "center",
  },
  mapColorTitle: {
    fontSize: "1rem",
  },
}));

const PieChart = ({ data }) => {
  const classes = useStyles();
  const chartData = Object.keys(data).map((key) => {
    return {
      name: key,
      value: data[key],
    };
  });

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Grid>
      <Grid className={classes.pieWrapper}>
        <MatrielPieChart width={window.screen.availWidth * 0.8} height={window.screen.availWidth * 0.8}>
          <defs>
            <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="59%" stopColor="#90f305" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#90f305" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="59%" stopColor="#05e6a7" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#05e6a7" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f76b1c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f76b1c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="95%" stopColor="#f0c208" stopOpacity={0} />
              <stop offset="5%" stopColor="#f0c208" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Pie labelLine={false} cx={window.screen.availWidth * 0.4} cy={window.screen.availWidth * 0.4} fill="#8884d8" dataKey="value" label={renderCustomizedLabel} data={chartData}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#color${index + 1})`} />
            ))}
          </Pie>
        </MatrielPieChart>
      </Grid>

      <Grid className={classes.chartMapContainer}>
        {chartData.map((entry, index) => (
          <Grid className={classes.singleChartMapWrapper}>
            <div className={classes[`chartMap${index + 1}`]} />
            <Typography className={classes.mapColorTitle}>{entry.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PieChart;
