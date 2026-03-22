import { Box, Stack, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function TimeBlock({
  timeLeft = 100000000
  }) {
  const [showTimeLeft, setShowTimeLeft] = useState();

  // Wait for timeLeft Prop *****
  useEffect(() => {
    setShowTimeLeft(Math.floor(timeLeft / 1000));
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        let newTimeLeft = prev - 1;
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimeLeft]);

  //Change SECOND to {days, hours, min, sec}
  const remainingDays = Math.floor(showTimeLeft / 86400);
  const remainingHours = Math.floor((showTimeLeft % 86400) / 3600);
  const remainingMin = Math.floor((showTimeLeft % 3600) / 60);
  const remainingSec = showTimeLeft % 60;

  return (
    <Box sx={{mt: {xs:'12px', md: '20px'}}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px'}}>
        {/* label */}
        <Box sx={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          <img src="./newAsset/svg/clock.svg" alt="clock" style={{height: '14px'}} />
          <Typography sx={{fontSize: '12px', fontWeight: 600}}>Time left</Typography>
        </Box>
        {/* time block */}
        <Box sx={{display: 'flex', gap: '16px'}}>
          {/* day */}
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: {xs:'20px', sm: '30px', md: '40px'}, height: {xs:'20px', sm: '30px', md: '40px'}, bgcolor: 'primary.brown' }}>
              <Typography sx={{ color: 'primary.main', fontSize: {xs:'10px', sm: '16px', md:'20px'}, fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {String(remainingDays).padStart(2, "0")}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize: {xs:'8px', sm: '14px', md:'16px'}, fontWeight: 500}}>
                Days
              </Typography>
            </Box>
          </Box>
          {/* hour */}
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: {xs:'20px', sm: '30px', md: '40px'}, height: {xs:'20px', sm: '30px', md: '40px'}, bgcolor: 'primary.brown' }}>
              <Typography sx={{ color: 'primary.main', fontSize: {xs:'10px', sm: '16px', md:'20px'}, fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {String(remainingHours).padStart(2, "0")}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize: {xs:'8px', sm: '14px', md:'16px'}, fontWeight: 500}}>
                Hours
              </Typography>
            </Box>
          </Box>
          {/* min */}
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: {xs:'20px', sm: '30px', md: '40px'}, height: {xs:'20px', sm: '30px', md: '40px'}, bgcolor: 'primary.brown' }}>
              <Typography sx={{ color: 'primary.main', fontSize: {xs:'10px', sm: '16px', md:'20px'}, fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {String(remainingMin).padStart(2, "0")}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize: {xs:'8px', sm: '14px', md:'16px'}, fontWeight: 500}}>
                Min
              </Typography>
            </Box>
          </Box>
          {/* sec */}
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: {xs:'20px', sm: '30px', md: '40px'}, height: {xs:'20px', sm: '30px', md: '40px'}, bgcolor: 'primary.brown' }}>
              <Typography sx={{ color: 'primary.main', fontSize: {xs:'10px', sm: '16px', md:'20px'}, fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {String(remainingSec).padStart(2, "0")}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize: {xs:'8px', sm: '14px', md:'16px'}, fontWeight: 500}}>
                Sec
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
 );
}
