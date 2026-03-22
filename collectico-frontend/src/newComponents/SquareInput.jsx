import React from 'react'
import { TextField, Typography, Stack } from "@mui/material";


export default function SquareInput({
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
              backgroundColor: "",
              borderRadius: "0px",
              border: "1px solid #C5C5C5",
              "&:hover": {
                border: "1px solid #62483A",
              },
              "&.Mui-focused": {
                border: "2px solid #62483A",
                backgroundColor: "#fafafa",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
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
