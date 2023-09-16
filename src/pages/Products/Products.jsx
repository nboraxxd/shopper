import { ProductCard, ProductCardLoading } from '@/components/ProductCard'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useQuery from '@/hooks/useQuery'
import productsService from '@/services/products.service'
import { Pagination } from '@/pages/Products'
// import { Skeleton } from '@/components/Skeleton'
import useSearchParamsObj from '@/hooks/useSearchParamsObj'
// import useScrollTop from '@/hooks/useScrollTop'

export default function Products() {
  const searchParamsObj = useSearchParamsObj()
  // useScrollTop([JSON.stringify(searchParamsObj)])

  const getProductsService = useQuery({
    queryFn: ({ signal }) =>
      productsService.getProducts(
        `?page=${
          searchParamsObj.page ?? 1
        }&limit=30&fields=name,real_price,price,categories,slug,id,images,rating_average,review_count,discount_rate`,
        signal,
      ),
    queryKey: [JSON.stringify(searchParamsObj)],
    keepPreviousData: true,
  })
  const products = getProductsService.data

  const isLoading =
    getProductsService.status === SERVICE_STATUS.idle || getProductsService.status === SERVICE_STATUS.pending

  return (
    <>
      {/* PROMO */}
      <div className="bg-dark bg-pattern @@classList py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Text */}
              <div className="text-center text-white">
                <span className="heading-xxs letter-spacing-xl">⚡️ Săn deal hot cho ngày lễ 2/9 ⚡️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <section className="py-11">
        <div className="products container">
          <div className="row">
            <div className="products col-12 col-md-4 col-lg-3">
              {/* Filters */}
              <form className="mb-md-0 mb-10">
                <ul className="nav nav-vertical" id="filterNav">
                  <li className="nav-item">
                    {/* Toggle */}
                    <a className="nav-link font-size-lg text-reset border-bottom mb-6" href="#categoryCollapse">
                      Category
                    </a>
                    {/* Collapse */}
                    <div>
                      <div className="form-group">
                        <ul className="list-styled mb-0" id="productsNav">
                          <li className="list-styled-item">
                            <a className="list-styled-link " href="#">
                              All Products
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link font-bold" href="#blousesCollapse">
                              Blouses and Shirts
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#coatsCollapse">
                              Coats and Jackets
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#dressesCollapse" aria-expanded="true">
                              Dresses
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#hoodiesCollapse">
                              Hoodies and Sweats
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#denimCollapse">
                              Denim
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#jeansCollapse">
                              Jeans
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#jumpersCollapse">
                              Jumpers and Cardigans
                            </a>
                          </li>
                          <li className="list-styled-item">
                            {/* Toggle */}
                            <a className="list-styled-link" href="#legginsCollapse">
                              Leggings
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    {/* Toggle */}
                    <a className="nav-link font-size-lg text-reset border-bottom mb-6" href="#seasonCollapse">
                      Rating
                    </a>
                    {/* Collapse */}
                    <div>
                      <div className="form-group form-group-overflow mb-6" id="seasonGroup">
                        <div className="custom-control custom-radio mb-3">
                          <input className="custom-control-input" type="radio" defaultChecked />
                          <label className="custom-control-label flex items-center" htmlFor="seasonOne">
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
                            <span className="text-small ml-2 inline-block">from 5 star</span>
                          </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                          <input className="custom-control-input" id="seasonTwo" type="radio" />
                          <label className="custom-control-label flex items-center" htmlFor="seasonOne">
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
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width={14}
                              height={14}
                              viewBox="0 0 12 12"
                              className="star-icon"
                            >
                              <g fill="none" fillRule="evenodd">
                                <path
                                  fill="#b8b8b8"
                                  transform="matrix(-1 0 0 1 11 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                                <path
                                  fill="#b8b8b8"
                                  transform="translate(1 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                              </g>
                            </svg>
                            <span className="text-small ml-2 inline-block">from 4 star</span>
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" id="seasonThree" type="radio" />
                          <label className="custom-control-label flex items-center" htmlFor="seasonOne">
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
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width={14}
                              height={14}
                              viewBox="0 0 12 12"
                              className="star-icon"
                            >
                              <g fill="none" fillRule="evenodd">
                                <path
                                  fill="#b8b8b8"
                                  transform="matrix(-1 0 0 1 11 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                                <path
                                  fill="#b8b8b8"
                                  transform="translate(1 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                              </g>
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width={14}
                              height={14}
                              viewBox="0 0 12 12"
                              className="star-icon"
                            >
                              <g fill="none" fillRule="evenodd">
                                <path
                                  fill="#b8b8b8"
                                  transform="matrix(-1 0 0 1 11 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                                <path
                                  fill="#b8b8b8"
                                  transform="translate(1 1)"
                                  d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                                />
                              </g>
                            </svg>
                            <span className="text-small ml-2 inline-block">from 3 star</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    {/* Toggle */}
                    <a
                      className="nav-link font-size-lg text-reset border-bottom mb-6"
                      data-toggle="collapse"
                      href="#priceCollapse"
                    >
                      Price
                    </a>
                    {/* Collapse */}
                    <div>
                      {/* Range */}
                      <div className="d-flex align-items-center">
                        {/* Input */}
                        <input type="number" className="form-control form-control-xs" placeholder="$10.00" min={10} />
                        {/* Divider */}
                        <div className="text-gray-350 mx-2">‒</div>
                        {/* Input */}
                        <input type="number" className="form-control form-control-xs" placeholder="$350.00" max={350} />
                      </div>
                      <button className="btn btn-outline-dark btn-block mt-5">Apply</button>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
            <div className="products col-12 col-md-8 col-lg-9">
              {/* Slider */}

              {/* Header */}
              <div className="row align-items-center mb-7">
                <div className="col-12 col-md">
                  {/* Heading */}
                  <h3 className="mb-1">Women&apos;s Clothing</h3>
                  {/* Breadcrumb */}
                  <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                    <li className="breadcrumb-item">
                      <a className="text-gray-400" href="index.html">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Women&apos;s Clothing</li>
                  </ol>
                </div>
                <div className="col-12 col-md-auto flex items-center gap-1 whitespace-nowrap">
                  {/* Select */}
                  Sắp xếp theo:
                  <select className="custom-select custom-select-xs">
                    <option>Mới nhất</option>
                    <option>Giá giảm dần</option>
                    <option>Giá tăng dần</option>
                    <option>Giảm giá nhiều nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Mua nhiều nhất</option>
                  </select>
                </div>
              </div>
              <nav className="d-flex justify-content-center justify-content-md-end">
                <Pagination searchParamsObj={searchParamsObj} totalPage={products?.paginate?.totalPage} />
              </nav>
              <h4 className="mb-5 text-2xl">Searching for `Clothing`</h4>
              {/* Products */}
              <div className="row">
                {isLoading
                  ? Array.from(Array(15)).map((_, index) => <ProductCardLoading key={index} />)
                  : products?.data?.map((product) => <ProductCard key={product.id} {...product} />)}
              </div>
              {/* Pagination */}
              <nav className="d-flex justify-content-center justify-content-md-end">
                {/* {isLoading ? (
                  <Skeleton width={300} height={40} />
                ) : ( */}
                <Pagination searchParamsObj={searchParamsObj} totalPage={products?.paginate?.totalPage} />
                {/* )} */}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
