import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoutes from './utilities/ProtectedRoutes'
import LinkQr from './components/LinkQr'
import QrDashboard from './components/QrDashboard'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgetPassword/>}/>
        <Route path='/reset-pass/:token' element={<ResetPassword/>}/>
        
        <Route element ={<ProtectedRoutes/>} >
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/linkQr' element={<LinkQr/>}/>
            <Route path='/QRdashboard' element={<QrDashboard/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
