import { PATH } from '@/constants/path'
import { ProductFilter, Theme } from '@/constants/enums'
import { capitalizeFirstLetter } from '@/utils'

export const NAVBAR = [
  {
    route: PATH.PRODUCTS,
    label: 'Sản phẩm',
    isDropdown: true,
  },
  {
    route: '/laptop-thiet-bi-it/1846',
    label: 'Laptop',
    isDropdown: false,
  },
  {
    route: '/dien-thoai-may-tinh-bang/1789',
    label: 'Điện thoại',
    isDropdown: false,
  },
]

export const COLLECTIONS = [
  {
    _id: 'mega-menu-1',
    title: 'Sản phẩm mới nhất',
    sortValue: ProductFilter.NEWEST,
    img: '/assets/images/mega-menu-1.webp',
  },
  {
    _id: 'mega-menu-2',
    title: 'Giảm giá nhiều nhất',
    sortValue: ProductFilter.DISCOUNT_DESC,
    img: '/assets/images/mega-menu-2.webp',
  },
]

export const THEMES = [
  { value: Theme.LIGHT, label: capitalizeFirstLetter(Theme.LIGHT), icon: '/assets/icons/sun.svg' },
  { value: Theme.DARK, label: capitalizeFirstLetter(Theme.DARK), icon: '/assets/icons/moon.svg' },
  { value: Theme.SYSTEM, label: capitalizeFirstLetter(Theme.SYSTEM), icon: '/assets/icons/computer.svg' },
] as const

export const HERO_SLIDES = [
  {
    to: PATH.HOMEPAGE,
    img: '/assets/images/cover-4.jfif',
    alt: 'Cover 4',
  },
  {
    to: PATH.HOMEPAGE,
    img: '/assets/images/cover-5.jfif',
    alt: 'Cover 5',
  },
  {
    to: PATH.HOMEPAGE,
    img: '/assets/images/cover-6.jfif',
    alt: 'Cover 6',
  },
  {
    to: PATH.HOMEPAGE,
    img: '/assets/images/cover-7.jfif',
    alt: 'Cover 7',
  },
  {
    to: PATH.HOMEPAGE,
    img: '/assets/images/cover-8.jfif',
    alt: 'Cover 8',
  },
]
