import { Link, generatePath } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { PATH } from '@/constants/path'
import { cn, extractCategorySlug, formatCurrency } from '@/utils'
import { StarIcon } from '@/components/icons'
import { useState } from 'react'

interface Props {
  slug: string
  primaryImage: string
  secondaryImage: string
  name: string
  category?: {
    id: number
    title: string
    slug: string
  }
  real_price: number
  discount_rate: number
  rating_average: number
}

export default function ProductCard(props: Props) {
  const { slug, primaryImage, secondaryImage, name, category, real_price, rating_average, discount_rate } = props

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productDetailPath = generatePath(PATH.PRODUCT_DETAIL, { productSlug: slug })

  const categoryPath =
    category &&
    generatePath(PATH.CATEGORY, { categorySlug: extractCategorySlug(category.slug), categoryId: category.id })

  return (
    <div className="background-light1_dark1 flex flex-col overflow-hidden rounded-lg">
      <div className="group relative pt-[100%]">
        <Link to={productDetailPath} className="focus-primary absolute inset-y-0 left-0 !bg-light-1">
          <LazyLoadImage
            src={secondaryImage}
            alt={name}
            className="inline-block size-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <LazyLoadImage
            src={primaryImage}
            alt={name}
            onLoad={() => setIsImageLoaded(true)}
            className={cn(
              'ml-[-100%] inline-block size-full object-contain transition-all duration-200 group-hover:opacity-0',
              !isImageLoaded ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            )}
          />
          {discount_rate > 0 ? (
            <span className="absolute right-1 top-1 rounded-sm bg-primary-blue/85 px-1 py-0.5 text-regular-12 text-light-1">
              -{Math.ceil(discount_rate)}%
            </span>
          ) : null}
        </Link>
      </div>
      <div className="flex grow flex-col gap-2 p-3 xs:gap-3 md:gap-4 md:p-4">
        <h2 className="text-secondary1_light1 text-medium-14 md:text-medium-16">
          <Link to={productDetailPath} className="focus-primary line-clamp-2">
            {name}
          </Link>
        </h2>
        {categoryPath ? (
          <h3 className="mt-auto text-regular-12 text-secondary-2 md:text-regular-15">
            <Link to={categoryPath} className="focus-primary line-clamp-1">
              {category.title}
            </Link>
          </h3>
        ) : null}
        <div className="flex-center mt-auto">
          <div className="text-secondary1_light1 line-clamp-1 text-medium-11 xs:text-medium-12 md:text-medium-14">
            {formatCurrency(real_price)}
            <sup>₫</sup>
          </div>
          {rating_average > 0 && (
            <div className="flex-center ml-auto gap-1">
              <StarIcon className="size-3.5 xs:size-4 md:size-5" />
              <span className="text-secondary1_light1 mt-px text-medium-10 xs:text-medium-12 md:text-medium-14">
                {rating_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
