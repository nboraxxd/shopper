import { Link } from 'react-router-dom'

import { NAVBAR } from '@/constants'
import { useFloatingStore } from '@/stores/floating-store'
import { Floating } from '@/components/shared/floating'
import { NavCategories, NavCollections } from '@/components/navbar'
import { SmallArrowDownIcon } from '@/components/icons'

export default function NavItem({ item }: { item: (typeof NAVBAR)[number] }) {
  const isFloatingOpen = useFloatingStore((state) => state.isFloatingOpen)
  const setIsFloatingOpen = useFloatingStore((state) => state.setIsFloatingOpen)

  return item.isDropdown === true ? (
    <li key={item.route}>
      <Floating.Root
        isOpen={isFloatingOpen}
        setIsOpen={setIsFloatingOpen}
        interaction="hover"
        mainAxis={35}
        crossAxis={200}
        hoverDelay={{ open: 300 }}
      >
        <Floating.Reference
          as={Link}
          to={item.route}
          onClick={() => setIsFloatingOpen(false)}
          className="medium-15 text-secondary1_light1 focus-primary px-4 py-2 flex-center"
        >
          <span>{item.label}</span>
          <SmallArrowDownIcon className="ml-1.5 size-3" />
        </Floating.Reference>

        <Floating
          arrowImg="/assets/images/dropdown-arrow.png"
          arrowWidth={50}
          arrowClassName="-top-4"
          wrapperClassName="background-light1_dark2 shadow-light20_dark20 w-[min(1024px,90%)] rounded-[20px]"
        >
          <div className="grid grid-cols-[repeat(2,minmax(405px,1fr))] items-center gap-10 p-8">
            {/* Categories */}
            <NavCategories />

            {/* Collections */}
            <NavCollections />
          </div>
        </Floating>
      </Floating.Root>
    </li>
  ) : (
    <li>
      <Link to={item.route} className="medium-15 text-secondary1_light1 focus-primary px-4 py-2 flex-center">
        <span>{item.label}</span>
      </Link>
    </li>
  )
}
