import { FilterIcon } from '@/components/icons'
import { PriceFilter } from '@/components/products/price-filter'
import { RatingFilter } from '@/components/products/rating-filter'
import { PrimaryButton } from '@/components/shared/button'
import { BottomDrawer } from '@/components/shared/drawer'

export default function Filter() {
  return (
    <BottomDrawer
      trigger={
        <PrimaryButton className="h-9 justify-center gap-1.5 rounded-md px-3 flex-center lg:hidden">
          <FilterIcon className="inline-block size-5" />
          <span className="medium-16 text-secondary1_secondary3">Lọc</span>
        </PrimaryButton>
      }
      title={
        <div className="mb-5 justify-between flex-center">
          <p className="bold-18 text-secondary1_light1">Bộ lọc chi tiết</p>
          <PrimaryButton className="medium-14 text-primary-red transition-opacity hover:opacity-80">
            Xóa tất cả
          </PrimaryButton>
        </div>
      }
    >
      <PriceFilter />
      <RatingFilter />
    </BottomDrawer>
  )
}
