import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithCustomToken , auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { toast } from 'react-toastify';
export default function SignIn() {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const{email,password}=formData;
  const navigate= useNavigate()
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      if(userCredential.user){
        navigate("/")
      }
    } catch (error) {
      toast.error("Bad user credentials")
    }
  }
  return (
    <section>
      <h1
      className="text-3xl text-center mt-6 font-bold"
      >Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://media.istockphoto.com/id/1466722860/fr/photo/d%C3%A9m%C3%A9nagement-d%C3%A9m%C3%A9nagement-la-cl%C3%A9-a-%C3%A9t%C3%A9-ins%C3%A9r%C3%A9e-dans-la-porte-de-la-nouvelle-maison-%C3%A0.webp?a=1&b=1&s=612x612&w=0&k=20&c=YPaVQ3msz2uhR2qPbYxIMndejuOdw0tClVsHfkxMA2w=" alt="key" 
          className="w-full rounded-2xl"
          />
        </div>
        <div
        className="w-full md:w-[67%] lg:w-[40%] ml-20">
          <form onSubmit={onSubmit}>
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
              <p className="mb-6">Don't have an account?
                <Link to="/sign-up"
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >Register</Link>
              </p>
              <p>
                <Link to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" 
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-950"
          >Sign In</button>
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