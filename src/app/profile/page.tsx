"use client"
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreatePost from '../_components/CreatePost'
import PostItem from '../_components/PostItem'
import { Post } from '@/interfaces/posts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/libs/store'
import { fetchUserInfo } from '@/libs/userSlice'
import axios from 'axios'
import Cookies from 'js-cookie'
import { fetchUserPosts } from '@/libs/userPosts'
import Loading from '../_components/Loading'

export default function profile() {
    let dispatch = useDispatch<AppDispatch>()
    let {userInfo}=useSelector((state:RootState)=>state.user)
    let {userPostsList,loading}=useSelector((state:RootState)=>state.userPosts)
     
    //=================== fetch user posts ======================
    

    useEffect(()=>{
    dispatch(fetchUserInfo())
    dispatch(fetchUserPosts(userInfo?._id))
    },[userInfo?._id])


  return (
    <>
      <Typography sx={{marginBottom:'10px',backgroundColor:"lightblue",color:'#000b', padding:'8px',borderRadius:'50px', display:"inline-block"}} 
        variant='h6'>Profile Page</Typography>

     <Container maxWidth={'sm'}>
         <Grid container  spacing={3} size={{xs:12,md:5}}>
      <Grid size={12}> <CreatePost/></Grid>
     {loading?<Loading></Loading>:<> {userPostsList?.map((post:Post)=><Grid size={12}>
     
      <PostItem key={post._id} post={post}></PostItem>
      </Grid>)}</>}
      </Grid>
     </Container>


    </>
  )
}
