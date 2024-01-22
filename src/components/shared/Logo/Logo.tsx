import { ElementType } from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { cn } from '@/utils'

interface Props {
  to?: string
  wrapperClassName?: string
  imageClassName?: string
  BrandTag?: ElementType
  brandClassName?: string
}

export default function Logo(props: Props) {
  const { to = PATH.HOMEPAGE, wrapperClassName, imageClassName, BrandTag = 'h1', brandClassName } = props

  return (
    <Link to={to} className={cn('flex-center focus-primary gap-2.5 lg:gap-3.5', wrapperClassName)}>
      <img src="/assets/icons/logo.svg" alt="Shopper" className={cn('h-6 w-6 lg:h-8 lg:w-8', imageClassName)} />
      <BrandTag className={cn('lg:bold-22 text-secondary1_light1 bold-18', brandClassName)}>Shopper</BrandTag>
    </Link>
  )
}
