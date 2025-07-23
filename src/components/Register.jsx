import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import { ToastContainer } from 'react-toastify'
import { ShowToast } from '../utilities/ShowToast'

export default function Register() {
    useDocumentTitle("Register - UltimateQR","Please register to get an account")

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [userDt,setUserDt] = useState({
        uname:'',
        uemail:'',
        upass:''
    })

    const handleInputChange =(e)=>{
        const { name , value } = e.target
        setUserDt({
            ...userDt,
            [name]:value
        })
    }

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${backendUrl}userApi/regUser`,userDt)
            console.log(response)
            if (response.data.regsts === "0") {
                ShowToast(response.data.msg,"success")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className='bg-gray-200 flex justify-center items-center h-screen'>

        <ToastContainer/>
        
        <div className='bg-white shadow-md p-6 rounded-lg w-96 '>

            <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

            <input type="text" name='uname' placeholder='Enter your User name' required
            className='w-full p-2 border rounded mb-4' onChange={handleInputChange}/>

            <input type="text" name='uemail' placeholder='Enter your Email' required
            className='w-full p-2 border rounded mb-4' onChange={handleInputChange}/>

            <input type="password" name='upass' placeholder='Enter your Password' required
            className='w-full p-2 border rounded mb-4' onChange={handleInputChange}/>

            <button className='w-full bg-blue-800 text-white font-bold hover:bg-blue-600 p-2 rounded ' onClick={handleSubmit}>
                Register</button>

            <p className='text-center mt-5'>Already have an account?
                <Link to={"/login"} className='text-blue-600 hover:font-bold' >Login</Link>
            </p>
        </div>
    </div>
  )
}
