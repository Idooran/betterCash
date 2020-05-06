import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    background: "black",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: "white",
    flex: "1",
  },
  title: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  text: {
    fontSize: "0.6rem",
    fontWeight: "300",
  },
}));

const InformationPage = ({ title, text }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography className={classes.text}>{text}</Typography>
    </Grid>
  );
};

export default InformationPage;
