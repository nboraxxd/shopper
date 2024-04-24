import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import keyBy from 'lodash/keyBy'

import { PATH } from '@/constants/path'
import { CATEGORIES_IMAGE } from '@/data/categories.data'
import { useCategories } from '@/lib/react-query'
import { cn } from '@/utils'

export default function Categories() {
  const categoriesImage = keyBy(CATEGORIES_IMAGE, '_id')

  const { data: categoriesResponse } = useCategories()

  return (
    <div className="mt-5 max-lg:flex max-lg:gap-2.5 max-lg:overflow-x-auto">
      <Category to={PATH.PRODUCTS} imgSrc="/assets/images/categories/all.png" title="Tất cả sản phẩm" />
      {categoriesResponse.data.data.map((category) => {
        const categoryImage = categoriesImage[category._id]

        return <Category key={category.id} to={category.slug} imgSrc={categoryImage.image} title={category.title} />
      })}
    </div>
  )
}

interface CategoryProps extends ComponentPropsWithoutRef<typeof Link> {
  imgSrc: string
  title: string
  linkClassName?: string
  imageClassName?: string
  titleClassName?: string
}

function Category({ imgSrc, title, linkClassName, imageClassName, titleClassName, ...rest }: CategoryProps) {
  return (
    <Link
      className={cn(
        'shrink-0 gap-2 transition-opacity flex-center hover:opacity-80 max-lg:w-24 max-lg:flex-col lg:h-14',
        linkClassName
      )}
      title={title}
      {...rest}
    >
      <div className="max-lg:overflow-hidden max-lg:rounded-[35%] max-lg:border max-lg:border-secondary-3/30">
        <img src={imgSrc} alt={title} className={cn('size-12 object-contain lg:size-9', imageClassName)} />
      </div>
      <h3
        className={cn(
          'text-secondary1_light1 medium-12 lg:medium-15 capitalize max-lg:text-balance max-lg:text-center',
          titleClassName
        )}
      >
        {title}
      </h3>
    </Link>
  )
}
