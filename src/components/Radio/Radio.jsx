import { createContext, useContext, useState } from 'react'

// 1. Create a context
const RadioContext = createContext({})

// 2. Create parent component
export default function Radio({ children, defaultValue, handleChangeRadio, toggle }) {
  const [value, setValue] = useState(defaultValue)

  function onChange(_value) {
    if (toggle && _value === value) {
      setValue()
      handleChangeRadio?.()

      return
    }

    setValue(_value)
    handleChangeRadio?.(_value)
  }

  return <RadioContext.Provider value={{ value, onChange }}>{children}</RadioContext.Provider>
}

// 3. Create child components to help implementing the common task
function Content({ children, ...props }) {
  const { value, onChange } = useContext(RadioContext)
  return (
    <div className="custom-control custom-radio mb-3" onClick={() => onChange(props.value)}>
      <input checked={value === props.value} className="custom-control-input" type="radio" />
      <label className="custom-control-label flex items-center" htmlFor="seasonOne">
        {children}
      </label>
    </div>
  )
}

// 4. Add child components as properties to parent component
Radio.Content = Content