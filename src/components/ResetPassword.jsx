import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword() {

  useDocumentTitle("Reset Password - UltimateQR","Reset your Password here")

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const {token} =useParams()
  const [password,setPassword] = useState('')

  const handlePassReset =async()=>{
    try {
      const response = await axios.post(`${backendUrl}userApi/reset-pass/${token}`,{
        password
      })
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='bg-gray-200 flex justify-center items-center h-screen'>

      <ToastContainer/>
        
        <div className='bg-white shadow-md p-6 rounded-lg w-96 '>

            <h2 className='text-2xl font-bold mb-6 text-center'>Reset password ??</h2>

            <input type="password" name='uemail' placeholder='Enter new Password' required
            className='w-full p-2 border rounded mb-4' onChange={(e)=>setPassword(e.target.value)}/>

            <button className='w-full bg-blue-800 text-white font-bold hover:bg-blue-600 p-2 rounded ' onClick={handlePassReset}>Reset Now</button>
            
        </div>
    </div>
  )
}
