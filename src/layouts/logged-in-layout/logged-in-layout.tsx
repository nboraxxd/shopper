import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth-store'

export default function LoggedInLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />
}
