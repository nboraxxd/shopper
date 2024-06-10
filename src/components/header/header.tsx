import { useMatch } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { removeAuthFromLocalStorage } from '@/utils/localStorage'
import { removeTokensFromHttp } from '@/utils/http'
import { useAuthStore } from '@/stores/auth-store'
import { useFloatingStore } from '@/stores/floating-store'
import { Cart, ShoppingList, Theme } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { MobileNav } from '@/components/mobile-nav'
import { HeartIcon, MoreIcon, SearchIcon } from '@/components/icons'
import { Logo } from '@/components/shared/logo'
import { LinkButton, PrimaryButton } from '@/components/shared/button'

export default function Header() {
  const isProductDetail = Boolean(useMatch(PATH.PRODUCT_DETAIL))

  const setIsSidebarOpen = useFloatingStore((state) => state.setIsSidebarOpen)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  function handleLogout() {
    setIsAuthenticated(false)
    setUser(null)
    removeAuthFromLocalStorage()
    removeTokensFromHttp()
  }

  return (
    <>
      <MobileNav />

      <header className="background-light1_dark1 md:background-light3_dark1 fixed inset-x-0 top-0 z-40 h-[var(--header-height)] shadow-primary flex-center">
        <div className="container flex-center">
          {/* Open sidebar button */}
          <PrimaryButton
            className="rounded-md py-2.5 pl-0.5 pr-2.5 hover:bg-light-2/50 dark:hover:bg-dark-2/15 md:mr-6 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MoreIcon className="size-6" />
          </PrimaryButton>

          <Logo
            wrapperClassName="px-1.5 py-[0.5625rem] max-md:mx-auto lg:px-2 lg:py-2.5"
            BrandTag={isProductDetail ? 'h2' : 'h1'}
          />

          <Navbar />

          {isAuthenticated ? (
            <div className="gap-5 flex-center md:ml-auto">
              {/* Search */}
              <PrimaryButton className="md:background-light1_dark2 rounded-md p-2.5 shadow-primary hover:bg-light-2/50 dark:hover:bg-dark-2/15 md:hover:bg-light-1/70 dark:md:hover:bg-dark-3/15 lg:rounded-lg lg:p-3.5">
                <SearchIcon className="size-6" />
              </PrimaryButton>
              <div className="background-light1_dark2 rounded-md shadow-primary flex-center max-md:hidden lg:rounded-lg">
                {/* Favorites */}
                {/* TODO: Bổ sung `to` prop */}
                <ShoppingList to={PATH.HOMEPAGE} icon={<HeartIcon className="size-6" />} count={3} />
                <div className="h-8 w-px bg-secondary-4"></div>
                {/* Cart */}
                {/* TODO: Bổ sung `to` prop */}
                <Cart />
                {/* TODO: Dời Theme component xuống Footer, tạm thời để đây để test dark mode */}
                <div className="h-8 w-px bg-secondary-4"></div>
                <Theme />
              </div>

              {/* User */}
              <PrimaryButton className="overflow-hidden rounded-md lg:rounded-lg" onClick={handleLogout}>
                <img
                  src={user?.avatar || '/assets/images/default-avatar.webp'}
                  alt="Avatar"
                  className="size-[44px] object-cover lg:size-[52px]"
                />
              </PrimaryButton>
            </div>
          ) : (
            <div className="gap-5 flex-center md:ml-auto">
              {/* Search */}
              <PrimaryButton className="size-9 justify-center rounded-md transition-opacity flex-center hover:opacity-85 lg:size-11">
                <SearchIcon className="size-6" />
              </PrimaryButton>

              {/* Login */}
              <LinkButton
                to={PATH.LOGIN}
                className="medium-15 lg:medium-18 md:text-secondary1_light1 h-9 justify-center rounded-md px-5 text-secondary-1 flex-center max-md:bg-primary-yellow lg:h-11"
              >
                Login
              </LinkButton>

              {/* Sign Up */}
              <LinkButton
                to={PATH.REGISTER}
                className="medium-15 lg:medium-18 ml-4 hidden h-9 items-center justify-center rounded-md bg-primary-yellow px-5 text-secondary-1 md:flex lg:h-11"
              >
                Sign Up
              </LinkButton>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
