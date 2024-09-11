import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import React from 'react'
import { db } from '../firebase';
import { doc,getDoc,setDoc  } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router';
export default function OAuth() {
  const navigate= useNavigate()
  async function onGoogleClick(){
    try {
      const  auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth,provider)
      const user = result.user
      
      const docRef = doc(db,"users",user.uid)
      const docSnap = await getDoc(docRef)

      if(!docSnap.exists()){
        await setDoc(docRef,{
          fullName: user.displayName,
          email:user.email,
          timeStamp:serverTimestamp,
        })
      }
      navigate("/")
    } catch (error) {
      toast.error("Could not authorize with Google")
    }
  }
  return (
    <button 
    type="button"
    onClick={onGoogleClick}
    className="flex w-full items-center justify-center
    bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded" >
        <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
        Continue with Google 
    </button>
  )
}
