import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { MainLayout } from '@/layout/MainLayout'
import { ProductsLayout } from '@/layout/ProductsLayout'
import { NotFound } from '@/page/NotFound'
import { Homepage } from '@/page/Homepage'
import { Products } from '@/page/Products'

export const router = createBrowserRouter([
  {
    path: PATH.HOMEPAGE,
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: PATH.PRODUCTS,
        element: <ProductsLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },
        ],
      },
    ],
  },
])
