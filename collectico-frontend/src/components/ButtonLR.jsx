import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";

export default function ButtonLR({ scrollLeft, scrollRight, ...prop }) {
  return (
    <Stack spacing={0.5} direction={"row"}>
      <IconButton
        size="small"
        sx={{
          bgcolor: "primary.text",
          color: "primary.hoverText",
          transition: "all 0.3s ease",
          "&:hover": {
            cursor: "pointer",
            bgcolor: "primary.hoverText",
            border: "1px solid primary.hoverText",
            color: "primary.text",
          },
          ...prop,
        }}
        onClick={scrollLeft}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          bgcolor: "primary.text",
          color: "primary.hoverText",
          transition: "all 0.3s ease",
          "&:hover": {
            cursor: "pointer",
            bgcolor: "primary.hoverText",
            border: "1px solid primary.hoverText",
            color: "primary.text",
          },
          ...prop,
        }}
        onClick={scrollRight}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Stack>
  );
}
