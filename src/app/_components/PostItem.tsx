 import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import CommentIcon from '@mui/icons-material/Comment';
import { Post } from '@/interfaces/posts';
import CommentItem from './CommentItem';
import { convertDate } from '@/helpers/convertDate';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/libs/store';
import { fetchPosts } from '@/libs/postsSlice';
import { fetchUserInfo } from '@/libs/userSlice';
import { fetchUserPosts } from '@/libs/userPosts';
import toast from 'react-hot-toast';
 

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  
}));

export default function PostItem({post}:{post:Post}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
// call user info ==========
 let {userInfo}=useSelector((state:RootState)=>state.user)
 React.useEffect(()=>{
  dispatch(fetchUserInfo())
 },[])
// handle delete =============
let dispatch = useDispatch<AppDispatch>()
async function deletePost(id:string){
    let {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,
        {headers:{token:Cookies.get('token')}})

        if(data.message == "success"){
            toast.success('successfully',{
              position:'top-center',duration:5000
            })
             dispatch(fetchPosts())
             dispatch(fetchUserPosts(userInfo._id))
        }
}


  return (
    <Card className='post-details-card' sx={{ width:'100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500] }} aria-label="recipe">
          <img  src={post.user.photo} width='100%' /> 
          </Avatar>
        }
      action={
         userInfo._id == post.user._id ? ( <IconButton onClick={()=>{deletePost(post._id)}}  aria-label="delete-post">
            <DeleteIcon />
          </IconButton>):('')
        }
        
        title={post.user.name}
        subheader={convertDate(post.createdAt)}
      />
       <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
      </CardContent>
     {post.image&& <CardMedia
        component="img"
        image={post.image}
        alt="Paella dish"
      />}
     
      <CardActions sx={{display:'flex',justifyContent:'space-between'}} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>


        {userInfo._id==post.user._id?<Link href={`/updatepost/${post._id}`}>
        <IconButton className='update-post-box' sx={{fontSize:'21px',position:'relative'}} aria-label="update post">
         <i className="fa-solid fa-pen-to-square"></i>
         <Typography className='update-post-info' sx={{color:'black',position:'absolute',paddingY:'4px',paddingX:'2px',backgroundColor:'#0002',borderRadius:'10px',width:'82px',left:'40px'}} fontSize={'10px'}>update post</Typography>
        </IconButton>
        </Link>:''}

        

         <Link href={`/postDetails/${post._id}`}>
          <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
         </Link>
      </CardActions>
     {post.comments[0]&& <CommentItem comment={post.comments[0]}/>}
    </Card>
  );
}
