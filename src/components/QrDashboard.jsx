import React, { use, useEffect, useState } from 'react'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import axios from 'axios'
import { QRCodeCanvas } from 'qrcode.react'
import { ShowToast } from '../utilities/ShowToast'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function QrDashboard() {

    useDocumentTitle("QR dashboard - UltimateQR","View all your saved QR")

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [qrLinks,setQrLinks] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchQrLinks = async()=>{
        try {
            const utoken = localStorage.getItem('utoken')
            const response = await axios.get(`${backendUrl}userApi/getQrLinks`,
                {
                    headers:{
                    "Content-Type":'application/json',
                    Authorization:`Bearer ${utoken}`
                }
                }
            )
            setQrLinks(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchQrLinks()
    },[])

    const deleteQr =async(qrid)=>{
        const token = localStorage.getItem("utoken")
        try {
            const response = await axios.get(`${backendUrl}userApi/deleteQr/${qrid}`,
                {
                    headers:{
                             "Content-Type":'application/json',
                             Authorization:`Bearer ${token}`
                            }
                }
            )
            
            if (response.data.delet_sts == "0") {
                ShowToast(response.data.msg,"success")
                setQrLinks(qrLinks.filter(qr =>qr._id!==qrid))
            } else {
                 ShowToast(response.data.msg,"error")
            }
        } catch (error) {
            ShowToast(error,"error")
        }
    }

    const editQr =(qr)=>{
        navigate('/linkQr',{state:{qrData:qr}})
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-gray-700 font-semibold">Loading your QR links...</p>
                </div>
            </div>
  );
    }
  return (
    <div>
        <ToastContainer/>
        <div className='max-w-4xl mx-auto mt-10'>

            <h2 className='text-2xl text-center font-bold text-gray-800 mb-6'>My QR Links</h2>

        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200'>
            <thead className='bg-gray-800 text-white'>
                <tr>
                    <th className='py-3 px-6 text-left'>QR Code</th>
                    <th className='py-3 px-6 text-left'>URL</th>
                    <th className='py-3 px-6 text-left'>QR Color</th>
                    <th className='py-3 px-6 text-left'>QR Status</th>
                    <th className='py-3 px-6 text-left' colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody >
                {
                    qrLinks.map((qr,index)=>(
                        <tr key={index} className='border-b hover:bg-gray-100'>
                            <td className='py-3 px-6'>
                                <QRCodeCanvas
                                    value={qr.qrLink}
                                    size={80}
                                    fgColor={qr.qrColor}
                                    includeMargin={true}
                                />
                            </td>
                            <td className='py-3 px-6'>{qr.qrLink}</td>
                            <td className='py-3 px-6'>{qr.qrColor}</td>
                            <td className='py-3 px-6'>{qr.qr_status}</td>
                            <td className='py-3 px-6'>
                                <button 
                                className='bg-blue-800 rounded py-1 px-4 text-white hover:bg-blue-600' 
                                onClick={()=>editQr(qr)}
                                >Edit</button>
                            </td>
                            <td className='py-3 px-6'>
                                <button 
                                className='bg-red-800 rounded py-1 px-4 text-white hover:bg-red-600' 
                                onClick={()=>deleteQr(qr._id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}
