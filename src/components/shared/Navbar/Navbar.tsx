import { Link } from 'react-router-dom'

import { NAVBAR } from '@/constants'

export default function Navbar() {
  return (
    <nav className="max-lg:hidden lg:ml-10 xl:ml-32">
      <ul className="flex-center">
        {NAVBAR.map((item) => (
          <li key={item.route}>
            <Link to={item.route} className="medium-15 text-secondary1_light1 focus-primary h-[52px] px-4 flex-center">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
