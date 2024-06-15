import { Link, To } from 'react-router-dom'

import { useFloatingStore } from '@/stores/floating-store'

interface Props {
  to: To
  imgSrc: string
  imgAlt: string
  label: string
  count: number
}

export default function MobileShoppingList({ to, imgSrc, imgAlt, label, count }: Props) {
  const setIsSidebarOpen = useFloatingStore((state) => state.setIsSidebarOpen)

  return (
    <Link
      to={to}
      className="text-secondary1_dark3 flex items-center text-medium-15 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    >
      <img src={imgSrc} alt={imgAlt} className="icon-filter size-6" />
      <span className="ml-4">{label}</span>
      <span className="ml-auto">{count}</span>
    </Link>
  )
}
