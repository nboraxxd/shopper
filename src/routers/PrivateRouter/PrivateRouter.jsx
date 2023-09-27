import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'
import { useSelector } from 'react-redux'
import { authSelector } from '@/stores/selector'

export default function PrivateRouter({ redirect = PATH.account }) {
  const { user } = useSelector(authSelector)

  return Boolean(user) === true ? <Outlet /> : <Navigate to={redirect} />
}
