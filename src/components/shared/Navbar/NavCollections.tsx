import { Fragment } from 'react'
import { Link, createSearchParams } from 'react-router-dom'

import { ProductParameters } from '@/types/product.type'
import { COLLECTIONS } from '@/constants'
import { PATH } from '@/constants/path'

export default function NavCollections() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {COLLECTIONS.map((collection) => {
        const sortParameterObject: Pick<ProductParameters, 'sort'> = { sort: collection.sortValue }

        return (
          <Fragment key={collection._id}>
            {/* Mobile & tablet */}
            <div className="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100 lg:hidden">
              <img
                src={collection.img}
                alt={collection.title}
                className="object-cover object-center group-hover:opacity-80"
              />
              <div className="flex flex-col justify-end">
                <div className="bg-light-1 bg-opacity-60 p-4">
                  <Link
                    to={{ pathname: PATH.PRODUCTS, search: createSearchParams(sortParameterObject).toString() }}
                    className="medium-16 text-secondary-1"
                  >
                    <span className="absolute inset-0 z-10"></span>
                    {collection.title}
                  </Link>
                  <p className="regular-14 mt-0.5 text-secondary-1 sm:mt-1">Mua ngay</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div key={collection._id} className="group relative max-lg:hidden">
              <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-80">
                <img src={collection.img} alt={collection.title} className="object-cover object-center" />
              </div>
              <Link
                to={{ pathname: PATH.PRODUCTS, search: createSearchParams(sortParameterObject).toString() }}
                className="medium-16 text-secondary1_dark3 mt-6 inline-block"
              >
                <span className="absolute inset-0 z-10"></span>
                {collection.title}
              </Link>
              <p className="regular-14 text-secondary1_dark3 mt-1">Mua ngay</p>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
