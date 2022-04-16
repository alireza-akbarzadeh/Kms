import React from "react";
import { LinearProgress, Box } from "@mui/material";

const LinearLoading = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" />
    </Box>
  );
};

export default LinearLoading;
