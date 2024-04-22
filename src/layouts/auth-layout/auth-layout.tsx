import { Outlet } from 'react-router-dom'

import { Logo } from '@/components/shared/logo'

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Intro */}
      <div className="background-secondary6_dark1 hidden flex-col items-center justify-center gap-12 px-7 lg:flex">
        <img src="/assets/images/auth/intro.svg" alt="Auth intro" className="w-[min(424px,100%)]" />
        <p className="medium-18 text-secondary1_dark3 max-w-[412px] text-center">
          The best of luxury brand values, high quality products, and innovative services
        </p>
      </div>

      {/* Content */}
      <div className="background-light1_dark2 px-5 sm:px-7">
        <div className="mx-auto w-[min(460px,100%)] flex-col justify-center py-14 text-center flex-center">
          <Logo
            BrandTag="h2"
            wrapperClassName="gap-3.5"
            iconClassName="size-8"
            brandClassName="!text-[1.375rem] !font-bold !leading-[145.455%]"
          />
          <Outlet />
        </div>
      </div>
    </main>
  )
}
