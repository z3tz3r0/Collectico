import { Button, Stack } from "@mui/material";
import React from "react";

export default function ButtonSubmit({
  type="submit",
  onClick,
  mate,
  value,
  label,
  ...prop
}) {
  const bg = mate && label === "Back" ? "transparent" : "primary.brown";

  return (
    <Stack>
      {/* Add your width , heigh , label and you can optimize*/}
      <Button
        onClick={onClick}
        disabled={mate}
        type={type}
        value={value}
        sx={{
          bgcolor: bg,
          borderRadius: "21px",
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          color: "white",
          textTransform: "none",
          transition: "all 0.3s ease",
          width: {xs:"155px" , md: "360px"},
          height: {xs: "42px"},
          "&:hover": {
            cursor: "pointer",
            bgcolor: "primary.bgButton",
            border: "1px solid primary.main",
          },
          ...prop,
        }}
      >
        {label}
      </Button>
    </Stack>
  );
}
