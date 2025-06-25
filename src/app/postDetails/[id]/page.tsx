"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Post } from "@/interfaces/posts";
import { use } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { convertDate } from "@/helpers/convertDate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";
import CommentIcon from "@mui/icons-material/Comment";
import CommentItem from "@/app/_components/CommentItem";
import { useParams } from "next/navigation";
import Loading from "@/app/_components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/libs/store";
import { fetchSinglePost } from "@/libs/singlePost";
import { fetchUserInfo } from "@/libs/userSlice";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Page() {
  let dispatch = useDispatch<AppDispatch>()
  let {loading,post}=useSelector((state:RootState)=>state.singlePost)
  let x = useParams();
   
 
  
let {userInfo,loading:loading2}=useSelector((state:RootState)=>state.user)
  useEffect(() => {
   dispatch(fetchSinglePost(x.id))
   dispatch(fetchUserInfo())
     
  }, [x.id]);
  const [expanded, setExpanded] = React.useState(false);
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if ((loading && loading2)  || !post.user) return <Loading />;
  return (
    <>
    <Grid
        className="post-details-page"
        container
        justifyContent="center"
        spacing={2}
      >
        <Grid size={{ md: 5 }}>
          <Card
            className="post-details-card"
            sx={{ width: "100%", marginBottom: "30px" }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <img src={post.user?.photo} width="100%" />
                </Avatar>
              }
              title={post.user?.name}
              subheader={convertDate(post.createdAt)}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {post?.body}
              </Typography>
            </CardContent>
            {post?.image && (
              <CardMedia
                component="img"
                image={post.image}
                alt="Paella dish"
              />
            )}
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
              disableSpacing
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            {userInfo._id==post.user._id?<Link href={`/updatepost/${post._id}`}>
        <IconButton className='update-post-box' sx={{fontSize:'21px',position:'relative'}} aria-label="update post">
         <i className="fa-solid fa-pen-to-square"></i>
         <Typography className='update-post-info' sx={{color:'black',position:'absolute',paddingY:'4px',paddingX:'2px',backgroundColor:'#0002',borderRadius:'10px',width:'82px',left:'40px'}} fontSize={'10px'}>update post</Typography>
        </IconButton>
        </Link>:''}
              
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              
            </CardActions>
            {post?.comments[0] &&
              post?.comments.map((comment) => {
                return <CommentItem comment={comment} />;
              })}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
