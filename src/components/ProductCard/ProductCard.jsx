import { PATH } from '@/config'
import { formatCurrency } from '@/utils'
import { Link, generatePath } from 'react-router-dom'
import defaultImage from '@/assets/images/default-image.svg'
import { useCategory } from '@/hooks/useCategories'

export default function ProductCard(props) {
  const {
    name,
    price,
    real_price,
    slug,
    rating_average,
    review_count,
    images,
    discount_rate,
    categories: categoryId,
  } = props
  const productDetailPath = generatePath(PATH.productDetail, { slug })

  const category = useCategory(categoryId)

  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="product-card card mb-7">
        {/* Badge */}
        {Boolean(discount_rate) && discount_rate > 0 && (
          <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase pl-2">
            - {discount_rate}%
          </div>
        )}
        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Link to={productDetailPath} className="card-img-hover">
            <img
              className="card-img-top card-img-back"
              src={images[1]?.thumbnail_url || images[0]?.thumbnail_url}
              alt={name}
              onError={(e) => {
                if (e.target.src !== defaultImage) {
                  e.target.onerror = null
                  e.target.src = defaultImage
                }
              }}
            />
            <img
              className="card-img-top card-img-front"
              src={images[0]?.thumbnail_url}
              alt={name}
              onError={(e) => {
                if (e.target.src !== defaultImage) {
                  e.target.onerror = null
                  e.target.src = defaultImage
                }
              }}
            />
          </Link>
          {/* Actions */}
          <div className="card-actions">
            <span className="card-action"></span>
            <span className="card-action">
              <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
            <span className="card-action">
              <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                <i className="fe fe-heart" />
              </button>
            </span>
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            {category && (
              <a className="text-muted" href="shop.html">
                {category.title}
              </a>
            )}
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <Link to={productDetailPath} className="text-body card-product-name">
              {name}
            </Link>
          </div>
          <div className="card-product-rating">
            {review_count > 0 && (
              <>
                {rating_average.toFixed(1)}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  size={14}
                  color="#fdd836"
                  height={14}
                  width={14}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#fdd836' }}
                  className="ml-2"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  size={14}
                  color="#fdd836"
                  height={14}
                  width={14}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#fdd836' }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  size={14}
                  color="#fdd836"
                  height={14}
                  width={14}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#fdd836' }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  size={14}
                  color="#fdd836"
                  height={14}
                  width={14}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#fdd836' }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  size={14}
                  color="#fdd836"
                  height={14}
                  width={14}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#fdd836' }}
                  className="mr-2"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                ({review_count} review)
              </>
            )}
          </div>
          {/* Price */}
          <div className="card-product-price flex flex-col">
            {real_price < price && (
              <span className="font-size-xs text-gray-350 text-decoration-line-through text-sm font-normal">
                {formatCurrency(price)}₫
              </span>
            )}
            <span className="text-primary sale">{formatCurrency(real_price)}₫</span>
          </div>
        </div>
      </div>
    </div>
  )
}
