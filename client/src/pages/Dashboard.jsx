import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Dashboard = () => {

    const [users,setUser]=useState([])


    const banUser=async(id)=>{
        try {
            const resut=await axios.post('https://pro-quill-production.up.railway.app/telegram/ban',{userId:id})
            toast.success('User banned')
            let tempusers=[...users]
            tempusers=tempusers.map((user)=>{
                if(user.chatId==id)
                user.isBlocked=true
                return user;
            })
            setUser(tempusers)
            
        } catch (error) {
            console.log(error)
        }
    }

    const unbanUser=async(id)=>{
        try {
            const resut=await axios.post('https://pro-quill-production.up.railway.app/telegram/unban',{userId:id})
            toast.success('User unbanned')
            let tempusers=[...users]
            tempusers=tempusers.map((user)=>{
                if(user.chatId==id)
                user.isBlocked=false
                return user;
            })
            setUser(tempusers)
        } catch (error) {
            console.log(error)
        }
    }

    const removeUser=async(id)=>{
        try {
            const resut=await axios.post('https://pro-quill-production.up.railway.app/telegram/remove',{userId:id})
            toast.success('User Removed')
            let tempusers=[...users]
            tempusers=tempusers.filter((user)=>user.chatId!=id)
            setUser(tempusers)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUsers=async()=>{
        try {
            const result=await axios.get('https://pro-quill-production.up.railway.app/telegram')
            setUser(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])


    const rows=users.map((user,index)=>{
        return {
            id:index+1,
            col1:index+1,
            col2:user.name,
            col3:user.username,
            col4:user.chatId,
            col5:user.isBlocked,
        }
    })


      const columns = [
        { field: 'col1', headerName: 'ID', width: 50 },
        { field: 'col2', headerName: 'Name', width: 150 },
        { field: 'col3', headerName: 'Username', width: 200 },
        { field: 'col4', headerName: 'ChatId', width: 150 },
        { field: 'col5', headerName: 'Blocked', width: 150 },
        { field: 'col6', headerName: 'Block User', width: 150,renderCell:(params)=>(
            params.row.col5==true?<Button color="error" onClick={()=>unbanUser(params.row.col4)}>Unban</Button>:<Button onClick={()=>banUser(params.row.col4)}>Ban</Button>)} ,
        { field: 'col7', headerName: 'Remove User', width: 150,renderCell:(params)=>(<Button color="error" onClick={()=>removeUser(params.row.col4)}>Remove</Button>) },
      ];



  return (
    <>
    <Navbar/>
    <Container>
        <Typography variant='h5' sx={{my:3}}>
            Welcome to the Weather bot Admin Panel
        </Typography>

        <Box>
        <DataGrid sx={{backgroundColor:"#fff"}} rows={rows} columns={columns} />
        </Box>

    </Container>
    </>
  )
}
