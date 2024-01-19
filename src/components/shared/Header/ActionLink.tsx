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
        'focus-primary flex-center gap-2.5 px-5 py-3.5 transition-colors hover:bg-light-2 dark:hover:bg-dark-3',
        className
      )}
    >
      <img src={imgSrc} alt={imgAlt} className="h-6 w-6" />
      <span className="medium-15 text-secondary1_light1 ">{count.toString().padStart(2, '0')}</span>
    </Link>
  )
}
