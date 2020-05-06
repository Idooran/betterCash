import React from "react";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  appBar: {
    backgroundColor: "black",
    textColor: "white",
  },
  tabContent: {
    color: "white",
  },
}));

const TabsSection = ({ standAloneContent, comparedContent }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" textColor="primary">
          <Tab label="Stand alone" {...a11yProps(0)} />
          <Tab label="Compared" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabContent}>
        {standAloneContent}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabContent}>
        {comparedContent}
      </TabPanel>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

export default TabsSection;
