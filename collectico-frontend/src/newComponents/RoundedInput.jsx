import React from "react";
import { TextField, Typography, Stack } from "@mui/material";

export default function RoundedInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  fontWeight,
  // add more prop
  multiline,
  rows,
  ...prop
}) {
  return (
    <Stack gap={"8px"} mb={0.5}>
      <Typography sx={{ minWidth: 120, fontWeight: { fontWeight } }}>
        {label}
      </Typography>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="large"
        multiline={multiline} //add multiline
        rows={rows} //add rows
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: "57px",
            "& fieldset": {
                color: "primary.fontGray",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "primary.fontGray",
            opacity: 0.5,
          },

          ...prop, //add more sx
        }}
      />
    </Stack>
  );
}
