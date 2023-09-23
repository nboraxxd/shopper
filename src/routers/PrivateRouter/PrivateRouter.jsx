import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'

export default function PrivateRouter({ redirect = PATH.account }) {
  const [user] = useState(false)

  return user === true ? <Outlet /> : <Navigate to={redirect} />
}
