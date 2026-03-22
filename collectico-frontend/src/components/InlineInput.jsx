import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

export default function InlineInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  fontWeight,
}) {
  return (
    <Box  sx={{display:"flex" , flexDirection:{xs:'column', md:'row'} , gap:{xs:2 , md:5} , alignItems:{xs:"start" , md:"center"}}}   mb={2}>
      <Typography sx={{ width: 120 , color: "primary.main" , fontWeight: { fontWeight }}}>{label}</Typography>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: 'white',
            borderRadius: "10px",
            "& fieldset": {
                border: "2px solid",
                borderColor: "primary.inputBorder",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#9f8e84",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}