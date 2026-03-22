import React, { useState } from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Paper, Box } from "@mui/material";

const RadioButtonExample = ({setShippig}) => {
  const [value, setValue] = useState("Standard");

  const handleChange = (event) => {
    setValue(event.target.value);
    setShippig(event.target.value)
  };
// console.log("option from radio = ", value);
  return (
    <Paper elevation={3}
    sx={{ p: 3, mb: 4, bgcolor: "#f9f7f3", color: "#62483a" }}>
    <Box className="flex items-center mb-[24px]">
              <Box className="flex items-center justify-center w-8 h-8 mr-2 bg-[#62483a] text-white rounded-full">
                <Typography variant="subtitle1" className="font-bold">
                  1
                </Typography>
              </Box>
              <Typography variant="h5" className="font-bold text-[#62483a]">
                Shipping Method
              </Typography>
    </Box>
    <FormControl sx={{width:"100%"}}>
      <FormLabel id="radio-buttons-group-label">Choose an Option</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="options"
        value={value}
        onChange={handleChange}
      >
    <div className="flex gap-[24px] justify-between">
    <FormControlLabel value="Standard" control={<Radio />} label={
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
      Standard Shipping
      <br />
      Secure packaging without installation service (10-14 business days)
    </Typography>} />
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
     $150.00
    </Typography></div>
    <div className="flex gap-[24px] justify-between">
    <FormControlLabel value="Premium" control={<Radio />} label={
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
      Premium White Glove Delivery
      <br />
      Professional art handling with installation service (7-10 business days)
    </Typography>} />
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
     $350.00
    </Typography></div>
    <div className="flex gap-[24px] justify-between">
    <FormControlLabel value="Expedited" control={<Radio />} label={
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
      Expedited White Glove Delivery
      <br />
      Priority handling with installation service (3-5 business days)
    </Typography>} />
    <Typography sx={{ color: "text.secondary", fontSize: "1rem",padding: "16px 0 16px 0"}}>
     $500.00
    </Typography></div>
    </RadioGroup>
    </FormControl>
    </Paper>
  );
};

export default RadioButtonExample;