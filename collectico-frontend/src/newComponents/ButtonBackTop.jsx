import { Box, Link, Typography, Container, Grid, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function ButtonBackTop() {
  const navigate = useNavigate();
  
  return (
    <>
      <Box sx={{display: 'flex', gap: '80px', justifyContent: 'center', mt: '80px'}}>
        {/* Back */}
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
            <Button onClick={() => navigate(-1)} sx={{p: 0, minWidth: 0, height: '48px', width: '48px'}}>
                <img
                    src="./newAsset/svg/back.svg"
                    alt="search"
                    style={{ height: "48px" }}
                />
            </Button>
            <Typography sx={{fontFamily: 'Aremat, serif', fontSize:  {xs: '20px', md: '20px'}}}>Back</Typography>
        </Box>
        {/* Top */}
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} sx={{p: 0, minWidth: 0, height: '48px', width: '48px'}}>
                <img
                    src="./newAsset/svg/top.svg"
                    alt="search"
                    style={{ height: "48px" }}
                />
            </Button>
            <Typography sx={{fontFamily: 'Aremat, serif', fontSize:  {xs: '20px', md: '20px'}}}>Top</Typography>
        </Box>
      </Box>
    </>
  )
}
