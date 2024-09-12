import React from 'react'
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
export default function Profile() {
  const auth= getAuth()
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    fullName :auth.currentUser.displayName,
    email :auth.currentUser.email,
  });
  const {fullName,email}=formData
  function onLogout(){
    auth.signOut()
    navigate("/")

  }
  return (
    <>
      <section className="flex justify-center items-center max-w-6xl mx-auto ">
        <h1 className="text-3xl text-center mt-6 font-bold" >
          My Profile
        </h1>
        <div
        className="w-full md:w-[50%] mt-6 px-3 "
        >
          <form>
            {/* Name input */}
            <input 
            type="text" 
            id="fullName" 
            value={fullName}
            disabled
            className="w-full px-4 py-2 text-xl text-gray-70 bh-white border border-gray-300 rounded transition ease-in-out "
            />
            {/*Email Input */}
            <input type="email" id="email" value={email} disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-70 bh-white border border-gray-300 rounded transition ease-in-out "
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center  ">Do you want to change your name?
                <span 
                
                className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer">Edit</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 
              transition ease-in-out duration-200 cursor-pointer">Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
