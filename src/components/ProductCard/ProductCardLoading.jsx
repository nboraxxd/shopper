import { Skeleton } from '@/components/Skeleton'

export default function ProductCardLoading() {
  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="product-card card mb-7">
        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Skeleton height="100%" className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-1/3 w-1/3 opacity-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </Skeleton>
        </div>
        {/* Body */}
        <div className="card-body px-0">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            {/* <div className="text-muted"> */}
            <Skeleton height={12} />
            {/* </div> */}
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <Skeleton height={15} />
            <Skeleton height={15} />
            <Skeleton height={15} />
          </div>
          <div className="card-product-rating">
            <Skeleton height={16} width="80%" />
          </div>
          {/* Price */}
          <div className="card-product-price flex flex-col">
            <span className="font-size-xs text-gray-350 text-decoration-line-through text-sm font-normal">
              <Skeleton height={18} width="40%" />
            </span>
            <span className="text-primary sale">
              <Skeleton height={30} width="60%" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
