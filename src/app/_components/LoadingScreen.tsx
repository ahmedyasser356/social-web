import React from 'react'
import ShareIcon from "@mui/icons-material/Share";
import { Typography } from '@mui/material';
export default function LoadingScreen() {
  return ( 
    <section className='loading-screen'>
      <div className='loading-logo'>
        <ShareIcon sx={{color:'#3778f1'}}/>
        <Typography variant='h6' sx={{ color:'#3778f1',letterSpacing:'9px',fontWeight:'bold'}}>FACE
        </Typography>
      </div>
    </section>
  )
}
