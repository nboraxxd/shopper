import queryString from 'query-string'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth-store'

export default function LoggedOutLayout() {
  const { search } = useLocation()
  const { from } = queryString.parse(search)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return isAuthenticated ? <Navigate to={from ? (from as string) : PATH.HOMEPAGE} replace /> : <Outlet />
}
