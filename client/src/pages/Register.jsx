import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  CustomInput,
  CustomLabel,
  FormHeading,
  PrimaryButton,
} from "../utils/MuiComponents";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  })

  const register=async()=>{
    try {
      setIsLoading(false)
      const res=await axios.post("https://pro-quill-production.up.railway.app/register",user)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(true)
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
          <FormHeading>Register Here</FormHeading>

          <CustomLabel>Name</CustomLabel>
          <CustomInput onChange={(e)=>setUser({...user,name:e.target.value}) }/>

          <CustomLabel>Email</CustomLabel>
          <CustomInput onChange={(e)=>setUser({...user,email:e.target.value})}/>

          <CustomLabel>Password</CustomLabel>
          <CustomInput type="password" onChange={(e)=>setUser({...user,password:e.target.value})}/>

          <PrimaryButton disabled={isLoading} onClick={register} variant="contained">Register</PrimaryButton>

          <CustomLabel>
            Already Have an Account?{" "}
            <Link className="primary-color-text" to="/">
              Login here
            </Link>{" "}
          </CustomLabel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
