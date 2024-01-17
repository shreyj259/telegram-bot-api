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
    /* try {
      setIsLoading(true)
      const res=await axios.post("https://pro-quill-production.up.railway.app/login",user)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    } */

    try {
      window.open('http://localhost:5000',"_self")
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
{/* 
          <CustomLabel>Email</CustomLabel>
          <CustomInput  onChange={(e)=>setUser({...user,email:e.target.value})}/>

          <CustomLabel>Password</CustomLabel>
          <CustomInput type="password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
 */}
          <PrimaryButton disabled={isLoading} onClick={login} variant="contained">Login</PrimaryButton>

          {/* <CustomLabel>
            Don't Have an Account? <Link className="primary-color-text" to="/register">
               Register here
            </Link>
          </CustomLabel> */}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login