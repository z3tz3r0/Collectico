import { Box, Link, Typography, Container, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ButtonBackTop from '../newComponents/ButtonBackTop';

export default function BlogPage() {
  
  const blogImages = [
    "/newAsset/picture/blogImage/imgBlog1.svg",
    "/newAsset/picture/blogImage/imgBlog2.svg",
    "/newAsset/picture/blogImage/imgBlog3.svg",
    "/newAsset/picture/blogImage/imgBlog4.svg",
    "/newAsset/picture/blogImage/imgBlog5.svg",
    "/newAsset/picture/blogImage/imgBlog6.svg",
    "/newAsset/picture/blogImage/imgBlog7.svg",
    "/newAsset/picture/blogImage/imgBlog8.svg",
    "/newAsset/picture/blogImage/imgBlog9.svg",
    "/newAsset/picture/blogImage/imgBlog10.svg",
    "/newAsset/picture/blogImage/imgBlog11.svg",
    "/newAsset/picture/blogImage/imgBlog12.svg",
    "/newAsset/picture/blogImage/imgBlog13.svg",
    "/newAsset/picture/blogImage/imgBlog14.svg",
    "/newAsset/picture/blogImage/imgBlog15.svg",
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      {/*--------- Header ---------*/}
      <Box component="header" sx={{ bgcolor: 'primary.main' }}>
        <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Typography variant='h1' sx={{fontSize: {xs:'20px', sm: '24px', md: '32px'}, textTransform: 'none', alignSelf: 'center', pb: {xs: '12px', md: '32px'}, textAlign: {xs: 'center', md: 'start'}}}>Blog</Typography>
            <Grid container spacing={1} sx={{display: 'flex', alignItems: 'stretch'}}>
              {/* Left side */}
              <Grid size={{ xs: 12, md: 7.3 }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: {xs:'center', md:'start'}, height: '100%', mb: {xs: '20px', md: '0'}}}>
                    <Box
                      component="img"
                      src="./newAsset/picture/imgMainSpotlight.svg"
                      sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                        width: {xs: 'auto', md:'100%'},
                        height: {md: '400px'},
                        objectFit: 'cover',
                        objectPosition: 'center 80%'
                      }}
                    />
                </Box>
              </Grid>
              {/* Right side */}
              <Grid size={{ xs: 12, md: 4.7 }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', pl: {md: '36px'}, height: '100%'}}>
                  <Typography variant="h3" sx={{fontSize: {xs:'20px', sm: '24px', md: '32px'}}}>Borem ipsum dolor</Typography>
                  <Typography variant="body1" sx={{fontSize: {xs:'12px', sm: '14px', md: '20px'}, my: {xs: '12px', md:'44px'}}}>
                    Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
                  </Typography>
                  <Button component={RouterLink} to='/detailblog' sx={{bgcolor: 'primary.brown', width: { xs: '120px', md: '100%'}, height: '42px', alignSelf: 'center', ":hover":{bgcolor: 'primary.darkCocoa'} }}>Read more</Button>
                </Box>
              </Grid>
            </Grid>
        </Container>
      </Box>

      {/*----------- Main -----------*/}
      <Box component="main">
        {/*----------- Section Blog -----------*/}
        <Box component="section" id="blog" sx={{pt: '40px', pb: '44px', bgcolor: 'primary.main'}}>
          <Container disableGutters maxWidth="xl" sx={{px: {xs: "4.6%", md: "12.5%", xl: "180px"}}}>
            <Grid container spacing={5} justifyContent='center'>
                {blogImages.map((blog, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4}} sx={{width:{xs: '280px', md: '315px'}, height: {xs: '400px', md: '520px'}}}>
                        <Box component={RouterLink} to='/detailblog'>
                          <Typography sx={{fontSize: {xs: '20px', md: '32px'}, fontWeight: 600, lineHeight: {xs: '60px', md:'72px'}}}>09</Typography>
                          <Typography sx={{fontSize: {xs: '12px', md: '20px'}, mb: {xs: '20px', md:'24px'}}}>June, 2025</Typography>
                          <Box
                              component="img"
                              src={blog}
                              sx={{ boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                                  width: {xs: 'auto', md:'100%'},
                                  height: {md: '192px'},
                                  objectFit: 'cover',
                                  objectPosition: 'center 80%',
                                  mb: {xs: '6px', md:'22px'}
                              }}
                          />
                          <Typography sx={{fontSize: {xs: '20px', md: '20px'}, fontWeight: 600, mb: {xs: '8px', md:'15px'}}}>Rorem ipsum dolor sit amet, consectetur</Typography>
                          <Typography sx={{fontSize: {xs: '12px', md: '16px'}}}>Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Button */}
            <ButtonBackTop />
          </Container>
        </Box>

        
    </Box>
</Box>
  );
}
