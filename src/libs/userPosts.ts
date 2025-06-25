import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

async function getUserPosts(id:string) {
        let {data}=await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`,
            {headers:{token:Cookies.get('token')}})

        return data.posts 
    }

export let fetchUserPosts = createAsyncThunk('userPosts/getUserPosts',getUserPosts) 
let userPostsSlice = createSlice({
    name:'userPosts',
    initialState:{userPostsList:[],loading:false},
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(fetchUserPosts.fulfilled,(state,action)=>{
        state.userPostsList = action.payload
        state.loading = false
     })
     builder.addCase(fetchUserPosts.pending,(state,action)=>{
        state.loading = true
     })
     builder.addCase(fetchUserPosts.rejected,(state,action)=>{
        state.loading = false
     })
    }
})
export let userPostsReducer = userPostsSlice.reducer