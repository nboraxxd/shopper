import { Fragment } from 'react'
import { Link, createSearchParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { COLLECTIONS } from '@/constants'
import { ProductSort } from '@/constants/enums'
import { useFloatingStore } from '@/stores/floating-store'

export default function NavCollections() {
  const isSidebarOpen = useFloatingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useFloatingStore((state) => state.setIsSidebarOpen)
  const isFloatingOpen = useFloatingStore((state) => state.isFloatingOpen)
  const setIsFloatingOpen = useFloatingStore((state) => state.setIsFloatingOpen)

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {COLLECTIONS.map((collection) => {
        const sortParameterObject: Record<'sort', ProductSort> = { sort: collection.sortValue }

        return (
          <Fragment key={collection._id}>
            {/* Mobile & tablet */}
            <div className="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100 lg:hidden">
              <img
                src={collection.img}
                alt={collection.title}
                className="object-cover object-center transition-opacity group-hover:opacity-80"
              />
              <div className="flex flex-col justify-end">
                <div className="bg-light-1/60 p-4">
                  <Link
                    to={{ pathname: PATH.PRODUCTS, search: createSearchParams(sortParameterObject).toString() }}
                    className="focus-primary text-medium-16 text-secondary-1 "
                    onClick={() => {
                      if (isSidebarOpen) setIsSidebarOpen(false)
                      if (isFloatingOpen) setIsFloatingOpen(false)
                    }}
                  >
                    <span className="absolute inset-0 z-10"></span>
                    {collection.title}
                  </Link>
                  <p className="mt-0.5 text-regular-14 text-secondary-1 sm:mt-1">Mua ngay</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div key={collection._id} className="group relative max-lg:hidden">
              <div className="overflow-hidden rounded-lg bg-gray-100 transition-opacity group-hover:opacity-80">
                <img src={collection.img} alt={collection.title} className="object-cover object-center" />
              </div>
              <Link
                to={{ pathname: PATH.PRODUCTS, search: createSearchParams(sortParameterObject).toString() }}
                className="text-secondary1_dark3 focus-primary mt-6 inline-block text-medium-16"
                onClick={() => {
                  if (isSidebarOpen) setIsSidebarOpen(false)
                  if (isFloatingOpen) setIsFloatingOpen(false)
                }}
              >
                <span className="absolute inset-0 z-10"></span>
                {collection.title}
              </Link>
              <p className="text-secondary1_dark3 mt-1 text-regular-14">Mua ngay</p>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
