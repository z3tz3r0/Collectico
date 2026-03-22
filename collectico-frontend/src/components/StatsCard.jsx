import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const StatsCard = ({ title, value, fontSize, mt }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Typography
        variant="h7"
        component="p"
        sx={{
          fontWeight: 500,
          fontSize: fontSize,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          mt: 1,
          fontWeight: 100,
          fontSize: fontSize,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatsCard;
