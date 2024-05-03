import { StarBlankIcon } from '@/components/icons'

const MAX_STAR_COUNT = 5

interface Props {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}

export default function Rating({ rating, setRating }: Props) {
  return Array.from(Array(MAX_STAR_COUNT)).map((_, index) => {
    const currentStar = index + 1

    return (
      <span
        className="inline-block cursor-pointer p-0.5 transition-transform active:scale-90"
        onClick={() => setRating(currentStar)}
      >
        <StarBlankIcon key={index} className="size-6" fill={currentStar <= rating ? '#FFB700' : 'none'} />
      </span>
    )
  })
}
