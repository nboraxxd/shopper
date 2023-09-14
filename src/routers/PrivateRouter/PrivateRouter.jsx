import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'

export default function PrivateRouter({ redirect = PATH.signIn }) {
  const [user] = useState(false)
  return user ? <Outlet /> : <Navigate to={redirect} />
}
