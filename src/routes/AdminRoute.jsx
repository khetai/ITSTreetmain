import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext } from 'react'
import { MainContext } from '../contexts/mainContextProvider'

function AdminRoute() {
  const { role } = useContext(MainContext)
  //   let auth = {token : role === 'admin' }
  let auth = { token: true }
  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute
