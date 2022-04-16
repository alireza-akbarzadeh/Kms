import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, color: "whitesmoke" }}>
        <LinearProgress color="inherit" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35, display: "none" }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LoadingCore({ loading }) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 100) {
          clearInterval(timer);
        } else {
          if (prevProgress === 90 && loading) {
            return prevProgress;
          } else {
            return prevProgress >= 100 ? 10 : prevProgress + 10;
          }
        }
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", position: "fixed", top: 0, right: 0 }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
