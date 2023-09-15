export function getIdFromSlug(slug) {
  const arr = slug.split('-p')

  return arr[arr.length - 1]
}
