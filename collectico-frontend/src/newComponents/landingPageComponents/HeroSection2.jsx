import { Box, Typography, Grid } from '@mui/material';

export default function HeroSection2() {
  return (
    <>
     <Grid container spacing={{xs: '12px', sm: '40px', md: '52px'}} sx={{pt: {xs: '20px'}}}>
              <Grid size={{xs: 12}}>
                <Grid container spacing={{xs: '10px', md: '12px'}}>
                  <Grid size={{xs: 12, md: 6}}>
                    <Typography variant='h1' sx={{pb: {xs:'10px', md: '12px'}}}>Express Your Style with Collectico</Typography>
                    <Typography variant='body1' sx={{fontSize: {xs:'16px', md: '20px'}, fontWeight: 500}}>Where Every Artwork Tells a Story.</Typography>
                  </Grid>
                  <Grid size={{xs: 12, md: 6}}>
                    <Typography variant='body1'>Explore our limited edition fine art collection, featuring Portrait, Landscape, Genre, Abstract, and Historical paintings across Classic, Modern, and Contemporary styles. Transform your space with timeless beauty.</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{xs: 12, md: 12}} sx={{display: 'flex', justifyContent: 'center'}}>
                {/* Hero Image For Mobile */}
                <Box
                  component="img"
                  src="./newAsset/picture/imgHero2mobile.svg"
                  sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                    width: {xs: '100%'},
                    minWidth: {xs: '280px'},
                    height: {xs: '550px'},
                    minHeight: {xs: '448px'},
                    objectFit: 'cover',
                    display: {xs: 'block', md: 'none'}
                  }}
                />
                {/* Hero Image For Desktop */}
                <Box
                  component="img"
                  src="./newAsset/picture/imgHero2mobile.svg"
                  sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                    width: {md:'100%'},
                    height: {md: '540px'},
                    objectFit: 'cover',
                    objectPosition: 'center 60%',
                    display: {xs: 'none', md: 'block'}
                  }}
                />
              </Grid>
            </Grid> 
    </>
  )
}
