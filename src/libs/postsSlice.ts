import { Post } from "./../interfaces/posts";
import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "next/headers";

async function getPosts() {
  let { data } = await axios.get("https://linked-posts.routemisr.com/posts", {
    headers: {
      token: Cookies.get("token"),
    },
  });
  return data.posts;
}

export let fetchPosts = createAsyncThunk("posts/getPosts", getPosts);

let initialState: {
  postsList: Post[];
  loading: Boolean;
} = {
  postsList: [],
  loading: false,
};

let postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postsList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export let postsReducer = postsSlice.reducer;
