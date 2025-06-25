 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
let initialState:{data:{},loading:Boolean} ={data:{},loading:false}
async function handleChangePassword(v:{password:string,newPassword:string}){
let {data} = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,v,{headers:{
    token:Cookies.get('token')
}})
return data
}
export const fetetChangePassord = createAsyncThunk('changePassword/handelChangePassword',handleChangePassword)

const changePasswordSlice = createSlice({
    name:'changePassword',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetetChangePassord.fulfilled,(state,action)=>{
            state.data =action.payload
            state.loading = false
        })
        builder.addCase(fetetChangePassord.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(fetetChangePassord.rejected,(state,action)=>{
            state.loading = false
        })
    }
})

export const changePasswordReducer = changePasswordSlice.reducer