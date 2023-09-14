import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div className="flex gap-2">
      <div>UserLayout</div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}
