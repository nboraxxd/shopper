import { Categories } from '@/components/products/categories'
import { Price } from '@/components/products/price'

export default function Sidebar() {
  return (
    <div className="sticky top-[calc(var(--header-height))] h-[calc(100vh-var(--header-height))] space-y-5 overflow-y-scroll pb-28 pt-8 scrollbar-hide">
      <SidebarSection title="Categories">
        <Categories />
      </SidebarSection>

      <SidebarSection title="Price">
        <Price />
      </SidebarSection>
    </div>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="background-light3_dark1 rounded-[10px] p-3">
      <p className="bold-24 text-secondary1_light1 mb-3">{title}</p>
      {children}
    </div>
  )
}
