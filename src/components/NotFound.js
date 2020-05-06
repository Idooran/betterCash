import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import NotFoundImage from "../images/notExisting.png";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(7),
    alignItems: "center",
  },
  title: { marginBottom: theme.spacing(2) },
  text: {
    fontWeight: "100",
    marginBottom: theme.spacing(5),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  console.log("not found");
  return (
    <Grid className={classes.container}>
      <img src={NotFoundImage} className={classes.image} />
      <Typography variant="h3" className={classes.title}>
        {" "}
        Sorry,{" "}
      </Typography>
      <Typography variant="h6" className={classes.text}>
        {" "}
        this ticker doesn't exists{" "}
      </Typography>
    </Grid>
  );
};

export default NotFound;
