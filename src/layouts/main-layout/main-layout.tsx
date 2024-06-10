import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="background-light2_dark2 pb-10 pt-[--header-height]">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
