import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, FavoriteBorder, ShoppingCart, CloudUpload, MailOutline, Settings, Logout } from '@mui/icons-material';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, Link as RouterLink, useLocation } from "react-router-dom";

const menuItems = [
  { text: 'Home', icon: <HomeOutlinedIcon/>, to: '/admin/dashboard' },
  { text: 'Wishlist', icon: <FavoriteBorder />, to: '#' },
  { text: 'Orders', icon: <LocalMallOutlinedIcon />, to: '#' },
  { text: 'Upload Arts', icon: <CloudUploadOutlinedIcon />, to: '#' },
  { text: 'Messages', icon: <MailOutline />, to: '#' },
  { text: 'My Artworks', icon: <PhotoSizeSelectActualOutlinedIcon />, to: '/admin/myartworks' },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Box sx={{backgroundColor: '#e5e7eb', height: '100vh', width: '280px' , borderBottomRightRadius: '24px', borderTopRightRadius: '24px'}}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Link
                component={RouterLink}
                to="/"
                sx={{ height: { xs: "24px", sm: "38px" } }}
              >
                <img
                  src="/newAsset/svg/logo.svg"
                  alt="logo"
                  style={{ height: "100%", width: "auto", objectFit: "contain" }}
                />
              </Link>
      </Box>

      <List sx={{ p: 2 }}>
        {menuItems.map((item) => {
          const isSelected = item.to !== '#' && location.pathname.startsWith(item.to);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={item.to}
                selected={isSelected}
                sx={{
                  borderRadius: '10px',
                  backgroundColor: isSelected ? 'white' : 'transparent',
                  boxShadow: isSelected ? '0px 4px 12px rgba(0,0,0,0.05)' : 'none',
                  '&:hover': {
                    backgroundColor: isSelected ? 'white' : 'transparent',
                  },
                  transition: 'background 0.2s',
                }}
              >
                <ListItemIcon sx={{minWidth: '40px'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List sx={{ p: 2 , flexDirection: 'column', justifyContent: 'flex-end'}}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: '10px' }}>
            <ListItemIcon sx={{minWidth: '40px'}}><SettingsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: '10px' }}>
            <ListItemIcon sx={{minWidth: '40px'}}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
