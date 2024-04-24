import { LogoIcon } from '@/components/icons'
import { Skeleton } from '@/components/shared/skeleton'

export default function ProductCardSkeleton() {
  return (
    <div className="background-light1_dark1 overflow-hidden rounded-lg">
      <div className="group relative pt-[100%]">
        <div className="absolute left-0 top-0 size-full">
          <Skeleton className="size-full justify-center rounded-none flex-center">
            <LogoIcon className="size-12 opacity-5" isSekeleton />
          </Skeleton>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <Skeleton className="h-5" />
          <Skeleton className="mt-2 h-5" />
        </div>
        <Skeleton className="h-4" />
        <div className="justify-between flex-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
