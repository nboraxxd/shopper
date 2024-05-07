import { useParams } from 'react-router-dom'

import { useProduct } from '@/lib/react-query/queries-and-mutations'
import { PATH } from '@/constants/path'
import { extractProductId } from '@/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function Product() {
  const { productSlug } = useParams()

  const productId = extractProductId(productSlug as string)

  const { data: productResponse, isLoading, isSuccess, isError } = useProduct(productId)

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <>
      {isSuccess ? (
        <Breadcrumbs navClassname="mt-5 md:mt-8">
          <Breadcrumbs.Item to={PATH.HOMEPAGE} className="max-md:hidden">
            Home
          </Breadcrumbs.Item>
          <Breadcrumbs.Item to={PATH.PRODUCTS}>Products</Breadcrumbs.Item>
          <Breadcrumbs.Item isLastChild>{productResponse.data.data.name}</Breadcrumbs.Item>
        </Breadcrumbs>
      ) : null}
    </>
  )
}
