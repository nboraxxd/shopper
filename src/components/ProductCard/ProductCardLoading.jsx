import { Skeleton } from '../Skeleton'

export default function ProductCardLoading() {
  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="product-card card mb-7">
        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Skeleton height="100%" />
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
