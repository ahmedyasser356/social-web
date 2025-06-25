"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
 
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/libs/store";
import { fetchUserInfo } from "@/libs/userSlice";
import Head from "next/head";
import toast from "react-hot-toast";
 
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

export default function InputFileUpload() {


  let [imageSrc, setImageSrc] = React.useState("");
  let [photo, setPhoto] = React.useState(null);

  let dispatch = useDispatch<AppDispatch>()

 function makeImage(e){
    let img = e.target.files[0]
    setPhoto(img)
   let url =URL.createObjectURL(img)
   setImageSrc(url)
  }


  async function uploadPhoto() {
    //handle form data
    let formdata = new FormData();
    formdata.append("photo", photo);
    let { data } = await axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,formdata,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    if(data.message == 'success'){
      setImageSrc('')
      setPhoto(null)
      toast.success('Your photo has been changed.',{
        position:'top-center',
        duration:5000,
         
      })
      dispatch(fetchUserInfo())
    }
    
  }
  return (<>

  <Head>
        <title>My Page Title</title>
        <meta name="description" content="This is my page description" />
      </Head>
  <main>
      <Container sx={{  marginY:'20px' }} maxWidth={"sm"}>
      <Grid container spacing={1}>
        <Grid display={'flex'} justifyContent={'center'} size={12}>
          <img className="preview-change-photo" style={{borderRadius:'10px',display:'block'}} src={imageSrc} width={"50%"} />
        </Grid>
        <Grid justifyContent="center" display={"flex"} size={12}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload photo
            <VisuallyHiddenInput
              type="file"
              onChange={makeImage}
            />
          </Button>
        </Grid>
        <Grid sx={{marginTop:'20px'}} size={12} display={'flex'} justifyContent={'center'}>
          <Button onClick={uploadPhoto} variant="contained">Change photo</Button>
        </Grid>
      </Grid>
    </Container>
  </main>
  </>);
}
