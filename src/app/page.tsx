"use client";
import { Post } from "@/interfaces/posts";
import { fetchPosts } from "@/libs/postsSlice";
import { AppDispatch, RootState } from "@/libs/store";
import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./_components/PostItem";
 import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CreatePost from "./_components/CreatePost";
import { fetchUserInfo } from "@/libs/userSlice";
import Loading from "./_components/Loading";
 
 

export default function page() {

  let {push}=useRouter()
  if(!Cookies.get('token')){
   push('/login')
  }

  let dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserInfo())
    dispatch(fetchPosts());
  }, []);
 
  
  // read data from API Post
  let {postsList,loading} = useSelector((state:RootState)=>{return state.posts})
  
   
  let rSideEle = ['Settings','Friends','Saves','Follow Page','Meta Ai','Archive']
  
  return <>
  
<Grid className='home-page'      container justifyContent='center' spacing={1}>
  <Grid className='left-side'  sx={{left:'10px',position:'fixed', display:{xs:'none',md:'block'}}} size={{md:2,xs:0}}>
     <p className="side-setting" style={{borderRadius:'8px',padding:'8px'}}>welcom to the social app</p>
  </Grid>
 
 <Grid container  spacing={2} size={{xs:12,md:5}}>
  <Grid size={12}> <CreatePost/></Grid>
  {loading?<Loading></Loading>:<>{postsList?.map((post:Post)=><Grid size={12}>
   
  <PostItem key={post._id} post={post}></PostItem>
 </Grid>)}</>}
 </Grid>
 
   <Grid className='right-side' position={'fixed'} right={'10px'}   sx={{display:{xs:'none',md:'block'}}} size={{md:2,xs:0}}>
    {rSideEle.map((ele)=> <p className="side-setting" style={{borderRadius:'8px'  ,padding:'8px'}}>{ele}</p>)}
  </Grid>
</Grid>


 
  </>;
}
