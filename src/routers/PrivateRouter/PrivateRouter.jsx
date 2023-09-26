import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/config'
import { useSelector } from 'react-redux'
import { authSelector } from '@/stores/selector'

export default function PrivateRouter({ redirect = PATH.account }) {
  const { profile } = useSelector(authSelector)
  console.log('🔥 ~ PrivateRouter ~ profile:', profile)

  return Boolean(profile) === true ? <Outlet /> : <Navigate to={redirect} />
}
