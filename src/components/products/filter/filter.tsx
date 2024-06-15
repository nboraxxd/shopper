import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import queryString from 'query-string'
import isUndefined from 'lodash/isUndefined'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/utils'
import useMediaQuery from '@/hooks/useMediaQuery'
import useQueryParamsFiltered from '@/hooks/useQueryParamsFiltered'
import { FilterSchemaType, filterSchema } from '@/lib/schemas/filter.schema'
import { FilterIcon } from '@/components/icons'
import { PriceFilter } from '@/components/products/price-filter'
import { RatingFilter } from '@/components/products/rating-filter'
import { Floating } from '@/components/shared/floating'
import { BottomDrawer } from '@/components/shared/drawer'
import { ButtonWithLoading, PrimaryButton } from '@/components/shared/button'

export default function Filter() {
  const navigate = useNavigate()

  const queryParamsFiltered = useQueryParamsFiltered()
  const { minPrice, maxPrice, filterRating } = queryParamsFiltered
  const _filterRating = Number(filterRating) > 0 && Number(filterRating) <= 5 ? Number(filterRating) : 0

  const [rating, setRating] = useState<number>(_filterRating)
  const [isOpenFloating, setIsOpenFloating] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const isLargeDevice = useMediaQuery({ minWidth: 1024 })

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FilterSchemaType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
    },
  })

  useEffect(() => {
    if (!minPrice && !maxPrice && !filterRating) {
      setValue('minPrice', '')
      setValue('maxPrice', '')
      setRating(0)
    }
  }, [filterRating, maxPrice, minPrice, setValue])

  function onValid(data: FilterSchemaType) {
    const { minPrice, maxPrice } = data

    if (minPrice === '' && maxPrice === '' && rating === 0) return

    isOpenFloating && setIsOpenFloating(false)
    isOpenDrawer && setIsOpenDrawer(false)
    navigate({
      search: queryString.stringify(
        omitBy(
          {
            ...queryParamsFiltered,
            minPrice: minPrice !== '' ? minPrice : undefined,
            maxPrice: maxPrice !== '' ? maxPrice : undefined,
            filterRating: rating > 0 ? rating : undefined,
            page: '1',
          },
          isUndefined
        )
      ),
    })
  }

  function onClear() {
    if (!minPrice && !maxPrice && !filterRating) return

    const page = minPrice || maxPrice || filterRating ? '1' : queryParamsFiltered.page

    isOpenFloating && setIsOpenFloating(false)
    isOpenDrawer && setIsOpenDrawer(false)

    navigate({
      search: queryString.stringify(omit({ ...queryParamsFiltered, page }, ['minPrice', 'maxPrice', 'filterRating'])),
    })
  }

  return isLargeDevice ? (
    <Floating.Root isOpen={isOpenFloating} setIsOpen={setIsOpenFloating} placement="bottom" mainAxis={22}>
      <Floating.Reference
        as={PrimaryButton}
        className={cn(
          'text-secondary1_secondary3 flex-center h-9 justify-center gap-1.5 rounded-md px-3',
          minPrice || maxPrice || filterRating ? 'text-active-category' : 'text-secondary1_secondary3'
        )}
      >
        <FilterIcon className="relative inline-block size-5" />
        <span className="text-medium-16">Filter</span>
      </Floating.Reference>

      <Floating
        arrowImg="/assets/images/dropdown-arrow.png"
        arrowWidth={50}
        arrowClassName="-top-4"
        wrapperClassName="background-light1_dark2 rounded-3xl shadow-popover"
      >
        <div className="p-8">
          <h3 className="text-secondary1_light1 text-medium-22">Filter</h3>
          <hr className="my-4 h-px w-full shrink-0 border-none bg-light-3/50 dark:bg-light-3/10" />
          <form onSubmit={handleSubmit(onValid)}>
            <PriceFilter control={control} errors={errors} trigger={trigger} />
            <RatingFilter rating={rating} setRating={setRating} />

            <div className="flex-center mt-6 justify-end gap-5">
              <PrimaryButton
                type="button"
                className="h-10 rounded-md px-1.5 text-regular-15 text-secondary-2 transition-opacity hover:text-opacity-85"
                onClick={onClear}
              >
                Clear
              </PrimaryButton>
              <ButtonWithLoading
                buttonClassName="h-10 rounded-md bg-primary-yellow px-2.5 text-medium-15 text-secondary-1 transition-opacity hover:opacity-85"
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
      isOpenDrawer={isOpenDrawer}
      setIsOpenDrawer={setIsOpenDrawer}
      trigger={
        <PrimaryButton className="flex-center h-9 justify-center gap-1.5 rounded-md px-3">
          <FilterIcon className="inline-block size-5" />
          <span className="text-secondary1_secondary3 text-medium-16">Lọc</span>
        </PrimaryButton>
      }
      title={
        <div className="flex-center mb-5 justify-between">
          <h3 className="text-secondary1_light1 text-medium-22">Filter</h3>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onValid)}>
        <PriceFilter control={control} errors={errors} trigger={trigger} />
        <RatingFilter rating={rating} setRating={setRating} />
        <div className="flex-center mt-6 justify-end gap-5">
          <PrimaryButton
            type="button"
            className="h-10 rounded-md px-1.5 text-regular-15 text-secondary-2 transition-opacity hover:text-opacity-85"
            onClick={onClear}
          >
            Clear
          </PrimaryButton>
          <ButtonWithLoading
            buttonClassName="h-10 rounded-md bg-primary-yellow px-2.5 text-medium-15 text-secondary-1 transition-opacity hover:opacity-85"
            loadingClassName="size-4"
            type="submit"
          >
            Show Result
          </ButtonWithLoading>
        </div>
      </form>
    </BottomDrawer>
  )
}
