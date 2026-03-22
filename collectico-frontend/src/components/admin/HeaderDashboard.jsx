import { Avatar, Box, Button, IconButton, InputBase, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Search , NotificationsNone , Add , Menu } from '@mui/icons-material';
import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function HeaderDashboard() {
    const { handleDrawerToggle } = useOutletContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const DesktopHeader = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "240px",
            borderRadius: "999px",
            boxShadow: "none",
            border: "1px solid #e0e0e0",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <Search />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              "& ::placeholder": {
                fontSize: "0.875rem",
              },
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Paper>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <NotificationsNone />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
            <Typography>@Nonsense</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Overview of your account performance.
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            width: "156px",
            height: "auto",
            bgcolor: "primary.brown",
            color: "primary.main",
            fontSize: "1rem",
            fontWeight: "normal",
            "&:hover": { bgcolor: "#6b5f56" },
            borderRadius: "33px",
            textTransform: "none",
          }}
        >
          New Artwork
        </Button>
      </Box>
    </Box>
  );

  const MobileHeader = () => (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
        }}
      >
        <Box sx={{}}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "normal",
              fontSize: { lg: "2rem", md: "1.5rem", sm: "1.25rem", xs: "1rem" },
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.5rem" } }}
          >
            Overview of your account performance.
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
      </Paper>
      <Button
        variant="contained"
        startIcon={<Add />}
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "primary.brown",
          color: "primary.main",
          "&:hover": { bgcolor: "#6b5f56" },
          borderRadius: "33px",
          textTransform: "none",
          py: 1.5,
        }}
      >
        New Artwork
      </Button>
    </Box>
  );
  return (
    <>
    {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </>
  )
}
