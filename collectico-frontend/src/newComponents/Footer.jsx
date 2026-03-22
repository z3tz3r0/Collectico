import React from 'react'
import { Box, Link, InputBase, Typography, Container, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <Box component="footer" sx={{pb: '32px', bgcolor: 'primary.main'}}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Grid container spacing={1}>
              {/* Left side */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: {xs:'center', md: 'start'}, textAlign: {xs:'center', md: 'start'}, width: {md: '292px'} }}>
                  {/* Logo */}
                  <Link component={RouterLink} to="/">
                    <img
                      src="/newAsset/svg/logo.svg"
                      alt="logo"
                      style={{ height: "20px" }}
                    />
                  </Link>
                  <Typography variant='body1' sx={{fontWeight: 500, fontSize: {md:'14px'}, pt: {xs:'16px', md: '36px'}, pb: {xs:'12px', md: '8px'}, lineHeight: {md: '25px'}}}>Join Our Mailing List. Receive the latest news and curated promotions.</Typography>
                  {/* Recieve Email Box */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: 'center',
                      width: {xs:"260px", md: "272px"},
                      height: '30px',
                      borderRadius: "9999px",
                      border: "1px solid #1B1B1B",
                      bgcolor: "#f9f9f9",
                      pl: "16px",
                      mb: {xs:"24px", md: "8px"}
                    }}
                  >
                    <InputBase
                      placeholder="Enter your email"
                      fullWidth
                      sx={{
                        input: {
                          fontSize: 12,
                          color: "primary.text",
                          "::placeholder": {
                            color: "#2D2D2D",
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    <Link component={RouterLink} to="/">
                      <img
                        src="./newAsset/svg/arrow.svg"
                        alt="arrow"
                        style={{ height: "32px" }}
                      />
                    </Link>
                  </Box>
                  <Typography sx={{fontSize: {xs:'8px', md: '10px'}}}>
                    By signing up to receive emails from collectico,<br/> you agree to our&nbsp; 
                    <Link component={RouterLink} to="/" sx={{ color: 'primary.text', textDecoration: 'underline'}}>
                      Privacy Policy
                    </Link>.  
                    We treat your info responsibly
                  </Typography>
                  </Box>
                </Grid>

                {/* Right side Link footer*/}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{display: 'flex', justifyContent: {xs: 'space-between', md: 'end'}, gap: {md:'100px'}, alignItems: 'start', width: '100%', pt: {xs:'36px', md: '0'}}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: {xs:'24px', md: '28px'}}}>
                      <Typography sx={{fontSize: {xs:'12px', md: '12px'}, fontWeight: {xs:'600', md: '700'}}}>About Us</Typography>
                      <Link component={RouterLink} to="/">
                        <Typography sx={{fontSize: {xs:'10px', md: '10px'}, '&:hover': {textDecoration: 'underline'}}}>Team Member</Typography>
                      </Link>
                      <Link component={RouterLink} to="/">
                        <Typography sx={{fontSize: {xs:'10px', md: '10px'}, '&:hover': {textDecoration: 'underline'}}}>Mission and History</Typography>
                      </Link>
                      <Link component={RouterLink} to="/">
                        <Typography sx={{fontSize: {xs:'10px', md: '10px'}, '&:hover': {textDecoration: 'underline'}}}>Financial Reporting</Typography>
                      </Link>
                    </Box>
                    <Box  sx={{display: 'flex', flexDirection: 'column', gap: {xs:'24px', md: '28px'}}}>
                      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs:'center', md: 'end'}, gap: {xs:'24px', md: '28px'}}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs:'start', md: 'end'}, gap: {xs:'24px', md: '28px'}}}>
                          <Typography sx={{fontSize: {xs:'12px', md: '12px'}, fontWeight: {xs:'600', md: '700'}}}>Support Us</Typography>
                          <Link component={RouterLink} to="/">
                            <Typography sx={{fontSize: {xs:'10px', md: '10px'}, '&:hover': {textDecoration: 'underline'}}}>Luminary</Typography>
                          </Link>
                        </Box>
                      </Box>
                      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs:'center', md: 'end'}, gap: {xs:'24px', md: '28px'}}}>
                        <Typography sx={{fontSize: {xs:'12px', md: '12px'}, fontWeight: {xs:'600', md: '700'}}}>Follow Us</Typography>
                        {/* social media icon */} 
                        <Box sx={{display: 'flex', gap: '16px', alignSelf: 'center'}}>
                          <Link component={RouterLink} to="/">
                            <img
                            src="./newAsset/svg/facebook.svg"
                            alt="facebook"
                            style={{ height: "12px" }}
                            />
                          </Link>
                          <Link component={RouterLink} to="/">
                            <img
                            src="./newAsset/svg/x.svg"
                            alt="x"
                            style={{ height: "12px" }}
                            />
                          </Link>
                          <Link component={RouterLink} to="/">
                            <img
                            src="./newAsset/svg/insta.svg"
                            alt="insta"
                            style={{ height: "12px" }}
                            />
                          </Link>
                          <Link component={RouterLink} to="/">
                            <img
                            src="./newAsset/svg/youtube.svg"
                            alt="youtube"
                            style={{ height: "12px" }}
                            />
                          </Link>
                          <Link component={RouterLink} to="/">
                            <img
                            src="./newAsset/svg/tiktok.svg"
                            alt="tiktok"
                            style={{ height: "12px" }}
                            />
                          </Link>

                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            {/* </Box> */}
          </Container>
      </Box>
    </>
  )
}
