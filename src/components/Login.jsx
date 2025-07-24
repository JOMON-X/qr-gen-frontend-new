import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import { ShowToast } from '../utilities/ShowToast'

export default function Login() {

  useDocumentTitle("Login - UltimateQR","Please login to continue")

  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [userDt,setUserDt] = useState({
     uemail:'',
     upass:''
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setUserDt({
      ...userDt,
      [name]:value
    })
  }

  const handelSubmit = async(e)=>{
    e.preventDefault()
    try {
      const loginDt = await axios.post(`${backendUrl}userApi/loginUser`,userDt)
      if (loginDt.data.loginsts === "0") {
        localStorage.setItem("utoken",loginDt.data.token)
        ShowToast(loginDt.data.msg,"success")
        setTimeout(()=>navigate('/dashboard'),2000)
      }else{
        ShowToast(loginDt.data.msg,"error")
      }
     
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='bg-gray-200 flex justify-center items-center h-screen'>

      <ToastContainer/>
        
        <div className='bg-white shadow-md p-6 rounded-lg w-96 '>

            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

            <input type="text" name='uemail' placeholder='Enter your Email' required
            className='w-full p-2 border rounded mb-4' onChange={handleChange}/>

            <input type="password" name='upass' placeholder='Enter your Password' required
            className='w-full p-2 border rounded mb-4' onChange={handleChange}/>

            <button className='w-full bg-green-800 text-white font-bold hover:bg-green-600 p-2 rounded ' onClick={handelSubmit}>Login</button>

            <p className='text-center mt-5'>Doesnt have an account?
                <Link to={"/register"} className='text-blue-600 hover:font-bold' >Register</Link>
            </p>
            <p className='text-center mt-2'>Forgot Password?
                <Link to={"/forgotPassword"} className='text-blue-600 hover:font-bold' >Reset</Link>
            </p>
        </div>
    </div>
  )
}
