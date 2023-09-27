export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
