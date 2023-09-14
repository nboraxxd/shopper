import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'

export default function GuestRouter({ redirect = PATH.homePage }) {
  const [user] = useState(true)

  return user === false ? <Outlet /> : <Navigate to={redirect} />
}
