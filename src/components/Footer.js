import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contianer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    background: "black",
  },

  linksContainer: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: "0.8rem",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    border: "1px solid white",
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  const ContactUsButton = withStyles((theme) => ({
    root: {
      color: "black",
      backgroundColor: "white",
      padding: "0, 4px",
    },
  }))(Button);

  console.log(props.location.pathname === "contact-us");
  return props.location.pathname === "/contact-us" ? null : (
    <Grid className={classes.contianer}>
      <div className={classes.divider} />
      <ContactUsButton variant="outlined">
        <Link className={classes.link} to="/contact-us">
          Contact Us
        </Link>
      </ContactUsButton>
      <Grid className={classes.linksContainer}>
        <Link className={classes.link} to="/help">
          <Typography className={classes.text}>Help</Typography>
        </Link>
        <Link className={classes.link} to="/tos">
          <Typography className={classes.text}>Term Of Service</Typography>
        </Link>
        <Link className={classes.link} to="/privacy">
          <Typography className={classes.text}>Privacy</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default withRouter(Footer);
