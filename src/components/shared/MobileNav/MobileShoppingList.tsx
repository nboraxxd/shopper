import { Link, To } from 'react-router-dom'

interface Props {
  to: To
  imgSrc: string
  imgAlt: string
  label: string
  count: number
}

export default function MobileShoppingList({ to, imgSrc, imgAlt, label, count }: Props) {
  return (
    <Link to={to} className="medium-15 text-secondary1_dark3 flex items-center md:hidden">
      <img src={imgSrc} alt={imgAlt} className="icon-filter h-6 w-6" />
      <span className="ml-4">{label}</span>
      <span className="ml-auto">{count}</span>
    </Link>
  )
}
