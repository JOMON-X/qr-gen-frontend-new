import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import axios from 'axios'

export default function ForgetPassword() {

  useDocumentTitle("Forgot Password - UltimateQR","Have you forgot your password?")

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [email,setEmail] = useState('')

  const handleSubmit =async()=>{
    try {
      const response = await axios.post(`${backendUrl}userApi/forgetPass`,{
        email
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

            <h2 className='text-2xl font-bold mb-6 text-center'>Forgot password ??</h2>

            <input type="text" name='uemail' placeholder='Enter your Email' required
            className='w-full p-2 border rounded mb-4' onChange={(e)=>setEmail(e.target.value)} />

            <button className='w-full bg-blue-800 text-white font-bold hover:bg-blue-600 p-2 rounded ' onClick={handleSubmit}>Reset</button>

            <p className='text-center mt-5'>Doesnt have an account?
                <Link to={"/register"} className='text-blue-600 hover:font-bold' >Register</Link>
            </p>
            
        </div>
    </div>
    
  )
}
