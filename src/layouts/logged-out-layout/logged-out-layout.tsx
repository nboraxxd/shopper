import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth-store'

export default function LoggedOutLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Navigate to={PATH.HOMEPAGE} replace /> : <Outlet />
}
