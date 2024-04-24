export default function Price() {
  return (
    <div>
      <p className="bold-24 text-secondary1_light1 mb-3">Price</p>
      <div className="mt-2 gap-4 flex-center">
        <label>
          <span className="medium-14 text-secondary1_light1">Minimum</span>
          <input
            type="number"
            placeholder="10,000"
            className="background-light3_dark1 placeholder:text-secondary2_dark3 no-focus mt-2.5 h-9 w-full rounded-md border border-secondary-3 px-2 py-0 flex-center focus:border-secondary"
          />
        </label>
        <label>
          <span className="medium-14 text-secondary1_light1">Maximum</span>
          <input
            type="number"
            placeholder="99,000"
            className="background-light3_dark1 placeholder:text-secondary2_dark3 no-focus mt-2.5 h-9 w-full rounded-md border border-secondary-3 px-2 py-0 flex-center focus:border-secondary"
          />
        </label>
      </div>
    </div>
  )
}
