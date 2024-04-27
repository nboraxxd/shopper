import { StarBlankIcon, StarIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'

const MAX_STAR_COUNT = 5
const TOTAL_FILTERED_RATING_ROWS = 5

export default function RatingFilter() {
  return (
    <ul className="mt-3">
      {Array.from(Array(TOTAL_FILTERED_RATING_ROWS)).map((_, starsIndex) => {
        // const starsNumber = MAX_STAR_COUNT - starsIndex

        return (
          <li key={starsIndex}>
            <PrimaryButton className="w-full gap-1 py-1 flex-center">
              {Array.from(Array(MAX_STAR_COUNT)).map((_, starIndex) => {
                if (starIndex < MAX_STAR_COUNT - starsIndex) {
                  return <StarIcon key={starIndex} className="size-5" />
                }
                return <StarBlankIcon key={starIndex} className="size-5" />
              })}
              {starsIndex !== 0 && <span className="medium-14 text-secondary1_light1 ml-1">& up</span>}
            </PrimaryButton>
          </li>
        )
      })}
    </ul>
  )
}
