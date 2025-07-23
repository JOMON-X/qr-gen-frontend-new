import React from 'react'
import { useDocumentTitle } from '../utilities/useDocumentTitle'

export default function Dashboard() {

    useDocumentTitle("Dashboard - UltimateQR","Your personalised QR Dashboard")

  return (
    <div className='flex justify-center items-center '>
      <h2>Dashboard</h2>
    </div>
  )
}
