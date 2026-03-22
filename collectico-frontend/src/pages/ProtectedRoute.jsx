import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Box, CircularProgress, Typography } from "@mui/material";

export default function ProtectedRoute({children}) {
    const { user , loading , openLoginPopup} = useAuth();

    useEffect(() => {
        if(!user && !loading){
            openLoginPopup();
        }
    }, [user, loading, openLoginPopup]);

    if(loading){
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              bgcolor: "#F2EEE7",
              gap: "24px"
            }}
          >
            <img
              src="/newAsset/svg/logo.svg"
              alt="logo"
              style={{ height: "32px", marginBottom: "16px" }}
            />
            <CircularProgress
              size={48}
              thickness={4}
              sx={{
                color: "#62483A",
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "#62483A",
                fontFamily: "Aremat, serif"
              }}
            >
              Loading...
            </Typography>
          </Box>
        )
    }
    if(!user){
        return null;
    }
    return user ? children : null;
}

