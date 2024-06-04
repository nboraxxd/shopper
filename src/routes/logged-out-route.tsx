import { RouteObject } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoggedOutLayout } from '@/layouts/logged-out-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { RegisterPage } from '@/pages/register-page'
import { LoginPage } from '@/pages/login-page'

const loggedOutRoute: RouteObject = {
  element: <LoggedOutLayout />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: PATH.REGISTER,
          element: <RegisterPage />,
        },
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
      ],
    },
  ],
}

export default loggedOutRoute
