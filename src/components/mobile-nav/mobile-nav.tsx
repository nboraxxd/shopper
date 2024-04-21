import { Dispatch, SetStateAction, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { PrimaryButton } from '@/components/shared/button'
import { NavCategories, NavCollections } from '@/components/navbar/index'
import { MobileShoppingList } from '@/components/mobile-nav'
import { ArrowLeftIcon } from '@/components/icons'

interface Props {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileNav({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-1/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Mobile nav */}
        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="shadow-light20_dark20 background-light1_dark2 w-full rounded-r-[20px] pb-12">
                {/* Close button */}
                <div className="flex h-[var(--mobile-nav-height)] items-center px-4">
                  <PrimaryButton className="mt-1.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <ArrowLeftIcon className="size-6" />
                  </PrimaryButton>
                </div>

                <div className="h-[calc(100%-var(--mobile-nav-height))] space-y-5 overflow-y-auto px-4 scrollbar-hide">
                  {/* Cart */}
                  {/* TODO: Bổ sung to prop */}
                  <MobileShoppingList to="/" imgSrc="/assets/icons/buy.svg" imgAlt="Buy" label="Giỏ hàng" count={3} />

                  {/* Favorites */}
                  {/* TODO: Bổ sung to prop */}
                  <MobileShoppingList
                    to="/"
                    imgSrc="/assets/icons/heart.svg"
                    imgAlt="Heart"
                    label="Yêu thích"
                    count={3}
                  />

                  {/* Categories */}
                  <NavCategories />

                  {/* Collections */}
                  <NavCollections />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
