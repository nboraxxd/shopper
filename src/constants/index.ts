import { PATH } from '@/constants/path'
import { Theme } from '@/constants/enums'
import { capitalizeFirstLetter } from '@/utils'

export const NAVBAR = [
  {
    route: PATH.PRODUCTS,
    label: 'Sản phẩm',
  },
  {
    route: '/laptop-thiet-bi-it/1846',
    label: 'Laptop',
  },
  {
    route: '/dien-thoai-may-tinh-bang/1789',
    label: 'Điện thoại',
  },
] as const

export const THEMES = [
  { value: Theme.LIGHT, label: capitalizeFirstLetter(Theme.LIGHT), icon: '/assets/icons/sun.svg' },
  { value: Theme.DARK, label: capitalizeFirstLetter(Theme.DARK), icon: '/assets/icons/moon.svg' },
  { value: Theme.SYSTEM, label: capitalizeFirstLetter(Theme.SYSTEM), icon: '/assets/icons/computer.svg' },
] as const
