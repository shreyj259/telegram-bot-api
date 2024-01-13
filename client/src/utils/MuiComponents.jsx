import styled from "@emotion/styled";
import { Button, TextField, Typography, createTheme } from "@mui/material";

export const theme=createTheme({
    typography:{
        fontFamily: "'Montserrat', sans-serif"
    }
})

export const FormHeading=styled(Typography)({
    color: "#555555",
    textAlign: "center",
    padding:"10px 0 30px",
    fontWeight: 500,
    fontSize: "20px",
})

export const CustomInput=styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
    '& .MuiInputBase-input':{
      padding:"8px 12px",
    },
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderColor: "#EEEEEE",
    marginBottom:"20px"
  })

  export const PrimaryButton=styled(Button)({
    width:"100%",
    backgroundColor:"#00BCBC",
    textTransform:"none",
    marginBottom:"10px",
    '&:hover':{
        backgroundColor:"#00BCBC",
    }
  })

 export const CustomLabel=styled(Typography)({
    color: "#555555",
    textAlign: "left",
    fontWeight: 500,
    fontSize: "14px",
  })