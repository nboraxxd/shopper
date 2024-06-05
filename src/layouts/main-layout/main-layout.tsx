import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export default function MainLayout() {
  return (
    <>
      <Header />
      {/* Cách định nghĩa lại CSS var trong Tailwind [--header-height:500px] */}
      <main className="background-light2_dark2 pb-10 pt-[--header-height]">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}
