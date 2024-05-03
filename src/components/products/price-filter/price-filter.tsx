export default function PriceFilter() {
  return (
    <div>
      <label htmlFor="minimum" className="text-secondary1_light1 medium-22">
        Price
      </label>
      <div className="mt-2 flex gap-8">
        <label>
          <span className="medium-14 text-secondary1_light1">Minimum</span>
          <input
            id="minimum"
            type="text"
            inputMode="numeric"
            placeholder="10.000"
            className="input-ring background-light1_dark2 placeholder:text-secondary3_dark3 mt-2.5 h-9 w-full rounded-md border-none px-2 py-0 shadow-sm flex-center lg:w-[121px]"
          />
        </label>

        <label>
          <span className="medium-14 text-secondary1_light1">Maximum</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="99.000"
            className="input-ring background-light1_dark2 placeholder:text-secondary3_dark3 mt-2.5 h-9 w-full rounded-md border-none px-2 py-0 shadow-sm flex-center lg:w-[121px]"
          />
        </label>
      </div>

      <p className="regular-12 mb-1 mt-0.5 min-h-[22px] text-left text-primary-red"></p>
    </div>
  )
}
