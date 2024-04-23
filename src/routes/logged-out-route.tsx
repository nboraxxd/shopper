import { RouteObject } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoggedOutLayout } from '@/layouts/logged-out-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Register } from '@/pages/register'
import { Login } from '@/pages/login'

const loggedOutRoute: RouteObject = {
  element: <LoggedOutLayout />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: PATH.REGISTER,
          element: <Register />,
        },
        {
          path: PATH.LOGIN,
          element: <Login />,
        },
      ],
    },
  ],
}

export default loggedOutRoute
