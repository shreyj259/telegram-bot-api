import { Box, Button, Grid,Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomInput,CustomLabel,FormHeading,PrimaryButton } from "../utils/MuiComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const login=async()=>{
    try {
      window.open('https://pro-quill-production.up.railway.app/',"_self")
      console.log(result);
    } catch (error) {
      
    }
  }


  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={3}>
        <Box
          sx={{
            width: "330px",
            backgroundColor: "#ffffff",
            my: 10,
            borderRadius: "8px",
            p: 3,
          }}
        >
          <FormHeading>Login Here</FormHeading>

          <PrimaryButton disabled={isLoading} onClick={login} variant="contained">Login with Google</PrimaryButton>

        </Box>
      </Grid>
    </Grid>
  )
}

export default Login