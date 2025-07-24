import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import axios from 'axios'

export default function Navbar() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isOpen,setIsOpen] = useState(false)

    const navigate = useNavigate()
    const handleLogout =async()=>{
        const token = localStorage.getItem('utoken')
        try {
            const response = await axios.get(`${backendUrl}userApi/logoutUser`,
                {
                headers:{
                    "Content-Type":'application/json',
                    Authorization:`Bearer ${token}`
                }
            })
            localStorage.removeItem('utoken')
            navigate('/login')
            
        } catch (error) {
            console.log(error);  
        }
        
    }

  return (
    <nav className='bg-gray-800 p-4 shadow-md '>
        <div className='container mx-auto flex justify-between items-center'>
            {/* logo */}
            <Link to={"/dashboard"} className='text-white text-xl font-bold'>QR Generator</Link>

            {/* desktopmenu */}
            <ul className='hidden md:flex space-x-6 text-white'>
                <li>
                    <Link to={"/dashboard"} className='hover:text-gray-300'>Dashboard</Link>
                </li>
                <li>
                    <Link to={"/linkQr"} className='hover:text-gray-300'>Add QR</Link>
                </li>
                <li>
                    <Link to={"/QRdashboard"} className='hover:text-gray-300'>QR Dashboard</Link>
                </li>
                <li>
                    <button className='hover:text-red-500 transition' onClick={handleLogout}>Logout</button>
                </li>
            </ul>
            {/* mobilemenu  */}
            <button className='text-white text-2xl md:hidden'
            onClick={()=>setIsOpen(!isOpen)}
            >
                {isOpen?<FaTimes/>:<FaBars/>}
            </button>
        </div>
        {isOpen &&(
            <ul className='md:hidden bg-gray-800 text-white p-4 space-y-4 absolute left-0 w-full shadow-md '>
                <li>
                    <Link to={"/dashboard"} className='block py-2'onClick={()=>setIsOpen(false)}>Dashboard</Link>
                </li>
                <li>
                    <Link to={"/linkQr"} className='block py-2'onClick={()=>setIsOpen(false)}>Add QR</Link>
                </li>
                <li>
                    <Link to={"/QRdashboard"} className='block py-2'onClick={()=>setIsOpen(false)}>QR Links</Link>
                </li>
                <li>
                    <button className='hover:text-red-500 transition' onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        )}
    </nav>
  )
}
