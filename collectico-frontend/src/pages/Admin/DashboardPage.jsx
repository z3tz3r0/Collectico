import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import StatCard from "../../components/admin/StatCard";
import SalesTrendChart from "../../components/admin/SalesTrendChart";
import HeaderDashboard from "../../components/admin/HeaderDashboard";

// Mock Data
const stats = [
  { title: "Orders", value: "1,240", icon: "orders" },
  { title: "Revenue", value: "$18,740", icon: "revenue" },
  { title: "Wishlist", value: "3,562", icon: "wishlist" },
  { title: "New Followers", value: "842", icon: "followers" },
];

const recentOrders = [
  {
    name: "Abstract Lines",
    order: "#1245",
    time: "2 hours ago",
    price: "$120",
  },
  {
    name: "Minimal Mountain",
    order: "#1244",
    time: "6 hours ago",
    price: "$200",
  },
  { name: "City Lights", order: "#1243", time: "yesterday", price: "$85" },
];

export default function DashboardPage() {
  
  

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <HeaderDashboard />

        <Grid
          container
          spacing={2}
          direction="row"
          flexWrap="wrap"
          sx={{
            mb: 3,
            width: "100%",
            justifyContent: { md: "space-between", lg: "", xl: "left" },
          }}
        >
          {stats.map((stat) => (
            <Grid
              item
              sx={{ width: { xs: "100%", lg: "20%", md: "100%" } }}
              key={stat.title}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <TrendingUp sx={{ mr: 1, color: "#4f46e5" }} />
            <Box>
              <Typography variant="h6">Sales Trend</Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly revenue (last 12 months)
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: { xs: 100, sm: 120, md: 150 } }}>
            <SalesTrendChart />
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 2,
            borderRadius: "12px",
            boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ListIcon sx={{ mr: 1, color: "#4f46e5" }} />
            <Typography variant="h6">Recent Orders</Typography>
          </Box>
          {recentOrders.map((order) => (
            <Box
              key={order.order}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
                borderBottom: "1px solid #E0E0E0",
                paddingY: "10px",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Box>
                <Box sx={{ marginLeft: { md: "64px" } }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", fontWeight: "medium" }}
                  >
                    {order.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order {order.order} • {order.time}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "normal",
                  fontSize: "1rem",
                  color: "#059669",
                }}
              >
                {order.price}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
