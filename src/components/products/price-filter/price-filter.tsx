import { ButtonWithLoading } from '@/components/shared/button'

export default function PriceFilter() {
  return (
    <form>
      <div className="mt-3 flex gap-3">
        <label>
          <span className="medium-14 text-secondary1_light1">Minimum</span>
          <input
            type="number"
            placeholder="10.000"
            className="input-ring background-light1_dark2 placeholder:text-secondary3_dark3 mt-2.5 h-9 w-full rounded-md border-none px-2 py-0 shadow-sm flex-center"
          />
        </label>

        <label>
          <span className="medium-14 text-secondary1_light1">Maximum</span>
          <input
            type="number"
            placeholder="99.000"
            className="input-ring background-light1_dark2 placeholder:text-secondary3_dark3 mt-2.5 h-9 w-full rounded-md border-none px-2 py-0 shadow-sm flex-center"
          />
        </label>
      </div>

      <p className="regular-12 mb-1 mt-0.5 min-h-[22px] text-left text-primary-red"></p>

      <ButtonWithLoading
        buttonClassName="medium-14 h-9 w-full rounded-md bg-primary-yellow px-5 text-secondary-1 transition-opacity hover:opacity-85"
        loadingClassName="size-4"
      >
        Show Result
      </ButtonWithLoading>
    </form>
  )
}
