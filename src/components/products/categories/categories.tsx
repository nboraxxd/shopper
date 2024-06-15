import keyBy from 'lodash/keyBy'
import { ComponentPropsWithoutRef } from 'react'
import { Link, generatePath, useParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { CATEGORIES_IMAGE } from '@/data/categories.data'
import { useCategories } from '@/lib/react-query'
import { cn, extractCategorySlug } from '@/utils'

export default function Categories() {
  const { categoryId } = useParams()

  const categoriesImage = keyBy(CATEGORIES_IMAGE, '_id')

  const { data: categoriesResponse } = useCategories()

  return (
    <div className="mt-3 max-lg:flex max-lg:gap-2.5 max-lg:overflow-x-auto">
      <Category
        to={PATH.PRODUCTS}
        imgSrc="/assets/images/categories/all.png"
        title="Tất cả sản phẩm"
        isActive={categoryId === undefined}
      />

      {categoriesResponse.data.data.map((category) => {
        const categoryImage = categoriesImage[category._id]

        const categoryPath = generatePath(PATH.CATEGORY, {
          categorySlug: extractCategorySlug(category.slug),
          categoryId: category.id,
        })
        return (
          <Category
            key={category.id}
            to={categoryPath}
            imgSrc={categoryImage.image}
            title={category.title}
            isActive={Number(categoryId) === category.id}
          />
        )
      })}
    </div>
  )
}

interface CategoryProps extends ComponentPropsWithoutRef<typeof Link> {
  imgSrc: string
  title: string
  isActive?: boolean
  linkClassName?: string
  imageClassName?: string
  titleClassName?: string
}

function Category(props: CategoryProps) {
  const { imgSrc, title, isActive = false, linkClassName, imageClassName, titleClassName, ...rest } = props

  return (
    <Link
      className={cn(
        'focus-primary flex-center shrink-0 gap-2 transition-opacity hover:opacity-80 max-lg:w-24 max-lg:flex-col lg:h-14',
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
          'text-secondary1_light1 text-medium-12 capitalize max-lg:text-balance max-lg:text-center lg:text-medium-15',
          {
            'text-active-category': isActive,
          },
          titleClassName
        )}
      >
        {title}
      </h3>
    </Link>
  )
}
