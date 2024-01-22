import { useState } from 'react'

import { PATH } from '@/constants/path'
import { Logo } from '@/components/shared/Logo'
import { Navbar } from '@/components/shared/Navbar'
import { ActionLink } from '@/components/shared/Header'
import { PrimaryButton } from '@/components/shared/Button'
import { MobileNav } from '@/components/shared/MobileNav'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <header className="background-light1_dark1 md:background-light3_dark1 fixed inset-x-0 top-0 z-20 h-[82px] shadow-1 flex-center dark:shadow-none lg:h-[90px]">
        <div className="container flex-center">
          {/* Open sidebar button */}
          <PrimaryButton
            className="rounded-md py-2.5 pl-0.5 pr-2.5 shadow-1 hover:bg-light-2/50 dark:shadow-none dark:hover:bg-dark-2/15 md:mr-6 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <img src="/assets/icons/more.svg" alt="More" className="icon-filter h-6 w-6" aria-hidden="true" />
          </PrimaryButton>

          <Logo wrapperClassName="max-md:mx-auto px-1.5 py-[0.5625rem] lg:py-2.5 lg:px-2" />

          <Navbar />

          {/* Action */}
          <div className="gap-5 flex-center md:ml-auto">
            {/* Search */}
            <PrimaryButton className="md:background-light1_dark2 rounded-md p-2.5 shadow-1 hover:bg-light-2/50 dark:shadow-none dark:hover:bg-dark-2/15 md:hover:bg-light-1/70 dark:md:hover:bg-dark-3/15 lg:rounded-lg lg:p-3.5">
              <img src="/assets/icons/search.svg" alt="Search" className="icon-filter h-6 w-6" />
            </PrimaryButton>

            <div className="background-light1_dark2 rounded-md shadow-1 flex-center dark:shadow-none max-md:hidden lg:rounded-lg">
              {/* Favorites */}
              <ActionLink to={PATH.HOMEPAGE} imgSrc="/assets/icons/heart.svg" imgAlt="Heart" count={3} />
              <div className="h-8 w-px bg-secondary-4"></div>
              {/* Cart */}
              <ActionLink to={PATH.HOMEPAGE} imgSrc="/assets/icons/buy.svg" imgAlt="Buy" count={3} />
              {/* TODO: Dời Theme component xuống Footer, tạm thời để đây để test dark mode */}
              {/* <div className="h-8 w-px bg-secondary-4"></div> */}
              {/* <Theme /> */}
            </div>

            {/* User */}
            <PrimaryButton className="overflow-hidden rounded-md lg:rounded-lg">
              <img
                src="/assets/images/avatar-test.jpg"
                alt="Avatar"
                className="h-[44px] w-[44px] object-cover lg:h-[52px] lg:w-[52px]"
              />
            </PrimaryButton>
          </div>
        </div>
      </header>
    </>
  )
}
