import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { cn } from '@/utils'
import { PRODUCTS_SORT } from '@/constants/sorts'
import { MediumArrowDownIcon, TickIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'

export default function Sort() {
  const [selected, setSelected] = useState<(typeof PRODUCTS_SORT)[number] | undefined>(undefined)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as={PrimaryButton}
          className="background-light1_dark1 h-9 justify-center gap-3.5 rounded-md px-3 flex-center"
        >
          <span className="medium-16 text-secondary1_secondary3">{selected?.name || 'Sắp xếp'}</span>
          <MediumArrowDownIcon className="inline-block size-5 stroke-secondary-1 dark:stroke-secondary-3" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="background-light1_dark2 shadow-light20_dark20 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {PRODUCTS_SORT.map((sort) => (
              <Menu.Item key={sort.value}>
                {({ active }) => (
                  <PrimaryButton
                    className={cn('w-full justify-between px-4 py-2 text-left flex-center', {
                      'bg-light-2 dark:bg-dark-1/30': active,
                    })}
                    onClick={() => setSelected(sort)}
                  >
                    <span
                      className={cn('text-secondary1_light1', sort.value === selected?.value ? 'bold-15' : 'medium-15')}
                    >
                      {sort.name}
                    </span>
                    {sort.value === selected?.value ? (
                      <TickIcon className="size-4 fill-secondary-1 dark:fill-light-1" />
                    ) : null}
                  </PrimaryButton>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
