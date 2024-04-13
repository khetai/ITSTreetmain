import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  )
}

export default MainLayout
