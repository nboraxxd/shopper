import axios from 'axios'
import { useEffect } from 'react'

import { FieldUnion } from '@/types'
import { Product } from '@/types/product.type'
import { useProducts } from '@/page/Products'

const fields = 'name,real_price,price,categories,slug,id,images,rating_average,review_count,discount_rate'
type Fields = FieldUnion<typeof fields>

export default function Products() {
  const { data } = useProducts<Pick<Product, Fields>>({
    fields,
    page: 1,
    limit: 24,
  })

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('https://cfdshop.cfdcircle.vn/api/v1/products')
      console.log(' ~ res:', res?.data?.data)
    })()
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="mt-8">
      {data.data.data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
