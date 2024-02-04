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

export function extractCategorySlug(inputString: string) {
  const parts = inputString.split(/-id[^-]*$/)
  return parts[0]
}
