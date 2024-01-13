import { Box, Button, Typography } from '@mui/material'
import {useLocation, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios';

const Navbar = () => {
  const path = useLocation().pathname;
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)

  const handleLogout=async()=>{
    try {
      setIsLoading(true)
      await axios.post("https://pro-quill-production.up.railway.app/logout")
      navigate('/')
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{width:"100%",display:"flex",justifyContent:"space-between",backgroundColor:"#ffffff",py:2}}>
        <Box sx={{px:4}}>
            <Typography sx={{fontWeight:600,color:"#555555",fontSize:"24px"}}>
            Admin <span className='primary-color-text'>Panel</span> 
            </Typography>
        </Box>
        <Box sx={{px:4}}>
          <Button disabled={isLoading} onClick={handleLogout} className='primary-color-text' >Logout</Button>
        </Box>
    </Box>
  )
}

export default Navbar