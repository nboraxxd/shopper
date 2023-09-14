import { PATH } from '@/config'
import { UserLayout } from '@/layouts/UserLayout'
import { Address } from '@/pages/Address'
import { Order } from '@/pages/Order'
import { Payment } from '@/pages/Payment'
import { Profile } from '@/pages/Profile'
import { WishList } from '@/pages/WishList'

export const user = {
  path: PATH.user.index,
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <Profile />,
    },

    {
      path: PATH.user.address,
      element: <Address />,
    },

    {
      path: PATH.user.order,
      element: <Order />,
    },

    {
      path: PATH.user.payment,
      element: <Payment />,
    },

    {
      path: PATH.user.wishList,
      element: <WishList />,
    },
  ],
}
