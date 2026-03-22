import { useEffect, useRef, useState } from 'react'
import { Box, AppBar, Link, Toolbar, List, IconButton, Drawer, InputBase, Container, Grid, Dialog, DialogContent, Typography, Popper, ClickAwayListener } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext.jsx";
import Login from "../pages/Login.jsx";

// ****** The next section after <NavBar /> needs => pt: 15 *******//

export default function NavBar() {
  const { isAuthenticated, isLoginPopupOpen, openLoginPopup, closeLoginPopup , user} = useAuth();
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("")

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);}
  },[user])

  const handleOpenLogin = (email = "", password = "") => {
    setTempEmail(typeof email === "string" ? email : "");
    setTempPassword(typeof password === "string" ? password : "");
    openLoginPopup();
  };

    // Mobile Menu Drawer
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const handleDrawerToggle = () => setOpenMenuDrawer(!openMenuDrawer);
  

  // Nav
  const navItems = [
    { label: "Market", to: "/market" },
    { label: "Auction", to: "/auction" },
    { label: "Visual Museum", to: "/museum" },
    { label: "Blog", to: "/blog" },
    ];


    // Mobile Dashboard Popper
    const anchorMobileRef = useRef(null);
    const [mobileDashboardPopper, setMobileDashboardPopper] = useState(true);
    
    const handleMobileDashboardPopper = () => {
        setMobileDashboardPopper(prev => !prev);
    }
    const handleCloseMobileDashboard = () => {
        setMobileDashboardPopper(false);
    }

    // Dashboard Popper
    const anchorRef = useRef(null);
    const [dashboardPopper, setDashboardPopper] = useState(false);
    
    const handleDashboardPopper = () => {
        setDashboardPopper(prev => !prev);
    }
    const handleCloseDashboard = () => {
        setDashboardPopper(false);
    }
    const dashBoardItems = [
        { label: "Profile", to: "/profile"},
        { label: "Favorite", to: "/favorite"},
        { label: "Orders", to: "/order"},
        { label: "Offers", to: "/offer"},
    ]


  return (
    <>
      {/*-------- NavBar Mobile ---------*/}
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
          color: "primary.text",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: "4.6%",
            py: "32px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
            {/* Logo */}
            <Link component={RouterLink} to="/" onClick={() => setOpenMenuDrawer(false)}>
                <img
                src="./newAsset/svg/logo.svg"
                alt="logo"
                style={{ height: "24px" }}
                />
            </Link>
            {/* Mobile Toggle */}
            <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
            >
                <img
                src="./newAsset/svg/toggleMenu.svg"
                alt="Menu"
                style={{ height: "20px" }}
                />
            </IconButton>

        </Toolbar>
      </AppBar>

      {/* Menu Drawer for Mobile Nav */}
      <Drawer
        anchor="top"
        open={openMenuDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: "none" } }}
        slotProps={{
          paper: {
            sx: {
              top: "100px", // height of AppBar
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              pt: 1,
            },
          },
        }}
      >
        <Box sx={{ pb: "12px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              height: "42px",
              px: "40px",
            }}
          >
            {/* SearchBox */}
            <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        width: "200px",
                        height: "25px", // fixed height
                        px: "4px",
                        borderRadius: "9999px",
                        border: "1px solid #C5C5C5",
                        bgcolor: "#f9f9f9",
                    }}
                >
                <Link component={RouterLink} to="/">
                    <img
                        src="./newAsset/svg/search.svg"
                        alt="search"
                        style={{ height: "18px" }}
                    />
                </Link>
                <InputBase
                    placeholder="Search gallery, category, artist or works"
                    fullWidth
                    sx={{
                    height: "100%",
                    input: {
                        color: "primary.text",
                        fontSize: "8px",        // font size of input**
                        lineHeight: "normal",   // avoids vertical stretching**
                        "&::placeholder": {
                        color: "#373737",
                        opacity: 1,
                        },
                    },
                    }}
                />
                </Box>
                {/* Cart */}
                { isAuthenticated? (
                    <Link component={RouterLink} to="/" onClick={handleDrawerToggle}>
                    <img src="./newAsset/svg/cart.svg" alt="cart" style={{height: '24px'}} />
                    </Link>
                ) : null
                }
                
            </Box>
            {/*----- Nav Menu List -----*/}
            <List disablePadding>
                
                {/* ----- Log in Link ----- */}
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: '56px', mt: '4px'}}>
                    { !isAuthenticated? (
                        // Before Login
                        <Link
                        component={RouterLink}
                        to="/login"
                        onClick={() => {
                            handleOpenLogin();
                            handleDrawerToggle();
                        }}
                        underline="none"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: '42px',
                            color: "primary.text",
                            fontSize: {xs: '20px'},
                            "&:hover": {
                                color: "primary.charcoal",
                            },
                            fontFamily: "Aremat, serif",
                        }}
                        >
                        Log in
                        </Link>
                    ) : (
                        // After Login
                        <Box>
                            <Box ref={anchorMobileRef} onClick={handleMobileDashboardPopper} sx={{ display: "flex", alignItems: 'center', gap: '4px', height: 32, cursor: 'pointer' }}>
                                <Box component="img" src="./newAsset/svg/profilePic.svg" sx={{ width: 30, height: 30 }}/>
                                <Typography sx={{display: {xs: 'block', md: 'none'}, fontSize: {xs: '16px'}, fontFamily: 'Aremat, serif'}}>@Nonsense</Typography>
                            </Box>

                            {/* Mobile Dashboard Popper */}
                            <Popper
                                open={mobileDashboardPopper}
                                anchorEl={anchorMobileRef.current}
                                placement='bottom-start'
                                disablePortal
                                modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]} // slight vertical spacing
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    bgcolor: 'primary.main',
                                    boxShadow: '2px 3px 10.8px 0px rgba(0, 0, 0, 0.12)',
                                    borderRadius: '8px',
                                    border: '1px solid #A1A1AA',
                                }}
                            >
                                <ClickAwayListener onClickAway={handleCloseMobileDashboard}>
                                    <Box>
                                        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: '116px', px: '24px', pt: '32px' }}>
                                            {/* Mobile Dashboard List */}
                                            <List disablePadding>
                                                {dashBoardItems.map((item) => (
                                                <Link
                                                    key={item.to}
                                                    component={RouterLink}
                                                    to={item.to}
                                                    onClick={handleCloseMobileDashboard}
                                                    underline="none"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '40px',
                                                        color: "primary.text",
                                                        fontSize: '16px',
                                                        "&:hover": {
                                                            color: "primary.charcoal",
                                                        },
                                                        fontFamily: "Aremat, serif",
                                                        }}
                                                >
                                                    {item.label}
                                                </Link>
                                                ))}
                                            </List>
                                            <Box component="hr" sx={{height: '0.2px', width:'100%', bgcolor: 'rgba(0, 0, 0)', border: 'none', mt: '32px'}} />
                                            {/* Log Out */}
                                            <Link
                                                component={RouterLink}
                                                to='/login'
                                                onClick={handleCloseMobileDashboard}
                                                underline="none"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    height: '50px',
                                                    color: "primary.text",
                                                    fontSize: '16px',
                                                    "&:hover": {
                                                        color: "primary.charcoal",
                                                    },
                                                    fontFamily: "Aremat, serif",
                                                    }}
                                                >
                                                    Log Out
                                            </Link>
                                        </Box>
                                    </Box>
                                </ClickAwayListener>
                            </Popper>
                        </Box>
                    )} 
                </Box>

                {/*---- Other Nav Menu ----*/}
                {navItems.map((item) => (
                <Link
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    onClick={handleDrawerToggle}
                    underline="none"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: '42px',
                        color: "primary.text",
                        fontSize: 20,
                        "&:hover": {
                            color: "primary.charcoal",
                        },
                        fontFamily: "Aremat, serif",
                        }}
                >
                    {item.label}
                </Link>
                ))}
            </List>

        </Box>
      </Drawer>

      {/*--------- NavBar Desktop ----------*/}
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
        zIndex: 30,
        bgcolor: "primary.main",
        color: "primary.text",
        display: { xs: 'none', md: 'flex' }
        }}
    >
        <Toolbar
            disableGutters
            sx={{
                py: "32px"
            }}
        >
            <Container disableGutters maxWidth="xl" sx={{px: {md: "5.14%", xl: "80px"}}}>
                <Grid container alignItems="center" justifyContent="space-between" sx={{width: '100%'}}>
                    <Grid>
                        {/* Logo */}
                        <Link component={RouterLink} to="/">
                        <img
                            src="./newAsset/svg/logo.svg"
                            alt="logo"
                            style={{ height: "24px" }}
                        />
                        </Link>
                    </Grid>

                    <Grid>
                        {/* Nav Menu Item Desktop */}
                        <Box>
                            <List disablePadding sx={{display: 'flex', gap: {lg: '52px', md: '25px'}}}>


                                {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    underline="none"
                                    sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: '42px',
                                    color: "primary.text",
                                    fontSize: {lg: '20px', md: '18px'},
                                    "&:hover": {
                                        color: "primary.charcoal",
                                    },
                                    fontFamily: "Aremat, serif",
                                    }}
                                >
                                    {item.label}
                                </Link>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid>
                        {/* SearchBox Desktop */}
                        <Box
                            sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            width: "244px",
                            height: "32px", // fixed height
                            borderRadius: "9999px",
                            px: "12px",
                            border: "1px solid #C5C5C5",
                            bgcolor: "#f9f9f9",
                            }}
                        >
                            <Link component={RouterLink} to="/">
                            <img
                                src="./newAsset/svg/search.svg"
                                alt="search"
                                style={{ height: "20px" }}
                            />
                            </Link>
                            <InputBase
                            placeholder="Search gallery, category, artist or works"
                            fullWidth
                            sx={{
                                height: "100%",
                                input: {
                                color: "primary.text",
                                fontSize: "10px",        // font size of input**
                                lineHeight: "normal",   // avoids vertical stretching**
                                "&::placeholder": {
                                    color: "#373737",
                                    opacity: 1,
                                },
                                },
                            }}
                            />
                        </Box>
                    </Grid>

                    <Grid>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: {lg:'52px', md: '12px'}}}>
                            {
                            !isAuthenticated? (
                                // Before Login
                                <Link
                                onClick={handleOpenLogin}
                                underline="none"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: '42px',
                                    color: "primary.text",
                                    fontSize: {lg: '20px', md: '18px'},
                                    "&:hover": {
                                        color: "primary.charcoal",
                                    },
                                    fontFamily: "Aremat, serif",
                                    cursor: 'pointer'
                                }}
                                >
                                Log in
                                </Link>
                            ) : (
                                // After Login
                                <Box>
                                    <Box ref={anchorRef} onClick={handleDashboardPopper} sx={{ display: "flex", alignItems: 'center', gap: '4px', height: 32, cursor: 'pointer' }}>
                                        <Box component="img" src="./newAsset/svg/profilePic.svg" sx={{ width: 30, height: 30 }}/>
                                        <Typography sx={{display: {md: 'none', lg: 'block'}, fontSize: {md: '18px'}, fontFamily: 'Aremat, serif'}}>@Nonsense</Typography>
                                    </Box>

                                    {/* Dashboard Popper */}
                                    <Popper
                                        open={dashboardPopper}
                                        anchorEl={anchorRef.current}
                                        placement='bottom-end'
                                        disablePortal
                                        modifiers={[{ name: 'offset', options: { offset: [-2, 8] } }]} // slight vertical spacing
                                         sx={{
                                            zIndex: 1300,
                                            display: { xs: 'none', md: 'block' },
                                            bgcolor: 'primary.main',
                                            boxShadow: '2px 3px 10.8px 0px rgba(0, 0, 0, 0.12)',
                                            borderRadius: '8px',
                                            border: '1px solid #A1A1AA',
                                        }}
                                    >
                                        <ClickAwayListener onClickAway={handleCloseDashboard}>
                                            <Box>
                                                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: '116px', px: '24px', pt: '32px' }}>
                                                    {/* Dashboard List */}
                                                    <List disablePadding>
                                                        {dashBoardItems.map((item) => (
                                                        <Link
                                                            key={item.to}
                                                            component={RouterLink}
                                                            to={item.to}
                                                            onClick={handleCloseDashboard}
                                                            underline="none"
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                height: '40px',
                                                                color: "primary.text",
                                                                fontSize: '16px',
                                                                "&:hover": {
                                                                    color: "primary.charcoal",
                                                                },
                                                                fontFamily: "Aremat, serif",
                                                                }}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                        ))}
                                                    </List>
                                                    <Box component="hr" sx={{height: '0.2px', width:'100%', bgcolor: 'rgba(0, 0, 0)', border: 'none', mt: '32px'}} />
                                                    {/* Log Out */}
                                                    <Link
                                                        component={RouterLink}
                                                        to='/login'
                                                        onClick={handleCloseDashboard}
                                                        underline="none"
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            height: '50px',
                                                            color: "primary.text",
                                                            fontSize: '16px',
                                                            "&:hover": {
                                                                color: "primary.charcoal",
                                                            },
                                                            fontFamily: "Aremat, serif",
                                                            }}
                                                        >
                                                            Log Out
                                                    </Link>
                                                </Box>
                                            </Box>
                                        </ClickAwayListener>
                                    </Popper>
                                </Box>
                            )
                            }


                            {/* Cart */}
                            {
                            isAuthenticated? (
                                <Link component={RouterLink} to="/">
                                <img src="./newAsset/svg/cart.svg" alt="cart" style={{height: '24px'}} />
                                </Link>
                            ) : null
                            }
                        </Box>
                    </Grid>
                    
                </Grid>
            </Container>
        </Toolbar>
    </AppBar>
      {/*---------- End of NavBar -----------*/}
      {/* Login propup */}
      <Dialog
        open={isLoginPopupOpen}
        onClose={closeLoginPopup}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
            margin: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
        }}
      >
        <DialogContent sx={{ 
          padding: 0,
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Login
            onClose={closeLoginPopup}
            open={isLoginPopupOpen}
            prefillEmail={tempEmail}
            prefillPassword={tempPassword}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
