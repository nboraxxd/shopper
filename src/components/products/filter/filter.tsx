import { useState } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { FilterIcon } from '@/components/icons'
import { PriceFilter } from '@/components/products/price-filter'
import { RatingFilter } from '@/components/products/rating-filter'
import { Floating } from '@/components/shared/floating'
import { BottomDrawer } from '@/components/shared/drawer'
import { ButtonWithLoading, PrimaryButton } from '@/components/shared/button'
import { useForm } from 'react-hook-form'
import { FilterSchemaType, filterSchema } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Filter() {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 })

  const [isOpenFloating, setIsOpenFloating] = useState(false)

  const { handleSubmit } = useForm<FilterSchemaType>({
    resolver: zodResolver(filterSchema),
  })

  function onValid(data: FilterSchemaType) {
    console.log(data)
  }

  return isLargeDevice ? (
    <Floating.Root isOpen={isOpenFloating} setIsOpen={setIsOpenFloating} placement="bottom" mainAxis={22}>
      <Floating.Reference as={PrimaryButton} className="h-9 justify-center gap-1.5 rounded-md px-3 flex-center">
        <FilterIcon className="inline-block size-5" />
        <span className="medium-16 text-secondary1_secondary3">Lọc</span>
      </Floating.Reference>

      <Floating
        arrowImg="/assets/images/dropdown-arrow.png"
        arrowWidth={50}
        arrowClassName="-top-4"
        wrapperClassName="background-light1_dark2 shadow-light20_dark20 rounded-[20px]"
      >
        <div className="p-8">
          <h3 className="text-secondary1_light1 medium-22">Filter</h3>
          <hr className="my-4 h-px w-full shrink-0 border-none bg-light-3/50 dark:bg-light-3/10" />
          <form onSubmit={handleSubmit(onValid)}>
            <PriceFilter />
            <RatingFilter />

            <div className="mt-6 justify-end gap-5 flex-center">
              <PrimaryButton
                type="button"
                className="regular-15 h-10 rounded-md px-1.5 text-secondary-2 transition-opacity hover:text-opacity-85"
              >
                Clear
              </PrimaryButton>
              <ButtonWithLoading
                buttonClassName="medium-15 h-10 rounded-md bg-primary-yellow px-2.5 text-secondary-1 transition-opacity hover:opacity-85"
                loadingClassName="size-4"
              >
                Show Result
              </ButtonWithLoading>
            </div>
          </form>
        </div>
      </Floating>
    </Floating.Root>
  ) : (
    <BottomDrawer
      trigger={
        <PrimaryButton className="h-9 justify-center gap-1.5 rounded-md px-3 flex-center">
          <FilterIcon className="inline-block size-5" />
          <span className="medium-16 text-secondary1_secondary3">Lọc</span>
        </PrimaryButton>
      }
      title={
        <div className="mb-5 justify-between flex-center">
          <h3 className="text-secondary1_light1 medium-22">Filter</h3>
        </div>
      }
    >
      <PriceFilter />
      <RatingFilter />

      <div className="mt-6 justify-end gap-5 flex-center">
        <PrimaryButton
          type="button"
          className="regular-15 h-10 rounded-md px-1.5 text-secondary-2 transition-opacity hover:text-opacity-85"
        >
          Clear
        </PrimaryButton>
        <ButtonWithLoading
          buttonClassName="medium-15 h-10 rounded-md bg-primary-yellow px-2.5 text-secondary-1 transition-opacity hover:opacity-85"
          loadingClassName="size-4"
        >
          Show Result
        </ButtonWithLoading>
      </div>
    </BottomDrawer>
  )
}
