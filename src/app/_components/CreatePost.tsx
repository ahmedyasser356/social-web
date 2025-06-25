"use client";
import { Box, Button, FormControl, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/libs/store";
import { fetchPosts } from "@/libs/postsSlice";
import { fetchUserPosts } from "@/libs/userPosts";
import toast from "react-hot-toast";

export default function CreatePost() {
  let dispatch = useDispatch<AppDispatch>();
  //the states
  let [image, setImage] = useState(null);
  let [body, setBody] = useState("");
  let [imageSrc, setImageSrc] = useState("");

  //makeImage functions=======
  function makeImage(e: any) {
    let img = e.target.files[0];
    setImage(img);
    let imageSrc = URL.createObjectURL(img);
    setImageSrc(imageSrc);
  }
// get user id ==========
let {userInfo}=useSelector((state:RootState)=>state.user)
  //======= add post function (API) ========
 async function addPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // handle form data format
    const formdata = new FormData();
    formdata.append("body", body);
    formdata.append("image", image);

    let { data } = await axios.post(
      `https://linked-posts.routemisr.com/posts`,
      formdata,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    // if success the fetch
     if(data.message=='success'){
      toast.success('Your post was published successfully!',{position:'top-center',duration:5000})
      setBody('')
      setImage(null)
      setImageSrc('')
      dispatch(fetchPosts())
      dispatch(fetchUserPosts(userInfo?._id))
     }
  }

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

  return (
    <form onSubmit={addPost}>
      <TextField
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
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
        <VisuallyHiddenInput type="file" onChange={makeImage} />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" sx={{ marginTop: "15px" }} variant="contained">
          Add Post
        </Button>
      </Box>
    </form>
  );
}
