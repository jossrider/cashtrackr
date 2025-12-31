export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
  }).format(quantity)
}

export function formatDate(isoString: string) {
  const date = new Date(isoString)
  const formatter = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
  })
  return formatter.format(date)
}
