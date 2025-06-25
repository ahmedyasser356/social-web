"use client"
import { fetetChangePassord } from "@/libs/changePasswordSlice";
import { AppDispatch, RootState } from "@/libs/store";
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
 import * as Yup from 'yup';
export default function changePassword() {

let dispatch = useDispatch<AppDispatch>()
let {data,loading}=useSelector((state:RootState)=>state.changePassword)
let {push}=useRouter()
  let initialValues:{password:string,newPassword:string}={
    password:'',
    newPassword:''
  }
  async function resetPassword(v:any){
    try{
      const data = await dispatch(fetetChangePassord(v)).unwrap()
       if(data.message == 'success'){
        toast.success('Password reset successfully.Please log in.',{duration:6000})
        formik.handleReset()
        push('/login')
       }
      
    }catch(e:any){
      if(e.message == "Request failed with status code 401"){
          formik.errors.password='incorrect password'
      }
      
      
    }
  
  }
  let validationSchema = Yup.object().shape({
    password: Yup.string().required("password is required"),
    newPassword:Yup.string().required('password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'must conatin captial,symbol,number and at latest 8 character')
  })
  let formik = useFormik({
    initialValues,
   onSubmit:resetPassword,
   validationSchema
  })

   // handle show and hide password
   let [showPassword,setShowPassword]=useState(false)
   let [shownewPassword,setShowNewPassword]=useState(false)
   function handleShowPassword(){
    if(showPassword){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
   }
   function handleShowNewPassword(){
    if(shownewPassword){
      setShowNewPassword(false)
    }else{
      setShowNewPassword(true)
    }
   }
  return (
    <>
      <Container maxWidth={"sm"}>
        <form onSubmit={formik.handleSubmit}>
          <Typography sx={{ marginBottom: "20px" }} variant="h4">
                   Reset Your Password
                  </Typography>
          <Grid container spacing={1}>
            <Grid className='password-box' size={12}>
              <TextField onChange={formik.handleChange}     value={formik.values.password} fullWidth label='Password' id="password" variant="filled" type={showPassword?'text':'password'}/>
            {showPassword?<span onClick={handleShowPassword} className="eye"><i className="fa-solid fa-eye"></i></span>:
              <span onClick={handleShowPassword} className="eye-slash"><i className="fa-solid fa-eye-slash"></i></span>}
            </Grid>
           {formik.errors.password&&formik.touched.password&& <Grid size={12}>
              <Alert severity="error">{formik.errors.password}</Alert>
            </Grid>}
            <Grid className='password-box' size={12}>
              <TextField onChange={formik.handleChange}    value={formik.values.newPassword}  fullWidth label='New Password' id="newPassword" variant="filled"  type={shownewPassword?'text':'password'}/>
             {showPassword?<span onClick={handleShowNewPassword} className="eye"><i className="fa-solid fa-eye"></i></span>:
              <span onClick={handleShowNewPassword} className="eye-slash"><i className="fa-solid fa-eye-slash"></i></span>}
            </Grid>
             {formik.errors.newPassword&&formik.touched.newPassword&& <Grid size={12}>
              <Alert severity="error">{formik.errors.newPassword}</Alert>
            </Grid>}
            <Grid size={12} sx={{marginTop:'15px'}} display={'flex'} justifyContent={'center'}>
              <Button  type="submit" variant="contained">{loading? <i  style={{margin:'10px 30px'}}   className="fa-solid fa-spin fa-xl  fa-spinner"></i>:'Reset Password'}</Button>
            </Grid>
            <Grid size={12}    sx={{marginTop:'15px'}} display={'flex'} justifyContent={'center'}>
              <Link href={'/login'}><Button  variant="text">Back to Login</Button></Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
