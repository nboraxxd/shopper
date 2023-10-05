import { useId } from 'react'
import { twJoin } from 'tailwind-merge'

export default function Field({ label, type = 'text', error, onChange, renderField, ...props }) {
  const id = useId()

  function _onChange(ev) {
    onChange?.(ev.target.value)
  }

  return (
    <>
      <label className={twJoin(Boolean(label === false) && 'sr-only')} htmlFor={id}>
        {label}
      </label>
      {renderField ? (
        renderField({ ...props, error, label, onChange, id })
      ) : (
        <input
          type={type}
          {...props}
          className={twJoin(
            'form-control form-control-sm',
            error && '!border-red-300 text-red-500 placeholder:text-red-400',
          )}
          id={id}
          onChange={_onChange}
        />
      )}
      <p className="error mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
    </>
  )
}
