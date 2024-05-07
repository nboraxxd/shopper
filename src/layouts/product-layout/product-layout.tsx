import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export default function ProductLayout() {
  return (
    <>
      <Header />
      <main className="background-light1_dark2 pt-[--header-height]">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  )
}
