import { React, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
//toggle theme button in all pages
const NoGraphToShow = () => {
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <WarningAmberIcon fontSize="large" />
      <Typography
        sx={{
          fontSize: "36px",
          fontFamily: "Bold",
        }}
      >
        לא נמצא גרף להציג
      </Typography>
    </Box>
  );
};

export default NoGraphToShow;
