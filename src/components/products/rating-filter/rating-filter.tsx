import { RatingClickable } from '@/components/shared/rating'

interface Props {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}

export default function RatingFilter({ rating, setRating }: Props) {
  return (
    <div>
      <p className="text-secondary1_light1 text-medium-22">Rating</p>
      <div className="flex-center mt-2">
        <RatingClickable rating={rating} setRating={setRating} />
        {rating > 0 ? (
          <span className="text-secondary1_light1 ml-3 select-none text-medium-14">
            {rating === 5 ? `${rating} stars` : `${rating} stars & up`}
          </span>
        ) : null}
      </div>
    </div>
  )
}
