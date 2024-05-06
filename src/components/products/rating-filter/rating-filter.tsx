import { Rating } from '@/components/shared/rating'

interface Props {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}

export default function RatingFilter({ rating, setRating }: Props) {
  return (
    <div>
      <p className="text-secondary1_light1 medium-22">Rating</p>
      <div className="mt-2 flex-center">
        <Rating rating={rating} setRating={setRating} />
        {rating > 0 ? (
          <span className="medium-14 text-secondary1_light1 ml-3 select-none">
            {rating === 5 ? `${rating} stars` : `${rating} stars & up`}
          </span>
        ) : null}
      </div>
    </div>
  )
}
