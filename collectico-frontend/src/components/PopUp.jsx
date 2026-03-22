import React from 'react'
import { Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button';

export default function PopUp({icon: Icon, result, message, buttonText, color}) {
  return (
    <Paper elevation={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center', gap: 2, width: 280, py: 4, borderRadius: 5}}>
        <Icon sx={{color: `${color}`, fontSize: '5rem'}}/>
        <Typography sx={{color: `${color}`, fontSize: '1.5rem', fontWeight: 600 }}>{result}</Typography>
        <Typography sx={{px:4}}>{message}</Typography>
        <Button variant="contained" sx={{backgroundColor: 'green', width: 130, borderRadius: 5}}>{buttonText}</Button>
    </Paper>
  )
}
