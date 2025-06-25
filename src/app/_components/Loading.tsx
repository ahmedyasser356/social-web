import { Box } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{width:'100%',padding:'50px'}}>
      <div className="loader"></div>
    </Box>
  )
}
