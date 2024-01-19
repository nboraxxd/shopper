import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { cn } from '@/utils'

interface Props {
  to?: string
  imageClassName?: string
  textClassName?: string
}

export default function Logo({ to = PATH.HOMEPAGE, imageClassName, textClassName }: Props) {
  return (
    <Link to={to} className="flex-center focus-primary gap-3.5">
      <img src="/assets/icons/logo.svg" alt="Shopper" className={cn('h-8 w-8', imageClassName)} />
      <h1 className={cn('bold-22 text-secondary1_light1', textClassName)}>Shopper</h1>
    </Link>
  )
}
