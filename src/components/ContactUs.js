import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "black",
    height: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflow: "hidden",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "center",
  },
  header: {
    whiteSpace: "nowrap",
    fontSize: "1.5rem",
  },
  seprator: {
    border: "1px solid #fff",
    width: "50%",
    margin: "auto 0 auto 0",
  },
  titleContainer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  field: {
    border: "1px solid white",
    color: "white",
    backgroundColor: "black",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    "&::placeholder": {
      color: "white",
    },
  },
  button: {
    color: "white",
    backgroundColor: "#11b067",
    marginTop: theme.spacing(4),
    margin: "auto",
    border: "none",
    padding: "15px 50px 15px 50px",
    fontSize: "1rem",
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendForm = () => {
    console.log("sendForm", name, email, message);
  };

  return (
    <Grid className={classes.container}>
      <Grid className={classes.headerContainer}>
        <hr className={classes.seprator} />
        <Grid item className={classes.titleContainer}>
          <Typography className={`${classes.header}`}>Contact Us</Typography>
        </Grid>
        <hr className={classes.seprator} />
      </Grid>
      <input type="text" className={classes.field} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" className={classes.field} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <textarea type="text" className={classes.field} placeholder="Message" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button className={classes.button} onClick={() => sendForm()}>
        Send
      </button>
    </Grid>
  );
};

export default ContactUs;
