import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

const Loading = ({ loading, children }) => {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    children
  );
};
export default Loading;
