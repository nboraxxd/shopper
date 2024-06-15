import { Control, Controller, FieldErrors, UseFormTrigger } from 'react-hook-form'

import { FilterSchemaType } from '@/lib/schemas/filter.schema'
import { NumberInput } from '@/components/shared/input'

interface Props {
  control: Control<FilterSchemaType>
  errors: FieldErrors<FilterSchemaType>
  trigger: UseFormTrigger<FilterSchemaType>
}

export default function PriceFilter({ control, errors, trigger }: Props) {
  const errorMessage = errors.minPrice?.message || errors.maxPrice?.message

  return (
    <div>
      <label htmlFor="minimum" className="text-secondary1_light1 text-medium-22">
        Price
      </label>
      <div className="mt-2 flex gap-8">
        <label>
          <span className="text-secondary1_light1 text-medium-14">Minimum</span>
          <Controller
            name="minPrice"
            control={control}
            render={({ field }) => (
              <NumberInput
                id="minimum"
                inputMode="numeric"
                placeholder="10.000"
                className="background-light1_dark2 mt-2.5 h-9 w-full rounded-md px-2 shadow-section lg:w-[121px]"
                {...field}
                onChange={(ev) => {
                  field.onChange(ev)
                  trigger('maxPrice')
                }}
              />
            )}
          />
        </label>

        <label>
          <span className="text-secondary1_light1 text-medium-14">Maximum</span>
          <Controller
            name="maxPrice"
            control={control}
            render={({ field }) => (
              <NumberInput
                inputMode="numeric"
                placeholder="99.000"
                className="background-light1_dark2 mt-2.5 h-9 w-full rounded-md px-2 shadow-section lg:w-[121px]"
                {...field}
              />
            )}
          />
        </label>
      </div>

      <p className="my-1 min-h-[22px] text-left text-regular-12 text-primary-red">{errorMessage}</p>
    </div>
  )
}
