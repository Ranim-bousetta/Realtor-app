import React from 'react'
import spinner from "../assets/svg/spinner.svg"
export default function Spinner() {
  return (
    <div className="flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-50 z-50 ">
        <img 
        className='h-35'
        src={spinner} 
        alt="loadin..." />
    </div>
  )
}
