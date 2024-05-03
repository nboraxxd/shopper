import { useState } from 'react'

import { Rating } from '@/components/shared/rating'

export default function RatingFilter() {
  const [rating, setRating] = useState<number>(0)

  return (
    <div>
      <p className="text-secondary1_light1 medium-22">Rating</p>
      <div className="mt-2 flex-center">
        <Rating rating={rating} setRating={setRating} />
        {<span className="medium-14 text-secondary1_light1 ml-3 select-none">{rating} stars & up</span>}
      </div>
    </div>
  )
}
