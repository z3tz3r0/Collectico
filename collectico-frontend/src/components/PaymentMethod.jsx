import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Paper,
  Button,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeIcon from "@mui/icons-material/QrCode2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationDate: "",
    cvv: "",
  });

  const handleCardDetailsChange = (field) => (event) => {
    setCardDetails({
      ...cardDetails,
      [field]: event.target.value,
    });
  };


  return (
    <Box sx={{ maxWidth: 885, mx: "auto", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "#f9f7f3",
          color: "#62483a",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: "#5d4037",
              mr: 2,
              width: 36,
              height: 36,
            }}
          >
            3
          </Avatar>
          <Typography
            variant="h5"
            sx={{ color: "#5d4037", fontWeight: "normal" }}
          >
            Payment Method
          </Typography>
        </Box>

        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 2,
                  border: paymentMethod === "cod" ? 2 : 1,
                  borderColor: paymentMethod === "cod" ? "#5d4037" : "#ccc",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
                onClick={() => setPaymentMethod("cod")}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon sx={{ mr: 1 }} />
                      <Typography>Cash on Delivery</Typography>
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 2,
                  border: paymentMethod === "creditCard" ? 2 : 1,
                  borderColor:
                    paymentMethod === "creditCard" ? "#5d4037" : "#ccc",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
                disabled= {true}
                onClick={() => setPaymentMethod("creditCard")}
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CreditCardIcon sx={{ mr: 1 }} />
                      <Typography>Credit Card</Typography>
                    </Box>
                  }
                  disabled= {true}
                  sx={{ width: "100%" }}
                />
              </Paper>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <Paper
                sx={{
                  p: 2,
                  border: paymentMethod === "qrCode" ? 2 : 1,
                  borderColor: paymentMethod === "qrCode" ? "#5d4037" : "#ccc",
                  borderRadius: 1,
                  cursor: "pointer",
                }}
                onClick={() => setPaymentMethod("qrCode")}
              >
                <FormControlLabel
                  value="qrCode"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <QrCodeIcon sx={{ mr: 1 }} />
                      <Typography>QR Code</Typography>
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />
              </Paper>
            </Grid> */}

            
          </Grid>
        </RadioGroup>

        {paymentMethod === "creditCard" && (
          <Stack spacing={2}>
            <TextField
              label="Card Number *"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange("cardNumber")}
              placeholder="1234 5678 9012 3456"
              fullWidth
              variant="outlined"
              disabled
            />
            <TextField
              label="Cardholder Name *"
              value={cardDetails.cardholderName}
              onChange={handleCardDetailsChange("cardholderName")}
              placeholder="Lisa Alisa"
              fullWidth
              disabled
              variant="outlined"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Expiration Date *"
                  value={cardDetails.expirationDate}
                  onChange={handleCardDetailsChange("expirationDate")}
                  placeholder="MM/YY"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="CVV"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange("cvv")}
                  placeholder="123"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", alignItems: "center", color: "#666" }}>
              <LockIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption">
                Your payment information is encrypted and secure
              </Typography>
            </Box>
          </Stack>
        )}

        {/* {paymentMethod === "qrCode" && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Box
              sx={{
                border: "1px dashed #ccc",
                p: 3,
                mb: 2,
                maxWidth: 300,
                mx: "auto",
              }}
            >
              <Box
                component="img"
                src="./assets/logo/qr-code.png"
                alt="QR Code placeholder"
                sx={{ maxWidth: "100%" }}
              />
            </Box>
            <Typography>
              Scan this QR code with your banking app to complete the payment
            </Typography>
          </Box>
        )} */}

        {paymentMethod === "cod" && (
          <Box sx={{ mt: 3 }}>
            <Typography>
              Pay in cash when your order is delivered to your address. A small
              handling fee may apply.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#62483a",
            color: "white",
            px: 4,
            py: 1.5,
          }}
        >
          Purchase
        </Button>
      </Box> */}
    </Box>
  );
}
