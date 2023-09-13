import { PATH } from '@/config'
import { MainLayout } from '@/layouts/MainLayout'
import { Page404 } from '@/pages/404'
import { HomePage } from '@/pages/HomePage'
import { SignIn } from '@/pages/SignIn'

export const routers = [
  {
    path: PATH.homePage,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.signIn,
        element: <SignIn />,
      },
      {
        path: PATH.page404,
        element: <Page404 />,
      },
    ],
  },
]
