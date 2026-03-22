import * as React from "react";
import Chip from "@mui/material/Chip";

export default function StatusTag({ statusTag }) {
  const typeTag = () => {
    switch (statusTag) {
      case "delivered":
        return ["#005d34", "#dcfce7"];
      case "inTransit":
        return ["#854800", "#fef9c3"];
      case "preparing":
        return ["#244b7d", "#cdebf3"];
      case "cancel":
        return ["#991b1b", "#fee2e2"];
      default:
        return "";
    }
  };

  return (
    <Chip
      label={statusTag}
      variant="outlined"
      sx={{ color: typeTag()[0], bgcolor: typeTag()[1], border: "none" }}
    />
  );
}
