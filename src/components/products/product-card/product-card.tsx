import { Link, generatePath } from 'react-router-dom'

import { extractCategorySlug, formatCurrency } from '@/utils'
import { StarIcon } from '@/components/icons'
import { PATH } from '@/constants/path'

interface Props {
  slug: string
  primaryImage: string
  secondaryImage: string
  name: string
  category: {
    id: number
    title: string
    slug: string
  }
  price: number
  rating_average: number
}

export default function ProductCard(props: Props) {
  const { slug, primaryImage, secondaryImage, name, category, price, rating_average } = props

  const productDetailPath = generatePath(PATH.productDetail, { slug })
  const categoryPath = generatePath(PATH.CATEGORY, { slug: extractCategorySlug(category.slug), id: category.id })

  return (
    <div className="background-light1_dark1 overflow-hidden rounded-lg">
      <div className="group relative pt-[100%]">
        <Link to={productDetailPath} className="focus-primary absolute left-0 top-0 !bg-light-1">
          <img
            src={secondaryImage}
            alt={name}
            className="inline-block size-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <img
            src={primaryImage}
            alt={name}
            className="ml-[-100%] inline-block size-full object-contain transition-opacity duration-200 group-hover:opacity-0"
          />
        </Link>
      </div>
      <div className="space-y-4 p-4">
        <h2 className="medium-16 text-secondary1_light1">
          <Link to={productDetailPath} className="focus-primary line-clamp-2">
            {name}
          </Link>
        </h2>
        <h3 className="regular-15 text-secondary-2">
          <Link to={categoryPath} className="focus-primary line-clamp-1">
            {category.title}
          </Link>
        </h3>
        <div className="flex-center">
          <div className="text-secondary1_light1 medium-16 mr-1.5 line-clamp-1">
            {formatCurrency(price)}
            <sup>₫</sup>
          </div>
          {rating_average > 0 && (
            <>
              <StarIcon className="ml-auto size-6" />
              <span className="ml-1.5">{rating_average}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
