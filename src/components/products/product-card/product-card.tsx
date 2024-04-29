import { Link, generatePath } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { PATH } from '@/constants/path'
import { extractCategorySlug, formatCurrency } from '@/utils'
import { StarIcon } from '@/components/icons'

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
    <div className="background-light1_dark1 flex flex-col overflow-hidden rounded-lg">
      <div className="group relative pt-[100%]">
        <Link to={productDetailPath} className="focus-primary absolute left-0 top-0 !bg-light-1">
          <LazyLoadImage
            src={secondaryImage}
            alt={name}
            className="inline-block size-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <LazyLoadImage
            src={primaryImage}
            alt={name}
            className="ml-[-100%] inline-block size-full object-contain transition-opacity duration-200 group-hover:opacity-0"
          />
        </Link>
      </div>
      <div className="flex grow flex-col gap-2 p-3 xs:gap-3 md:gap-4 md:p-4">
        <h2 className="medium-14 md:medium-16 text-secondary1_light1">
          <Link to={productDetailPath} className="focus-primary line-clamp-2">
            {name}
          </Link>
        </h2>
        <h3 className="regular-12 md:regular-15 mt-auto text-secondary-2">
          <Link to={categoryPath} className="focus-primary line-clamp-1">
            {category.title}
          </Link>
        </h3>
        <div className="flex-center">
          <div className="text-secondary1_light1 medium-11 xs:medium-12 md:medium-14 line-clamp-1">
            {formatCurrency(price)}
            <sup>₫</sup>
          </div>
          {rating_average > 0 && (
            <div className="ml-auto gap-1 flex-center">
              <StarIcon className="size-3.5 xs:size-4 md:size-5" />
              <span className="medium-10 xs:medium-12 md:medium-14 text-secondary1_light1">
                {rating_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
