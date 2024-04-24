import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import keyBy from 'lodash/keyBy'

import { PATH } from '@/constants/path'
import { CATEGORIES_IMAGE } from '@/data/categories.data'
import { useCategories } from '@/lib/react-query'
import { cn } from '@/utils'

export default function Categories() {
  const categoriesImage = keyBy(CATEGORIES_IMAGE, '_id')

  const { data: categoriesResponse, isLoading, isError } = useCategories()

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error</p>

  return (
    <div>
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
      className={cn('h-14 gap-2 rounded-[10px] transition-opacity flex-center hover:opacity-80', linkClassName)}
      title={title}
      {...rest}
    >
      <img src={imgSrc} alt={title} className={cn('h-9 object-cover', imageClassName)} />
      <h3 className={cn('text-secondary1_light1 medium-15 capitalize', titleClassName)}>{title}</h3>
    </Link>
  )
}
