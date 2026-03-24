import React, { useState } from "react";
import ButtonSubmit from "../newComponents/ButtonSubmit";
import {
  Link,
  Box,
  FormGroup,
  Stack,
  Typography,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RoundedInput from "../newComponents/RoundedInput";
import { routePaths } from "@/shared/config/routes";

import { useAuth } from "../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { FcGoogle } from "react-icons/fc";
import FacebookIcon from "@mui/icons-material/Facebook";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api, { apiPaths } from "../../service/api";

export default function Login({
  onClose,
  open = false,
  switchToForgotPassword,
  prefillEmail = "",
  prefillPassword = "",
}) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "", isError: true });

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (!dialogContent.isError) {
      window.location.reload();
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleGoToRegister = () => {
    onClose();
    navigate(routePaths.register);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const res = await api.post(apiPaths.auth.login, loginData);
      if (!res.data.error) {
        login({
          id: res.data._id,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName
        });
        onClose();
        setDialogContent({
          title: "Success!",
          message: "Login success, Welcome to Collectico!",
          isError: false
        });
        setDialogOpen(true);
      } else {
        setDialogContent({
          title: "Login Failed",
          message: res.data.message || "Can't login, please try again",
          isError: true
        });
        setDialogOpen(true);
      }
    } catch (err) {
      if (err.response) {
        setDialogContent({
          title: "Login Failed",
          message: err.response.data.message || "Login failed",
          isError: true
        });
      } else {
        setDialogContent({
          title: "Error",
          message: "Something went wrong, please try again later ;-;",
          isError: true
        });
      }
      setDialogOpen(true);
      console.error(err);
    }
  }
  const emailValue = email || prefillEmail;
  const passwordValue = password || prefillPassword;

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "hidden"
          }
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)"
          }
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            gap: "12px",
            py: "12px",
            px: { xs: "24px" },
            width: { xs: "257px", sm: "680px" },
            height: { xs: "509px", sm: "680px" },
            border: "4px solid white",
            borderRadius: { xs: "12px", sm: "24px" },
            mx: "auto",
            overflowX: "hidden",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton 
                onClick={handleClose}
                sx={{ 
                  border: "1px solid", 
                  padding: "0",
                  "&:hover": {
                    bgcolor: "primary.light"
                  }
                }}
              >
                <ClearIcon sx={{ fontSize: {xs:12, sm:24} }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "colum",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px",
              }}
            >
              <Link
                component={RouterLink}
                to={routePaths.home}
                sx={{ height: { xs: "24px", sm: "38px" } }}
              >
                <img
                  src="/newAsset/svg/logo.svg"
                  alt="logo"
                  style={{ height: "100%", width: "auto", objectFit: "contain" }}
                />
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.5rem" },
                    fontWeight: "bold",
                    color: "primary.text",
                  }}
                >
                  Welcome to Collectico
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "0.5rem", sm: "1rem" },
                    color: "primary.fontGray",
                  }}
                >
                  Sign in to explore, create, or collect.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    sx={{
                      gap: "16px",
                      color: "primary.main",
                      width: { sm: "360px" },
                    }}
                  >
                    <Stack>
                      <RoundedInput
                        required
                        type={"email"}
                        label={"E-mail"}
                        placeholder={"Enter your email"}
                        fontWeight={500}
                        value={emailValue}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <RoundedInput
                        type={"password"}
                        label={"Password"}
                        placeholder={"Enter your password"}
                        fontWeight={500}
                        value={passwordValue}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Stack>
                    <ButtonSubmit
                      type="submit"
                      width={"100%"}
                      label={"Sign in"}
                      fontSize={"12px"}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.5rem",
                        color: "primary.blue",
                        textAlign: "right",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={switchToForgotPassword}
                    >
                      Forgot password?
                    </Typography>
                  </FormGroup>
                </form>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider sx={{ mb: 2, width: { sm: "360px" } }}>
                  <Typography sx={{ fontSize: "0.5rem" }}>
                    Or sign in with
                  </Typography>
                </Divider>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    startIcon={
                      <FcGoogle className="text-[12px] xs:text-[13px] sm:text-[22px]" />
                    }
                    sx={{
                      fontSize: "0.5rem",
                      textTransform: "none",
                      borderRadius: "999px",
                      borderColor: "#e0e0e0",
                      bgcolor: "#fff",
                      color: "#222",
                      px: 3,
                      minWidth: 96.5,
                      fontWeight: 500,
                      "&:hover": {
                        bgcolor: "#fafafa",
                        borderColor: "#bdbdbd",
                      },
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={
                      <FacebookIcon
                        sx={{ height: {xs:"13px",sm:"24px"}, width: {xs:"13px",sm:"24px"}, color: "#1877F3" }}
                      />
                    }
                    sx={{
                      fontSize: "0.5rem",
                      textTransform: "none",
                      borderRadius: "999px",
                      borderColor: "#e0e0e0",
                      bgcolor: "#fff",
                      color: "#222",
                      px: 3,
                      minWidth: 96.5,
                      fontWeight: 500,
                      "&:hover": {
                        bgcolor: "#f0f4ff",
                        borderColor: "#90caf9",
                      },
                    }}
                  >
                    Facebook
                  </Button>
                </Stack>
              </Box>
              <Box
                sx={{
                  fontSize: { xs: "0.5rem", sm: "1rem" },
                  display: "flex",
                  color: "primary.fontGray",
                  placeSelf: "center",
                }}
              >
                <Box>Don&apos;t have an account yet?</Box>
                <Box
                  sx={{
                    ml: 2,
                    color: "primary.blue",
                    fontSize: { xs: "0.5rem", sm: "1rem" },
                    ":hover": {
                      cursor:  "pointer",
                    },
                  
                  }}
                  onClick={handleGoToRegister}
                >
                  Sign up
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {dialogContent.isError ? <ErrorIcon color="error" /> : <CheckCircleIcon color="success" />}
          {dialogContent.title}
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            {dialogContent.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
