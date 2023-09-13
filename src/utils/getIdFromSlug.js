export function getIdFromSlug(slug) {
  const arr = slug.split('-id')

  return arr[arr.length - 1]
}
