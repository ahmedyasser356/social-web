 
import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './postsSlice';
import { UserReducer } from './userSlice';
import { userPostsReducer } from './userPosts';
import { loginReducer } from './loginSlice';
import { changePasswordReducer } from './changePasswordSlice';
import { singlePostReducer } from './singlePost';
 
 
 
export let store = configureStore({
    reducer:{
        posts:postsReducer,
        user:UserReducer ,
        userPosts:userPostsReducer ,
        login:loginReducer,
        changePassword:changePasswordReducer,
        singlePost:singlePostReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>