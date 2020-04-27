import React from "react";
import { Slider as MaterialSlider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Slider = props => {
  const constValue = props.defaultValue;
  const PrettoSlider = withStyles({
    root: {
      color: "#0c643c",
      height: 6
    },
    thumb: {
      height: 10,
      width: 10,
      color: "#fff",
      marginTop: -2,
      marginLeft: -4,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit"
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      height: 6,
      borderRadius: 4
    },
    rail: {
      height: 6,
      borderRadius: 4
    }
  })(MaterialSlider);

  return <PrettoSlider {...props} valueLabelDisplay="off" value={constValue} />;
};

export default Slider;
