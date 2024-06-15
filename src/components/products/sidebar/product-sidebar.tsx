import { Categories } from '@/components/products/categories'

export default function ProductSidebar() {
  return (
    <div className="scrollbar-hide max-lg:mt-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:h-[calc(100vh-var(--header-height)-2rem)] lg:overflow-y-scroll lg:pb-14">
      <div className="lg:background-light3_dark1 p-3 lg:rounded-xl lg:py-5">
        <p className="md:text-bold-24 text-secondary1_light1 text-medium-18">Categories</p>
        <Categories />
      </div>
    </div>
  )
}
