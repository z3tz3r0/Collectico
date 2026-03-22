import React from 'react';
import { Paper, Box, Typography, Avatar } from '@mui/material';
import {  AttachMoney, Favorite, People } from '@mui/icons-material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
const iconMap = {
  orders: <LocalMallOutlinedIcon sx={{ color: '#6A6AFF' }} />,
  revenue: <AttachMoney sx={{ color: '#4ECA80' }} />,
  wishlist: <Favorite sx={{ color: '#FF7A7A' }} />,
  followers: <People sx={{ color: '#FFC107' }} />,
};

const iconBgColorMap = {
  orders: '#E7E7FF',
  revenue: '#E5F9ED',
  wishlist: '#FFEBEB',
  followers: '#FFF9E6',
}

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: '12px', width: {lg:"258px"}}}>
      <Avatar sx={{ bgcolor: iconBgColorMap[icon], mr: 2 }}>
        {iconMap[icon]}
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'normal' }}>{value}</Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
