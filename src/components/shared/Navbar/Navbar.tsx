import { NAVBAR } from '@/constants'
import { NavItem } from '@/components/shared/Navbar'

export default function Navbar() {
  return (
    <nav className="max-lg:hidden lg:ml-10 xl:ml-32">
      <ul className="flex-center">
        {NAVBAR.map((item) => (
          <NavItem key={item.route} item={item} />
        ))}
      </ul>
    </nav>
  )
}
