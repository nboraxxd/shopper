import { SmallStarIcon } from '@/components/icons'

const TOTAL_STARS = 5

export default function Rating({ rating }: { rating: number }) {
  const handleWidth = (order: number) => {
    if (order <= rating) return '100%'

    if (order > rating && order - rating < 1) return `${(rating - Math.floor(rating)) * 100}%`

    return '0%'
  }

  return (
    <div className="flex-center gap-1">
      {Array.from({ length: TOTAL_STARS }).map((_, index) => (
        <div key={index} className="relative">
          <div className="absolute left-0 top-0 overflow-hidden" style={{ width: handleWidth(index + 1) }}>
            <SmallStarIcon className="size-6 fill-primary-yellow" />
          </div>
          <SmallStarIcon className="size-6" />
        </div>
      ))}
    </div>
  )
}
