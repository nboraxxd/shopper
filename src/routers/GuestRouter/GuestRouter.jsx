import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'
import { useSelector } from 'react-redux'
import { authSelector } from '@/stores/selector'

export default function GuestRouter({ redirect = PATH.homePage }) {
  const { user } = useSelector(authSelector)

  return Boolean(user) === false ? <Outlet /> : <Navigate to={redirect} />
}
