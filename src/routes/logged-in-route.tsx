import { RouteObject } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoggedInLayout } from '@/layouts/logged-in-layout'
import { ProfileLayout } from '@/layouts/profile-layout'
import { MainLayout } from '@/layouts/main-layout'
import { ProfilePage } from '@/pages/profile-page'
import { CartPage } from '@/pages/cart-page'

const loggedInRoute: RouteObject = {
  element: <LoggedInLayout />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: PATH.CART,
          element: <CartPage />,
        },
      ],
    },
    {
      element: <ProfileLayout />,
      children: [
        {
          path: PATH.PROFILE,
          element: <ProfilePage />,
        },
      ],
    },
  ],
}

export default loggedInRoute
