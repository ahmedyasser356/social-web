import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

let initialState: {
  loading: Boolean;
  data: {},
  error:any
} = {
  loading: false,
  data: {},
  error:null
};
async function handleLogin(v:any) {
      let { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      v
    );
     return data
    
}

export let fetchLogin = createAsyncThunk('login/handleLogin',handleLogin)

let loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchLogin.fulfilled,(state,action)=>{
        state.data = action.payload
        state.loading = false
        state.error = null 
    })
    builder.addCase(fetchLogin.pending,(state,action)=>{
        state.error=null 
        state.loading = true
    })
    builder.addCase(fetchLogin.rejected,(state,action)=>{
        state.error=action.error.message 
        state.loading = false
    })
  }
});

export let loginReducer = loginSlice.reducer



