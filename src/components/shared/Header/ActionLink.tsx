import { Link } from 'react-router-dom'
import { cn } from '@/utils'

interface Props {
  to: string
  imgSrc: string
  imgAlt: string
  count: number
  className?: string
}

export default function ActionLink({ to, imgSrc, imgAlt, count, className }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        'focus-primary flex-center gap-2.5 rounded-md p-2.5 hover:bg-light-2/60 dark:hover:bg-dark-3/5 lg:rounded-lg lg:px-5 lg:py-3.5',
        className
      )}
    >
      <img src={imgSrc} alt={imgAlt} className="icon-filter h-6 w-6" />
      <span className="medium-15 text-secondary1_light1 ">{count.toString().padStart(2, '0')}</span>
    </Link>
  )
}
