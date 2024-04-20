import { Link, To } from 'react-router-dom'

import { cn } from '@/utils'

interface Props {
  to: To
  imgSrc: string
  imgAlt: string
  count: number
  className?: string
}

export default function ShoppingList({ to, imgSrc, imgAlt, count, className }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        'focus-primary gap-2.5 rounded-md p-2.5 flex-center hover:bg-light-2/60 dark:hover:bg-dark-3/5 lg:rounded-lg lg:px-5 lg:py-3.5',
        className
      )}
    >
      <img src={imgSrc} alt={imgAlt} className="icon-filter size-6" />
      <span className="medium-15 text-secondary1_light1">{count.toString().padStart(2, '0')}</span>
    </Link>
  )
}
