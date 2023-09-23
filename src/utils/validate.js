const DEFAULT_ERROR_MESSAGE = {
  required: 'Trường này là bắt buộc',
  regexp: 'Vui lòng điền đúng định dạng',
  min: (min) => `Trường này phải có tối thiểu ${min} ký tự`,
  max: (max) => `Trường này chỉ được phép có tối đa ${max} ký tự`,
  confirm: (field) => `Trường này chưa khớp với trường ${field}`,
  different: (field) => `Trường này không được trùng với ${field}`,
}

const REGEXP = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /((84|0[3|5|7|8|9])+([0-9]{8})|(84[3|5|7|8|9])+([0-9]{8}))\b/,
}

/**
 * @param {*} rules
 * @param {*} forms
 * @returns plan error object
 */
export function validate(rules, forms) {
  const errorObject = {}

  for (const key in rules) {
    for (const rule of rules[key]) {
      if (rule.required) {
        if (
          (typeof forms[key] === 'boolean' && Boolean(forms[key]) === false) ||
          (typeof forms[key] !== 'boolean' && Boolean(forms[key]?.trim()) === false)
        ) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.required
        }
      }

      if (
        rule.min &&
        Boolean(forms[key]?.trim()) === true &&
        typeof rule.min === 'number' &&
        forms[key]?.length < rule.min
      ) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.min(rule.min)
      }

      if (
        rule.max &&
        Boolean(forms[key]?.trim()) === true &&
        typeof rule.max === 'number' &&
        forms[key]?.length > rule.max
      ) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.max(rule.max)
      }

      let _regexp = rule.regexp
      if (_regexp !== undefined && Boolean(forms[key]?.trim()) === true) {
        if (_regexp in REGEXP) {
          _regexp = REGEXP[_regexp]
        } else if (_regexp instanceof RegExp === false) {
          _regexp = new RegExp()
        }

        if (_regexp.test(forms[key]) === false) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.regexp
        }
      }

      if (rule.confirm && Boolean(forms[key]?.trim()) === true) {
        if (forms[key] !== forms[rule.confirm]) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.confirm(forms[rule.confirm])
        }
      }

      if (rule.different && Boolean(forms[key]?.trim()) === true) {
        if (forms[key] === forms[rule.different]) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.confirm(forms[rule.different])
        }
      }
    }
  }

  return errorObject
}

export function required(message) {
  return {
    required: true,
    message,
  }
}

export function regexp(pattern, message) {
  return {
    regexp: pattern,
    message,
  }
}

export function min(min, message) {
  return {
    min,
    message,
  }
}

export function max(max, message) {
  return {
    max,
    message,
  }
}

export function confirm(field, message) {
  return {
    confirm: field,
    message,
  }
}

export function different(field, message) {
  return {
    different: field,
    message,
  }
}
