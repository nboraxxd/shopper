import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { MainLayout } from '@/layouts/main-layout'
import { ProductsLayout } from '@/layouts/products-layout'
import { NotFound } from '@/pages/not-found'
import { Home } from '@/pages/home'
import { Products } from '@/pages/products'

export const router = createBrowserRouter([
  {
    path: PATH.HOMEPAGE,
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
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
