import { validate } from '@/utils'
import { useEffect, useState } from 'react'

/**
 *
 * @param {*} rules
 * @returns values, errors, register
 */
export default function useForm(rules, { initialValue = {}, dependencies = {} } = {}) {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setValues(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialValue)])

  function register(name) {
    return {
      error: errors[name],
      value: values[name] || '',
      onChange: (value) => {
        let _values = { ...values, [name]: value }

        const _errorObj = {}

        if (rules[name]) {
          _errorObj[name] = validate({ [name]: rules[name] }, _values)[name]
        }
        if (dependencies[name]) {
          for (const dependency of dependencies[name]) {
            _errorObj[dependency] = validate({ [dependency]: rules[dependency] }, _values)[dependency]
          }
        }

        setErrors((prev) => ({ ...prev, ..._errorObj }))

        setValues((prev) => ({ ...prev, [name]: value }))
      },
    }
  }

  function isValid() {
    const errorObject = validate(rules, values)
    setErrors(errorObject)

    return Object.keys(errorObject).length === 0
  }

  function resetValues() {
    setValues({})
  }

  return {
    values,
    setValues,
    errors,
    register,
    isValid,
    resetValues,
  }
}
