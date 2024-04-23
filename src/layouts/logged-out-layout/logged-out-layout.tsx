import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'

export default function LoggedOutLayout() {
  const isAuthenticated = false

  return isAuthenticated ? <Navigate to={PATH.HOMEPAGE} replace /> : <Outlet />
}
