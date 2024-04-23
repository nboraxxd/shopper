import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'

export default function LoggedInLayout() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />
}
