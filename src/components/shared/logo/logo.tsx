import { ElementType } from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { cn } from '@/utils'
import { LogoIcon } from '@/components/icons'

interface Props {
  to?: string
  wrapperClassName?: string
  iconClassName?: string
  BrandTag?: ElementType
  brandClassName?: string
}

export default function Logo(props: Props) {
  const { to = PATH.HOMEPAGE, wrapperClassName, iconClassName, BrandTag = 'h1', brandClassName } = props

  return (
    <Link to={to} className={cn('focus-primary gap-2.5 flex-center lg:gap-3.5', wrapperClassName)}>
      <LogoIcon className={cn('size-6 lg:size-8', iconClassName)} />
      <BrandTag className={cn('lg:bold-22 text-secondary1_light1 bold-18', brandClassName)}>Shopper</BrandTag>
    </Link>
  )
}
