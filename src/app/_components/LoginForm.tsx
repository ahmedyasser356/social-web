 "use client";
 import {
   Alert,
   
   Button,
   Container,
   Grid,
  
   TextField,
   Typography,
 } from "@mui/material";
 import React, { useState } from "react";
 import { useFormik } from "formik";
 import Cookies from "js-cookie";
 import * as Yup from "yup";
  
 
 import { useRouter } from "next/navigation";
 import { LoginData } from "@/interfaces/login";
 import { useDispatch, useSelector } from "react-redux";
 import { AppDispatch, RootState } from "@/libs/store";
  
 import { fetchLogin } from "@/libs/loginSlice";
  
 
 export default function LoginForm() {
   
   const initialValues: LoginData = {
     email: "",
     password: "",
   };
   const validationSchema = Yup.object().shape({
     email: Yup.string().required("email is required").email("invaild email"),
     password: Yup.string().required("password is required"),
   });
 
   const { push } = useRouter();
   // login fetch and data=========
   const {loading}=useSelector((state:RootState)=>state.login)
   const dispatch = useDispatch<AppDispatch>()
   
   async function handleLogin(v:LoginData) {
    
     try{
         const data = await dispatch(fetchLogin(v)).unwrap();
     if (data.message == "success") {
       Cookies.set("token", data.token);
       push("/");
     }
     }catch(e){
       formik.errors.password='incorrect email or password'
     }
   }
  
   const formik = useFormik({
     initialValues,
     onSubmit: handleLogin,
     validationSchema,
   });
  
  // handle show and hide password
  const [showPassword,setShowPassword]=useState(false)
  function handleShowPassword(){
   if(showPassword){
     setShowPassword(false)
   }else{
     setShowPassword(true)
   }
  }
   return (
     <>
       <Container maxWidth="sm">  
         <Typography sx={{ marginBottom: "20px" }} variant="h4">
           Login Form
         </Typography>
         <form onSubmit={formik.handleSubmit}>
           <Grid justifyContent="center" container spacing={1}>
             <Grid size={12}>
               <TextField
                 onChange={formik.handleChange}
                 value={formik.values.email}
                 fullWidth
                 variant="filled"
                 label="Email"
                 id="email"
               />
             </Grid>
 
             {formik.errors.email && formik.touched.email && (
               <Grid size={12}>
                 <Alert sx={{ mb: 1 }} severity="error">
                   {formik.errors.email}
                 </Alert>
               </Grid>
             )}
             <Grid className='password-box' size={12}>
               <TextField
                 onChange={formik.handleChange}
                 value={formik.values.password}
                 type={showPassword?'text':'password'}
                 fullWidth
                 variant="filled"
                 label="Password"
                 id="password"
                 className="password"
               >
               </TextField>
               {showPassword?<span onClick={handleShowPassword} className="eye"><i className="fa-solid fa-eye"></i></span>:
               <span onClick={handleShowPassword} className="eye-slash"><i className="fa-solid fa-eye-slash"></i></span>}
               
             </Grid>
             {formik.errors.password && formik.touched.password && (
               <Grid size={12}>
                 <Alert sx={{ mb: 1 }} severity="error">
                   {formik.errors.password}
                 </Alert>
               </Grid>
             )}
             
 
             <Grid size={{ md: 4, xs: 12 }}>
               <Button sx={{marginTop:'12px'}} fullWidth variant="contained" type="submit">
               {loading? <i  style={{margin:'10px'}}   className="fa-solid fa-spin fa-xl  fa-spinner"></i>:'Submit'}
               </Button>
             </Grid>
           </Grid>
         </form>
 
       
       </Container>
       
     </>
   );
 }
 