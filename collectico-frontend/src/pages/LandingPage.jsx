import { Box, Link, Typography, Container, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageCarousel from '../newComponents/ImageCarousel';
import HeroSection1 from '../newComponents/landingPageComponents/HeroSection1';
import HeroSection2 from '../newComponents/landingPageComponents/HeroSection2';
import HeroCarousel from '../newComponents/landingPageComponents/HeroCarousel';

export default function LandingPage() {
  
  const featureImages = [
    "/newAsset/picture/imgFeature1.svg",
    "/newAsset/picture/imgFeature2.svg",
    "/newAsset/picture/imgFeature3.svg",
    "/newAsset/picture/imgFeature4.svg",
    "/newAsset/picture/imgFeature5.svg",
    "/newAsset/picture/imgFeature6.svg",
    "/newAsset/picture/imgFeature7.svg",
    "/newAsset/picture/imgFeature8.svg",
  ];

  const SideSpotlightImages = [
    "/newAsset/picture/imgSideSpotlight1.svg",
    "/newAsset/picture/imgSideSpotlight2.svg",
    "/newAsset/picture/imgSideSpotlight3.svg",
    "/newAsset/picture/imgSideSpotlight4.svg",
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      {/*--------- Header ---------*/}
      <Box component="header">

        {/*--------- Hero Section -----------*/}
        <Box component="section" id="hero" sx={{ bgcolor: 'primary.main' }}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>

            {/* Hero Carousel */}
            <HeroCarousel 
              heroSections = {[
                  <HeroSection1 />,
                  <HeroSection2 />
                ]}
            />
          </Container>
        </Box>
      </Box>

      {/*----------- Main -----------*/}
      <Box component="main">
        {/*----------- Section Feature -----------*/}
        <Box component="section" id="feature" sx={{pt: '40px', pb: '44px', bgcolor: 'primary.main'}}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Typography variant="h2" sx={{alignSelf: {md: 'start'}}}>Features works</Typography>

              {/* Image Carousel For Mobile */}
              <Box sx={{ display: {xs:'flex', md: 'none'}, justifyContent: 'center'}}>
                <ImageCarousel 
                  images={featureImages}
                  imgWidth='288px'
                  imgHeight='380px'
                  gap='24px'  
                />
              </Box>

              {/* Image For Desktop */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%',height: '600px', mt: '20px', overflow: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '12px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: '#F2F2F2',
                          borderRadius: '5.5px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#FFF',
                          borderRadius: '5.5px',
                          border: '1px solid #F2F2F2',
                          boxShadow: 'inset 0px 4px 4px 0px rgba(0, 0, 0, 0.15)',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          backgroundColor: '#555',
                        },
            }}>
                <Grid container spacing={4} justifyContent="center">
                  {featureImages.map((image, index) => (
                    <Grid item key={index}>
                      <Box component={RouterLink} to='/'>
                        <Box
                          component="img"
                          src={image}
                          loading="lazy"
                          sx={{
                            width: '240px',
                            height: '380px',
                            objectFit: 'cover',
                            boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.03)',
                              boxShadow: '6px 6px 16px 0px rgba(0, 0, 0, 0.35)',
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            
          </Container>
        </Box>

        {/*----------- Section Artist Spotlight -----------*/}
        <Box component="section" id="spotlight" sx={{pb: '68px', bgcolor: 'primary.main'}}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Grid container spacing={1}>
              {/* Left side */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', md: 'start'}, gap: '20px'}}>
                  <Typography variant="h2">Artist Spotlight</Typography>
                  {/* Main Image */}
                  <Box
                    component="img"
                    src="./newAsset/picture/imgMainSpotlight.svg"
                    sx={{ 
                      boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                      width: {xs: '292px', md: '516px'},
                      height: {xs: '360px', md: '644px'},
                      objectFit: 'cover'
                    }}
                  />
                  </Box>
              </Grid>

              {/* Right side */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', md: 'start'}, pt: {xs: 'auto', md: '24px'}, pl: {md:'40px'} }}>
                  <Typography variant='h3' sx={{alignSelf: 'start', mt: {xs:'12px', md: '20px'}}}>Nonsense</Typography>
                  {/* Detail */}
                  <Box>
                    <Typography sx={{fontSize: '12px', lineHeight: '220%'}}>
                      A visual storyteller at the intersection of street culture and digital design, this artist blends playful character creation with bold, urban aesthetics. Inspired by fashion, cartoons, and community culture, their workspace is a living canvas filled with sketches, collectibles, and prints that reflect their dedication to visual identity and brand collaborations.
                    </Typography>
                    <Link component={RouterLink} to="/" underline='none' sx={{fontSize: '12px', alignSelf: 'start', display: 'block',pt: '8px',color: 'primary.brown', fontWeight: '600'}}>More...</Link>
                  </Box>
                  
                  {/* Image Swiper Block For Mobile*/}
                  <Box sx={{display: {xs:'flex', md: 'none'}}}>
                    <ImageCarousel 
                      images={SideSpotlightImages} 
                      imgWidth='240px' 
                      imgHeight='332px' 
                      gap='12px'/>
                  </Box>

                  {/* Image For Desktop */}
                  <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%',height: '360px', mt: '20px', overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                              height: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                              backgroundColor: '#F2F2F2',
                              borderRadius: '5.5px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#FFF',
                              borderRadius: '5.5px',
                              border: '1px solid #F2F2F2',
                              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.15)',
                              willChange: 'transform'
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                              backgroundColor: '#555',
                            },
                    }}>
                      <Grid container spacing={5} justifyContent="center"  wrap= 'nowrap' sx={{width: 'max-content'}} >
                        {SideSpotlightImages.map((image, index) => (
                          <Grid item key={index}>
                            <Box component={RouterLink} to='/'>
                              <Box
                                component="img"
                                src={image}
                                loading="lazy"
                                sx={{
                                  width: '240px',
                                  height: '332px',
                                  objectFit: 'cover',
                                  boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                  transform: 'scale(1.03)',
                                  boxShadow: '6px 6px 10px 0px rgba(0, 0, 0, 0.35)',
                              },
                                }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          
        </Box>
      </Box>
    </Box>
  );
}
