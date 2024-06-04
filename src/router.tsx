import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import loggedInRoute from '@/routes/logged-in-route'
import loggedOutRoute from '@/routes/logged-out-route'
import { MainLayout } from '@/layouts/main-layout'
import { ProductsLayout } from '@/layouts/products-layout'
import { ProductLayout } from '@/layouts/product-layout'
import { NotFound } from '@/pages/not-found'
import { Homepage } from '@/pages/homepage'
import { ProductsPage } from '@/pages/products-page'
import { ProductPage } from '@/pages/product-page'
import { ScrollTopProvider } from '@/components/provider'

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
        element: (
          <ScrollTopProvider>
            <ProductsLayout />
          </ScrollTopProvider>
        ),
        children: [
          {
            path: PATH.PRODUCTS,
            element: <ProductsPage />,
          },
          {
            path: PATH.CATEGORY,
            element: <ProductsPage />,
          },
        ],
      },
    ],
  },
  {
    path: PATH.PRODUCT_DETAIL,
    element: <ProductLayout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
    ],
  },
  loggedInRoute,
  loggedOutRoute,
])
