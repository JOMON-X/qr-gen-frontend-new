import React, { useRef, useState } from 'react'
import { useDocumentTitle } from '../utilities/useDocumentTitle'
import { QRCodeCanvas } from 'qrcode.react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { ShowToast } from '../utilities/ShowToast'

export default function LinkQr() {
    
    useDocumentTitle("QR Generator - UltimateQR","Turn links in to QR")

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [qrLink,setQrLink] = useState("")
    const [qrColor,setQrColor] = useState("#000000")

    const qRef = useRef()
    const downloadQr =()=>{
        const canvas = qRef.current.querySelector("canvas")
        const url = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = url 
        a.download = "QRcode.png"
        a.click()
    }

    const saveQr = async()=>{
        const utoken = localStorage.getItem("utoken")

        try {
            const response = await axios.post(`${backendUrl}userApi/addLinkQr`,{
                qrLink:qrLink,
                qrColor:qrColor
            },
            {
                headers:{
                    "Content-Type":'application/json',
                    Authorization:`Bearer ${utoken}`
                }
            }
        )
        console.log(response.data);
        
        if (response.data.addsts == "0") {
            ShowToast(response.data.msg,"success")
        } else {
            ShowToast(response.data.msg,"error")
        }
        
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>

        <ToastContainer/>

        <h1 className='text-2xl mb-4 font-bold'>Generate QR</h1>
        
        <input type="text" placeholder='Enter your URL' className='mb-4 p-2 border rounded w-80'onChange={(e)=>setQrLink(e.target.value)}/>

        <input type="color" value={qrColor} className='mb-4 p-2 border rounded w-15' onChange={(e)=>setQrColor(e.target.value)} />

        <div ref={qRef} className='bg-white p-2 rounded-lg shadow-lg'>

            <QRCodeCanvas
                value={qrLink}
                size={200}
                fgColor={qrColor}
                includeMargin={true}
            />
        </div>

        <div className='mt-4 flex gap-4'>
            <button 
                className='mt-4 px-4 py-2 w-34 bg-green-800 text-white rounded hover:bg-green-600 transition'
                onClick={saveQr}
            >Save QR</button>
        
            <button 
                className='mt-4 px-4 py-2 w-34 bg-blue-800 text-white rounded hover:bg-blue-600 transition'
                onClick={downloadQr}
            >Download</button>
        </div>
       

        
    </div>
  )
}
