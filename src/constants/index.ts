import { PATH } from '@/constants/path'
import { ProductSort, Theme } from '@/constants/enums'
import { capitalizeFirstLetter } from '@/utils'
import { ComputerIcon, MoonIcon, SunIcon } from '@/components/icons'

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
    sortValue: ProductSort.NEWEST,
    img: '/assets/images/mega-menu-1.webp',
  },
  {
    _id: 'mega-menu-2',
    title: 'Giảm giá nhiều nhất',
    sortValue: ProductSort.DISCOUNT_DESC,
    img: '/assets/images/mega-menu-2.webp',
  },
] as const

export const THEMES = [
  { value: Theme.LIGHT, label: capitalizeFirstLetter(Theme.LIGHT), icon: SunIcon },
  { value: Theme.DARK, label: capitalizeFirstLetter(Theme.DARK), icon: MoonIcon },
  { value: Theme.SYSTEM, label: capitalizeFirstLetter(Theme.SYSTEM), icon: ComputerIcon },
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

export const PRODUCT_PLACEHOLDER_IMAGES = [
  'https://salt.tikicdn.com/assets/img/image.svg',
  'https://salt.tikicdn.com/cache/w300/media/catalog/producthttp://img11.joybuy.com/N0/s900x900_g10/M00/00/09/rBEQWFD-WsUIAAAAAADys29bRvUAAADlQC4eC8AAPLL793.jpg',
]

export const PRODUCT_TABS = [
  { value: 'description', name: 'Description' },
  { value: 'features', name: 'Features' },
  { value: 'reviews', name: 'Reviews' },
  { value: 'similar', name: 'Similar' },
] as const
