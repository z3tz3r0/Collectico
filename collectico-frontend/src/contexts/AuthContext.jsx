import { createContext, useContext, useEffect, useState } from "react";
import { default as api } from "../../service/api";
import { Box, CircularProgress, Typography } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const openLoginPopup = () => setLoginPopupOpen(true);
  const closeLoginPopup = () => setLoginPopupOpen(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get(`/api/users/auth/verify-token`);
        setIsAuthenticated(true);
        setUser(res.data.user);
      } catch (err) {
        console.error("Authentication verification failed:", err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post(`/api/auth/logout`);
      setIsAuthenticated(false);
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "24px"
        }}
      >
        <img
          src="/newAsset/svg/logo.svg"
          alt="logo"
          style={{ height: {md:"96px", sm:"64px"}, marginBottom: "16px" }}
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
            fontSize: { xs: "2.5rem", sm: "3.75rem" },
            color: "#62483A",
            fontFamily: "Aremat, serif"
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        isLoginPopupOpen,
        openLoginPopup,
        closeLoginPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
