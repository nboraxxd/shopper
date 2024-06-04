import { RouteObject } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoggedInLayout } from '@/layouts/logged-in-layout'
import { ProfileLayout } from '@/layouts/profile-layout'
import { ProfilePage } from '@/pages/profile-page'

const loggedInRoute: RouteObject = {
  element: <LoggedInLayout />,
  children: [
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
