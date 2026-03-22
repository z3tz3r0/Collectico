import { Box, Link, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TimeBlock from '../TimeBlock';

export default function HeroSection1() {
  return (
    <>
      <Grid container spacing={1}>
              {/* Left side */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs:'center', md:'start'}}}>
                  <Box sx={{display: 'flex', alignItems: 'start', gap: '2px'}}>
                    <Typography variant='h1' sx={{lineHeight: 1}}>Live</Typography>
                    <Box
                      component="img"
                      alt='circle'
                      src="./newAsset/svg/circle.svg"
                    />
                  </Box>
                  <Box sx={{ py: '12px'}}>
                    <Box
                      component="img"
                      src="./newAsset/picture/imgLive.svg"
                      sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                        width: {xs: 'auto', md:'512px'}
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              {/* Right side */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'start', mt: {xs: '0', md: '44px' }, pl: {md: '36px'}}}>
                  <Typography variant="h3" sx={{fontSize: {xs:'24px', md: '32px'}}}>Unused Layout</Typography>
                  <Box sx={{ display: "flex", alignItems: 'center', gap: '4px', width: {xs: 'auto', md: 'auto'}, height: 32, mt: {xs:'16px', md: '20px'}, mb: {xs:'4px', md: '40px'} }}>
                    <Box component="img" src="./newAsset/svg/profilePic.svg" sx={{ width: 32, height: 32 }}></Box>
                    <Typography variant="body1" sx={{fontSize: '10px', fontWeight: '600'}}>@Nonsense</Typography>
                  </Box>
                  <Typography variant="body1" sx={{fontSize: '10px', fontWeight: '600', width: '100%', textAlign: {md:'center'}}}>Description</Typography>
                  <Typography variant="body1">
                    This artwork reflects the moment when hours of creation lead to something unusable — a feeling many artists know well. It speaks to the frustration of unmet expectations, but also the hidden value in failure. Each abandoned effort shapes growth.
                  </Typography>
                  <Link component={RouterLink} to="/" underline='none' sx={{fontSize: {xs:'10px', md: '16px'}, alignSelf: {xs:'start', md: 'center'}, color: 'primary.brown', fontWeight: '600', my: {xs: 0, md: '20px'}}}>See details</Link>
                  {/* Button */}
                  <Box sx={{display: 'flex', flexDirection: {xs: 'row', md: 'column'}, alignItems: 'center', width: '100%', gap: '20px', py: {xs:'12px', md: '0'}}}>
                    <Button sx={{bgcolor: 'primary.brown',  width: '100%', maxWidth: '360px', ":hover":{bgcolor: 'primary.darkCocoa'} }}>Buy now</Button>
                    <Button sx={{bgcolor: 'primary.main', color: 'primary.text', border: "1px solid #1B1B1B", width: '100%', maxWidth: '360px', ":hover":{bgcolor: 'primary.softGray'} }}>Make offer</Button>
                  </Box>
                  {/* Time Block */}
                  <Box sx={{mt: {xs:'12px', md: '20px'}}}>
                    <TimeBlock />
                  </Box>
                </Box>
              </Grid>
            </Grid>
    </>
  )
}
