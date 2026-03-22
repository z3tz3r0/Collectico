import { Box, Link, Typography, Container, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ButtonBackTop from '../newComponents/ButtonBackTop';

export default function DetailBlogPage() {
  
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      {/*--------- Header ---------*/}
      <Box component="header" sx={{ bgcolor: 'primary.main' }}>
        <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}, pt: {xs: '0',md:'24px'}}}>
            <Typography variant='h1' sx={{fontSize: {xs:'20px', sm: '24px', md: '32px'}, textTransform: 'none', alignSelf: 'center', pb: {xs: '12px', sm: '20px', md: '32px'}, textAlign: {xs: 'center', md: 'start'}}}>Blog</Typography>
        </Container>
      </Box>

      {/*----------- Main -----------*/}
      <Box component="main">
        {/*----------- Section Detail Blog -----------*/}
        <Box component="section" id="detail-blog" sx={{pb: {xs: '12px', md: '40px'}, bgcolor: 'primary.main'}}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Box
                component="img"
                src="./newAsset/picture/imgMainSpotlight.svg"
                sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                width: '100%',
                height: {xs: '112.5vw', sm: '60vw', md:'648px'},
                objectFit: 'cover',
                objectPosition: 'center 80%',
                mb: {xs: '12px', sm: '20px', md: '40px'}
                }}
            />
            <Typography variant='h2' sx={{fontSize: {xs:'16px', sm: '24px', md: '32px'}, pb: {xs: '12px', md: '40px'}}}>Borem ipsum dolor</Typography>
            <Typography variant='body1' sx={{fontSize: {xs:'12px', sm: '16px', md: '20px'}, pb: {xs: '12px', md: '40px'}}}>Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</Typography>
            <Grid container spacing={2}>
                <Grid size={{xs: 6}} >
                    <Box
                        component="img"
                        src="./newAsset/picture/imgSideSpotlight1.svg"
                        sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                        width: '100%',
                        height: {xs: '60vw', sm: '55vw', md: '652px'},
                        objectFit: 'cover',
                        objectPosition: 'center 80%',
                        mb: {xs: '12px', sm: '20px', md: '40px'}
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6}}>
                    <Box
                        component="img"
                        src="./newAsset/picture/imgSideSpotlight2.svg"
                        sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                        width: '100%',
                        height: {xs: '60vw', sm: '55vw', md: '652px'},
                        objectFit: 'cover',
                        objectPosition: 'center 80%',
                        mb: {xs: '12px', sm: '20px', md: '40px'}
                        }}
                    />
                </Grid>
            </Grid>
            <Typography variant='body1' sx={{fontSize: {xs:'12px', sm: '16px', md: '20px'}, pb: {xs: '12px', sm: '20px', md: '32px'}}}>Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</Typography>
            <Box
                component="img"
                src="./newAsset/picture/imgSideSpotlight3.svg"
                sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                width: '100%',
                height: {xs: '60vw', sm: '55vw', md: '648px'},
                objectFit: 'cover',
                objectPosition: 'center 80%',
                mb: {xs: '12px', sm: '20px', md: '40px'}
                }}
            />
            <Typography variant='body1' sx={{fontSize: {xs:'12px', sm: '16px', md: '20px'}}}>Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</Typography>

            {/* Button */}
            <Box sx={{my: '80px'}}>
                <ButtonBackTop />
            </Box>
          </Container>
        </Box>

        
    </Box>
</Box>
  );
}
