import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {db} from "../firebase";
import { doc, serverTimestamp,setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
export default function SignUp() {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
  })
  const{fullName,email,password}=formData;
  const navigate= useNavigate()
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault();

    try {
      const auth = getAuth()
      const userCredential = await 
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser,{
        displayName:fullName,
      })
      const user=userCredential.user
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp= serverTimestamp();

      await setDoc(doc(db,"users",user.uid),formDataCopy)
      toast.success("Sign Up was successful!")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with the Registration")
      
    }
  }
  return (
    <section>
      <h1
      className="text-3xl text-center mt-6 font-bold"
      >Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://plus.unsplash.com/premium_photo-1661427097113-2e42e8b0070e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D" alt="signUp" 
          className="w-full rounded-2xl"
          />
        </div>
        <div
        className="w-full md:w-[67%] lg:w-[40%] ml-20">
          <form onSubmit={onSubmit}>
          <input 
            type="text" 
            id="fullName" 
            value={fullName} 
            onChange={onChange} 
            placeholder='Full Name' 
            className=" mb-6 w-full px-4 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />

            <input 
            type="Email" 
            id="email" 
            value={email} 
            onChange={onChange} 
            placeholder='Email' 
            className=" mb-6 w-full px-4 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
            <div className="relative mb-6">
            <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            value={password} 
            onChange={onChange} 
            placeholder="Password" 
            className="w-full px-4 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
            {showPassword ? (
                <AiFillEyeInvisible 
                className="absolute right-3 top-3 text-xl cursor-pointer"   
                onClick={()=>setShowPassword((prevState)=>!prevState)}
                />
              ):(
                <AiFillEye 
                  className="absolute right-3 top-3 text-xl cursor-pointer" 
                  onClick={()=>setShowPassword((prevState)=>!prevState)}
                  />)}
            </div>
            <div className="flex justify-between whitespace-nowrap
            text-sm sm:text-lg ">
              <p className="mb-6">Have an account?
                <Link to="/sign-in"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >Sign In</Link>
              </p>
              <p>
                <Link to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" 
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-950"
          >Sign Up</button>
          <div
          className="flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300 
          after:border-t  after:flex-1  after:border-gray-300"
          >
            <p className="text-center font-semibold mx-4" >OR</p>
          </div>
          <OAuth/>
          </form>
        
        </div>
                 
      </div>
    </section>
  )
}