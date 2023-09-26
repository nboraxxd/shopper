import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'
import { useSelector } from 'react-redux'
import { authSelector } from '@/stores/selector'

export default function GuestRouter({ redirect = PATH.homePage }) {
  const { profile } = useSelector(authSelector)
  console.log(profile)

  return Boolean(profile) === false ? <Outlet /> : <Navigate to={redirect} />
}
