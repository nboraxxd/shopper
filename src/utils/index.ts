import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function extractCategorySlug(categorySlugInput: string) {
  const parts = categorySlugInput.split(/-id[^-]*$/)
  return parts[0]
}

export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSecs).padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}
