import React from "react";
import { Slider as MaterialSlider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Slider = (props) => {
  const constValue = props.defaultValue;
  const trackBackground = props.negtaive ? "linear-gradient(to left, #65131b , #f63549 90%)" : "linear-gradient(to left, #0c643c, #31d39e 90%)";

  const PrettoSlider = withStyles({
    root: {
      height: 6,
    },
    thumb: {
      height: props.displayMode == "thick" ? 14 : 10,
      width: props.displayMode == "thick" ? 14 : 10,
      color: "#fff",
      marginTop: -2,
      marginLeft: -4,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      background: trackBackground,
      height: props.displayMode == "thick" ? 12 : 6,
      borderRadius: props.displayMode == "thick" ? 6 : 4,
    },
    rail: {
      background: trackBackground,
      height: props.displayMode == "thick" ? 12 : 6,
      borderRadius: props.displayMode == "thick" ? 6 : 4,
    },
  })(MaterialSlider);

  // return <PrettoSlider {...props} valueLabelDisplay="off" value={constValue} />;
  return <PrettoSlider {...props} valueLabelDisplay="off" value={constValue} />;
};

export default Slider;
