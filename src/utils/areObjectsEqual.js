import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'

export function areObjectsEqual(obj1, obj2, ...fields) {
  if (fields.length > 0) {
    return isEqual(pick(obj1, ...fields), pick(obj2, ...fields))
  }

  return isEqual(obj1, obj2)
}
