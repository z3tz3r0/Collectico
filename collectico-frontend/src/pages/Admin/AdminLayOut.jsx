import { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";

const drawerWidth = 280;

export default function AdminLayOut() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer // For Mobile
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              backgroundColor: "#F9F9F9",
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer // For Desktop
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
              backgroundColor: "#F9F9F9",
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {xs:"16px" , md:"32px"},
          width: { md: `calc(100% - ${drawerWidth}px)` },
          maxWidth: {xs:"100vw" , md:"100%"},
          bgcolor: "#ffffff",
        }}
      >
        <Outlet context={{ handleDrawerToggle }} />
      </Box>
    </Box>
  );
}
