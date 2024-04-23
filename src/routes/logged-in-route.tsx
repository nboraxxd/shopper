import { RouteObject } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoggedInLayout } from '@/layouts/logged-in-layout'
import { ProfileLayout } from '@/layouts/profile-layout'
import { Profile } from '@/pages/profile'

const loggedInRoute: RouteObject = {
  element: <LoggedInLayout />,
  children: [
    {
      element: <ProfileLayout />,
      children: [
        {
          path: PATH.PROFILE,
          element: <Profile />,
        },
      ],
    },
  ],
}

export default loggedInRoute
