"use client"
import { Alert, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from 'formik';
import { RegisterData } from "@/interfaces/register";
 import * as Yup from 'yup';
 
 import axios from 'axios';

import { useRouter } from 'next/navigation';

export default function register() {


let initialValues:RegisterData ={
  name:'',
  email:'',
  password:'',
  rePassword:'',
  dateOfBirth:'',
  gender:''
}
let validationSchema=Yup.object().shape({
  name:Yup.string().matches(/^\w{3,}/,'the name must be at latest 3 words').required('name is required'),
  email:Yup.string().required('email is required').email('invaild email'),
  password:Yup.string().required('password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'must conatin captial,symbol,number and at latest 8 character'),
  rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')]),
  dateOfBirth:Yup.string().required('date is required'),
  gender:Yup.string().required('gender is required')
})

let { push } =useRouter()

async function handleRegister (v:any){
  
 try{
 let {data} = await axios.post('https://linked-posts.routemisr.com/users/signup',v)
 if(data.message=='success'){
  push('/login')}
 }catch(error:any){
if(error.status == 409){
  formik.errors.email='email already exists'
}

 }
 
}

    let formik =  useFormik({
      initialValues,
      onSubmit:handleRegister,
      validationSchema
    })

     // handle show and hide password
     let [showPassword,setShowPassword]=useState(false)
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
          Register Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid justifyContent='center' container spacing={1}>
            <Grid size={12}>
              <TextField onChange={formik.handleChange}  value={formik.values.name} fullWidth variant="filled" label="Name" id="name" />
            </Grid>
            {formik.errors.name&& formik.touched.name&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.name}</Alert>
            </Grid>}
            <Grid size={12}>
              <TextField onChange={formik.handleChange}  value={formik.values.email} fullWidth variant="filled" label="Email" id="email" />
            </Grid>
            {formik.errors.email&&formik.touched.email&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.email}</Alert>
            </Grid>}
            <Grid className='password-box' size={12}>
              <TextField onChange={formik.handleChange}  value={formik.values.password}  type={showPassword?'text':'password'} fullWidth variant="filled" label="Password" id="password" />
               {showPassword?<span onClick={handleShowPassword} className="eye"><i className="fa-solid fa-eye"></i></span>:
              <span onClick={handleShowPassword} className="eye-slash"><i className="fa-solid fa-eye-slash"></i></span>}
            </Grid>
            {formik.errors.password&&formik.touched.password&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.password}</Alert>
            </Grid>}
            <Grid className='password-box' size={12}>
              <TextField onChange={formik.handleChange}  value={formik.values.rePassword}  type={showPassword?'text':'password'} fullWidth variant="filled" label="RePassword" id="rePassword" />
             {showPassword?<span onClick={handleShowPassword} className="eye"><i className="fa-solid fa-eye"></i></span>:
              <span onClick={handleShowPassword} className="eye-slash"><i className="fa-solid fa-eye-slash"></i></span>}
            </Grid>
            {formik.errors.rePassword&&formik.touched.rePassword&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.rePassword}</Alert>
            </Grid>}
             <Grid size={12}>
              <TextField onChange={formik.handleChange}  value={formik.values.dateOfBirth} type="date" fullWidth variant="filled" label="Date of Birth" id="dateOfBirth" />
            </Grid>
            {formik.errors.dateOfBirth&&formik.touched.dateOfBirth&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.dateOfBirth}</Alert>
            </Grid>}
            <Grid size={12}>
              <TextField  onChange={formik.handleChange}  value={formik.values.gender} select  fullWidth variant="filled" label="Gender" id="gender" name="gender" >
                <MenuItem value='male'>male</MenuItem>
                <MenuItem value='female'>female</MenuItem>
              </TextField >
            </Grid>
             {formik.errors.gender&&formik.touched.gender&& <Grid size={12}>
              <Alert sx={{mb:1}} severity="error">{formik.errors.gender}</Alert>
            </Grid>}
            <Grid   size={{md:4,xs:12}}>
              <Button fullWidth variant="contained" type="submit">Submit</Button>
          </Grid>
          </Grid>
          
        </form>
      </Container>
    </>
  );
}
