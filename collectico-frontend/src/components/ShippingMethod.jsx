import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  TextField,
  Paper,
  Container,
} from "@mui/material";

function ShippingMethod() {
  const [value, setValue] = useState("standard");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <Container maxWidth="md">
        {" "}
        <Paper
          elevation={3}
          sx={{ bgcolor: "#f9f7f3", color: "#62483a" }}
          className="p-6 bg-gray-500 rounded-md"
        >
          <Box className="mb-6">
            <Box className="flex items-center mb-4">
              <Box className="flex items-center justify-center w-8 h-8 mr-2 bg-[#62483a] text-white rounded-full">
                <Typography variant="subtitle1" className="font-bold">
                  1
                </Typography>
              </Box>
              <Typography variant="h5" className="font-bold text-[#62483a]">
                Shipping Method
              </Typography>
            </Box>

            <FormControl component="fieldset" className="w-full">
              <RadioGroup
                aria-label="shipping-method"
                name="shipping-method"
                value={value}
                onChange={handleChange}
              >
                <Box className="mb-4">
                  <FormControlLabel
                    value="premium"
                    control={<Radio />}
                    label=""
                    className="align-baseline"
                  />
                  <Box className="ml-7 -mt-6">
                    <Box className="flex justify-between">
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        Premium White Glove Delivery
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        $350.00
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-700">
                      Professional art handling with installation service (7-10
                      business days)
                    </Typography>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <FormControlLabel
                    value="expedited"
                    control={<Radio />}
                    label=""
                    className="align-baseline"
                  />
                  <Box className="ml-7 -mt-6">
                    <Box className="flex justify-between">
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        Expedited White Glove Delivery
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        $500.00
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-700">
                      Priority handling with installation service (3-5 business
                      days)
                    </Typography>
                  </Box>
                </Box>

                <Box className="mb-4">
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label=""
                    className="align-baseline"
                  />
                  <Box className="ml-7 -mt-6">
                    <Box className="flex justify-between">
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        Standard Shipping
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        className="font-bold text-gray-800"
                      >
                        $150.00
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-700">
                      Secure packaging without installation service (10-14
                      business days)
                    </Typography>
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="body2" className="text-amber-800 mb-2">
              Special Instructions (Optional)
            </Typography>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              size="small"
              className="bg-white"
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default ShippingMethod;
