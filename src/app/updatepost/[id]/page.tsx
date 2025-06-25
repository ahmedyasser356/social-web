"use client"
import { Box, Button, Container, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/libs/store';
import { useParams, useRouter } from 'next/navigation';
import { fetchSinglePost } from '@/libs/singlePost';
import Loading from '@/app/_components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


export default function updatePost() {
   const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

let {push} = useRouter()
  let dispatch = useDispatch<AppDispatch>();
  let params = useParams()
 // call data 
 let {post,loading}=useSelector((state:RootState)=>state.singlePost)
useEffect(() => {
  dispatch(fetchSinglePost(params?.id));
}, [params.id]);

useEffect(() => {
  if (post?.body) {
    setBody(post.body);
  }
}, [post]);

 // handle update post 
 async function updatePost(e) {
   e.preventDefault();
   // handle form data
let formdata = new FormData()
formdata.append('body',body)
formdata.append('image',image)

  let {data}= await axios.put(`https://linked-posts.routemisr.com/posts/${params.id}`,formdata,{headers:{
    token:Cookies.get('token')
  }})

if(data.message == 'success' ){
  setBody('')
  setImageSrc('')
  toast.success('Post updated successfully!',{duration:6000})
  push('/profile')

}
  
 }
  
  
  //the states
  let [image, setImage] = useState(null);
  let [body, setBody] = useState('');
  let [imageSrc, setImageSrc] = useState("");

// prepare the image ============
function preparingImage(e){
let img = e.target.files[0];
    setImage(img);
    let imageSrc = URL.createObjectURL(img);
    setImageSrc(imageSrc);
}

if(post.body&& !loading) return(
  <>
      <Container maxWidth={'sm'}>
        <Typography marginBottom={'20px'} variant='h4'>
          Update Post Form
        </Typography>
        <form onSubmit={updatePost}  >
      <TextField
         value={body}
         onChange={(e)=>{setBody(e.target.value)}}
        fullWidth
        multiline
        rows={2}
        label="your message"
        variant="outlined"
        sx={{ marginBottom: "10px" }}
      ></TextField>
      <img
       src={imageSrc}
        style={{ display: "block", margin: "auto", maxWidth: "60%" }}
      />
      <Button
        fullWidth
        sx={{
          marginTop: "10px",
          color: "#0000f7",
          backgroundColor: "#0000",
          "&:hover": { backgroundColor: "#0001" },
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload image
        <VisuallyHiddenInput onChange={preparingImage} type="file" />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" sx={{ marginTop: "15px" }} variant="contained">
          Update Post
        </Button>
      </Box>
    </form>
      </Container>
    </>
)

  return (<>
  <Loading></Loading> 
  </>)
}
