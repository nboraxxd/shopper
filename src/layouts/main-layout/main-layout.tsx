import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="background-light2_dark2 pt-[var(--header-height)]">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}
