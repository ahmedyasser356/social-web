import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

 async function getPostDetails(id:string) {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: Cookies.get("token") || "",
          },
        }
      );
    return  data.post
    }

    export let fetchSinglePost=createAsyncThunk('singlePost/getSinglePost', getPostDetails)
let initialState={
    post:{},
    loading:false
}

let singlePostSlice = createSlice({
    name:'singlePost',
    initialState,
    reducers:{},
    extraReducers:(b)=>{
b.addCase(fetchSinglePost.fulfilled,(state,action)=>{
    state.post=action.payload
    state.loading = false
})
b.addCase(fetchSinglePost.pending,(state,action)=>{
    state.loading = true
})
b.addCase(fetchSinglePost.rejected,(state,action)=>{
    state.loading = false
})
    }
})

export let singlePostReducer = singlePostSlice.reducer