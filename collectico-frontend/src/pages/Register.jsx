import { Box, Button, FormGroup, Stack, Typography, Switch, FormControlLabel, TextareaAutosize, SvgIcon, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState } from "react";
import api from "../../service/api";
import ButtonSubmit from "../components/ButtonSubmit";
import SquareInput from "../newComponents/SquareInput";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArtist, setIsArtist] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [artistDescription, setArtistDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "", isError: true });

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (!dialogContent.isError) {
      navigate('/');
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidPhone = /^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(phone);
    if (!isValidPhone) {
      setDialogContent({
        title: "Invalid Phone Number",
        message: "Phone number format should be 012-345-6789",
        isError: true
      });
      setDialogOpen(true);
      return;
    }

    const passwordLength = password.length >= 8;
    const haveUpperCase = /[A-Z]/.test(password);
    const haveLowerCase = /[a-z]/.test(password);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setDialogContent({
        title: "Missing Information",
        message: "Please fill in all fields.",
        isError: true
      });
      setDialogOpen(true);
      return;
    }

    // Validate artist information if isArtist is true
    if (isArtist) {
      if (!artistName || !artistDescription) {
        setDialogContent({
          title: "Missing Artist Information",
          message: "Please fill in artist name and description.",
          isError: true
        });
        setDialogOpen(true);
        return;
      }
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setDialogContent({
        title: "Invalid Email",
        message: "Please enter a valid email address",
        isError: true
      });
      setDialogOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setDialogContent({
        title: "Password Mismatch",
        message: "Passwords do not match!",
        isError: true
      });
      setDialogOpen(true);
      return;
    }

    if (!passwordLength || !haveUpperCase || !haveLowerCase) {
      setDialogContent({
        title: "Invalid Password",
        message: "Password must have longer than 8 characters and have uppercase and lowercase letter",
        isError: true
      });
      setDialogOpen(true);
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      isArtist,
      artistName: isArtist ? artistName : undefined,
      artistDescription: isArtist ? artistDescription : undefined
    };

    try {
      await api.post(`/api/users/register`, newUser);
      setDialogContent({
        title: "Success!",
        message: "Register success! Please login to continue.",
        isError: false
      });
      setDialogOpen(true);
    } catch (err) {
      if (err.response) {
        setDialogContent({
          title: "Registration Failed",
          message: err.response.data.message || "Registration failed",
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

  return (
    <>
      <Box sx={{
        maxWidth: { xs: "100%", md: "600px", lg: "1200px" },
        margin: "0 auto",
        padding: { xs: "0", md: "20px" }
      }}>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center" , px: { xs: 8, md: 4 }}}>
        <Typography variant="h1" sx={{display:"flex" , paddingBottom:"20px" , justifyContent:"center",fontSize: {xs:"1.25rem", md: "2rem"}}}>Sign up</Typography>
        </Box>
        <Box sx={{display: "flex",
              flexDirection: "row",
              justifyContent:  "flex-start" ,
              paddingLeft: { xs: "calc(50% - 128.5px)", md: "calc(50% - 200px)", lg: "calc(50% - 540px)" },
              marginBottom: "8px"}}>
          <Typography sx={{ fontSize: {xs:"1rem", md: "1.125rem"} , fontWeight:600}}>User Information</Typography>
              </Box>
        <form onSubmit={handleSubmit}>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: { xs: "center" },
              color: "primary.main",
              gap: 8,
            }}
          >
            <Stack sx={{ gap: 0, display: { xs: "flex" } , }}>
              <Box sx={{display: "flex", flexDirection: "column", gap: "12px" , width: { xs: "257px", md: "400px", lg: "1080px" } , height: { xs: "auto" } }}>
              <SquareInput
                type={"text"}
                label={"First Name"}
                placeholder={"Enter your first name"}
                fontWeight={550}
                onChange={(e) => setFirstName(e.target.value)}
                 width="100%"
              />
              <SquareInput
                type={"text"}
                label={"Last Name"}
                placeholder={"Enter your last name"}
                fontWeight={550}
                onChange={(e) => setLastName(e.target.value)}
              />
              <SquareInput
                type={"email"}
                label={"Email"}
                placeholder={"Email"}
                fontWeight={550}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SquareInput
                type={"phone"}
                label={"Phone Number"}
                placeholder={"012-345-6789"}
                fontWeight={550}
                onChange={(e) => setPhone(e.target.value)}
              />
              <SquareInput
                type={"password"}
                label={"Password"}
                placeholder={"Password"}
                fontWeight={550}
                onChange={(e) => setPassword(e.target.value)}
              />
              <SquareInput
                required
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Confirm Password"}
                fontWeight={550}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              </Box>
            </Stack>
          </FormGroup>

          {/* Become an Artist Section */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center",
            marginTop: "24px",
            marginBottom: "16px",
            gap: "8px"
          }}>
            <FormControlLabel
                label={<>
                  <Typography sx={{ 
                    fontSize: "1rem", 
                    fontWeight: 600,
                    marginLeft: "8px"
                  }}>
                    Become an Artist
                <ColorLensIcon sx={{ fontSize: "20px", color: "#62483A" , marginLeft: "8px"}} />
                  </Typography>
                    </>
                }
              control={
                <Switch
                  checked={isArtist}
                  onChange={(e) => setIsArtist(e.target.checked )}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#62483A',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#62483A',
                    },
                  }}
                />
              }
              sx={{ 
                display: "flex",
                alignItems: "center"
              }}
            />
          </Box>

          {/* Artist Information Section - Only show when switch is on */}
          {isArtist && (
            <Box sx={{ marginTop: "16px" }}>
              <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "flex-start", md: "flex-start" },
                paddingLeft: { xs: "calc(50% - 128.5px)", md: "calc(50% - 200px)", lg: "calc(50% - 540px)" },
                marginBottom: "8px"
              }}>
                <Typography sx={{ fontSize: {xs:"1rem", md: "1.125rem"} , fontWeight:600}}>
                  Artist Information
                </Typography>
              </Box>
              
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: { xs: "center" },
                  color: "primary.main",
                  gap: 8,
                }}
              >
                <Stack sx={{ gap: 0, display: { xs: "flex" } }}>
                  <Box sx={{
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "12px", 
                    width: { xs: "257px", md: "400px", lg: "1080px" }, 
                    height: { xs: "auto" }
                  }}>
                    <SquareInput
                      type={"text"}
                      label={"Artist name"}
                      placeholder={"Artist name"}
                      fontWeight={550}
                      onChange={(e) => setArtistName(e.target.value)}
                      width="100%"
                    />
                    
                    {/* Description TextArea */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <Typography sx={{ 
                        fontSize: "14px", 
                        fontWeight: 550,
                        color: "#62483A"
                      }}>
                        Description
                      </Typography>
                      <TextareaAutosize
                        minRows={6}
                        placeholder="Tell us about your art..."
                        value={artistDescription}
                        onChange={(e) => setArtistDescription(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #C5C5C5",
                          borderRadius: "8px",
                          fontFamily: "inherit",
                          fontSize: "14px",
                          color: "black",
                          resize: "vertical",
                          outline: "none",
                          backgroundColor: "#f9f9f9"
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </FormGroup>
            </Box>
          )}

          <Stack
            marginY={3}
            spacing={12}
            justifyContent={"center"}
            direction={"row"}
            >
            <ButtonSubmit type="submit" backgroundColor={"primary.brown"} borderRadius={"58px"} color={"white"} width={{ xs: "120px", md: "360px" }} label={"Sign up"} />
          </Stack>
        </form>
      </Box>

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
          <Button sx={{backgroundColor: "primary.brown", color: "white", borderRadius: "58px" , width: "100px" , height: "20px" , fontSize: "8px" , fontWeight: 100}} onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
