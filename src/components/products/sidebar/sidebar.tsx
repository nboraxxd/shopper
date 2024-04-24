import { Categories } from '@/components/products/categories'

export default function Sidebar() {
  return (
    <div className="scrollbar-hide max-lg:mt-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:h-[calc(100vh-var(--header-height)-2rem)] lg:overflow-y-scroll lg:pb-14">
      <div className="lg:background-light3_dark1 p-3 lg:rounded-[10px]">
        <h2 className="medium-18 md:bold-24 text-secondary1_light1">Categories</h2>
        <Categories />
      </div>
    </div>
  )
}
