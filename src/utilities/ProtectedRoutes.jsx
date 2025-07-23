import react from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../components/Navbar'

const ProtectedRoute =()=>{

    const utoken = localStorage.getItem('utoken')

    if (!utoken) {
        return <Navigate to='/login'/>
    }

    try {
        const decodeToken = jwtDecode(utoken)
        const currentTime = Math.floor(Date.now()/1000)

        if (decodeToken.exp < currentTime) {
            localStorage.removeItem('utoken')
            return <Navigate to='/login'/>
        } else {
            return (
                <>
                <Navbar/>
                <Outlet/>
                </>
            )
        }
    } catch (error) {
        localStorage.removeItem('utoken')
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute