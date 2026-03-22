import { Box, Typography, Button, Chip, Divider } from "@mui/material";

import StatusTag from "./StatusTag";
import { useState } from "react";
import OrderDetailsPopup from "./OrderDetailsPopup";

export default function OrderCard({
  orderNumber,
  status,
  orderDate,
  totalAmount,
  paymentStatus,
  shippingAddressName,
  shippingAddressAddress,
  shippingAddressCity,
  items,
}) {
  const [showOrderDetails, setShowOrderDetails] = useState(true);
  const date = new Date(orderDate).toLocaleString();

  return (
    <Box
      className="order-card"
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        mb: 3,
        width: "95vw",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
      >
        <Box mb={{ xs: 2, lg: 0 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.9rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
              }}
              variant="h7"
              fontWeight="600"
            >
              Order NO. #{orderNumber}
            </Typography>
            <StatusTag statusTag={status} />
          </Box>
          <Typography
            sx={{ fontSize: { xs: "0.9rem" } }}
            variant="h7"
            fontWeight="400"
          >
            Order Date: {date}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography sx={{ fontSize: { xs: "0.9rem" } }} variant="h6">
            $
            {totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Typography>
          <Typography variant="body2" fontWeight="100">
            {paymentStatus}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mt: 3, mb: 2 }} />

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box mb={{ xs: 2, md: 0 }}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Shipping Address:
          </Typography>
          <Typography>{shippingAddressName}</Typography>
          <Typography>{shippingAddressAddress}</Typography>
          <Typography>{shippingAddressCity}</Typography>
        </Box>
      </Box>
      {showOrderDetails && (
        <OrderDetailsPopup
          orderId={orderNumber}
          total={totalAmount}
          subtotal={totalAmount}
          status={status}
          onClose={() => setShowOrderDetails(false)}
          items={items}
        />
      )}
    </Box>
  );
}
