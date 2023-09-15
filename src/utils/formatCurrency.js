export function formatCurrency(currency) {
  return Intl.NumberFormat('de-DE').format(currency)
}
