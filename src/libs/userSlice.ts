import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

async function getUserInfo() {
    let {data}=await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{headers:{
       token: Cookies.get('token')
    }})
    return data.user
}

export let fetchUserInfo = createAsyncThunk('user/getUserInfo',getUserInfo)

let userSlice = createSlice({
    name:'user',
    initialState:{
        userInfo:{}
        ,loading:false
    },
    reducers:{},
    extraReducers:(b)=>{
        b.addCase(fetchUserInfo.fulfilled,(state,action)=>{
            state.userInfo = action.payload
        })
        b.addCase(fetchUserInfo.pending,(state,action)=>{
             state.loading = true
        })
        b.addCase(fetchUserInfo.rejected,(state,action)=>{
             state.loading = false
        })
    }
})

export let UserReducer = userSlice.reducer