import { PATH } from '@/constants/path'
import { Logo } from '@/components/shared/Logo'
import { Navbar } from '@/components/shared/Navbar'
import { ActionLink } from '@/components/shared/Header'
import { PrimaryButton } from '@/components/shared/Button'

export default function Header() {
  return (
    <header className="background-light3_dark1 flex-center fixed inset-x-0 top-0 z-20 h-[90px] shadow-1">
      <div className="flex-center container">
        <Logo />

        <Navbar />

        {/* Action */}
        <div className="flex-center ml-auto gap-5">
          <PrimaryButton className="background-light1_dark2 rounded-lg p-3.5 shadow-1 hover:bg-light-2 dark:hover:bg-dark-3">
            <img src="/assets/icons/search.svg" alt="Search" className="h-6 w-6" />
          </PrimaryButton>

          <div className="flex-center background-light1_dark2 rounded-lg shadow-1">
            <ActionLink to={PATH.HOMEPAGE} imgSrc="/assets/icons/heart.svg" imgAlt="Heart" count={3} />
            <div className="h-8 w-px bg-secondary-4"></div>
            <ActionLink to={PATH.HOMEPAGE} imgSrc="/assets/icons/buy.svg" imgAlt="Buy" count={3} />
          </div>

          <PrimaryButton className="overflow-hidden rounded-lg">
            <img src="/assets/images/avatar-test.jpg" alt="Avatar" className="h-[52px] w-[52px] object-cover" />
          </PrimaryButton>
        </div>
      </div>
    </header>
  )
}
