import type { PropsWithChildren, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api, { apiPaths } from "../../service/api";
import { Box, CircularProgress, Typography } from "@mui/material";

type AuthUser = Record<string, unknown>;

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => Promise<void>;
  loading: boolean;
  isLoginPopupOpen: boolean;
  openLoginPopup: () => void;
  closeLoginPopup: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "24px",
      }}
    >
      <Box
        component="img"
        src="/newAsset/svg/logo.svg"
        alt="logo"
        sx={{
          height: {
            xs: "64px",
            md: "96px",
          },
          mb: 2,
        }}
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
          fontFamily: "Aremat, serif",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}

export const AuthProvider = ({ children }: PropsWithChildren): ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const openLoginPopup = useCallback(() => setLoginPopupOpen(true), []);
  const closeLoginPopup = useCallback(() => setLoginPopupOpen(false), []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get<{ user: AuthUser }>(apiPaths.auth.verifyToken);
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

  const login = useCallback((userData: AuthUser) => {
    setIsAuthenticated(true);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post(apiPaths.auth.logout);
      setIsAuthenticated(false);
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
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

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
