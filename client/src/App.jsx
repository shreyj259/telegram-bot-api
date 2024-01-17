import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { ThemeProvider } from "@mui/material"
import { theme } from "./utils/MuiComponents"
import './App.css'
import { Dashboard } from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
       <BrowserRouter>
    <ThemeProvider theme={theme}>
    <ToastContainer />
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App
