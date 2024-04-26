import { Categories } from '@/components/products/categories'
import { PriceFilter } from '@/components/products/price-filter'
import { RatingFilter } from '@/components/products/rating-filter'

export default function ProductSidebar() {
  return (
    <div className="scrollbar-hide max-lg:mt-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:h-[calc(100vh-var(--header-height)-2rem)] lg:overflow-y-scroll lg:pb-14">
      <div className="lg:background-light3_dark1 p-3 lg:rounded-[10px] lg:py-5">
        <p className="medium-18 md:bold-24 text-secondary1_light1">Categories</p>
        <Categories />
      </div>

      <div className="lg:background-light3_dark1 hidden lg:mt-5 lg:flex lg:flex-col lg:rounded-[10px] lg:px-3 lg:py-5">
        <div>
          <p className="bold-24 text-secondary1_light1">Price</p>
          <PriceFilter />
        </div>

        <div className="before:background-light3_dark1 after:background-light3_dark1 relative my-5 h-px w-full bg-secondary-3/50 before:absolute before:left-0 before:top-0 before:z-10 before:h-px before:w-3 before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-px after:w-3 after:content-['']" />

        <div>
          <p className="bold-24 text-secondary1_light1">Rating</p>
          <RatingFilter />
        </div>
      </div>
    </div>
  )
}
