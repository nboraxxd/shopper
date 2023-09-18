import { ProductCard, ProductCardLoading } from '@/components/ProductCard'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useQuery from '@/hooks/useQuery'
import productsService from '@/services/products.service'
import { Pagination } from '@/pages/Products'
import useScrollTop from '@/hooks/useScrollTop'
import { Skeleton } from '@/components/Skeleton'
import { Link, createSearchParams, generatePath, useParams } from 'react-router-dom'
import { PATH } from '@/config'
import { slugify } from '@/utils'
import useSearchParamsObj from '@/hooks/useSearchParamsObj'
import omitBy from 'lodash/omitBy'
import omit from 'lodash/omit'
import { twJoin } from 'tailwind-merge'
import { useCategories } from '@/hooks/useCategories'

const PRODUCT_PER_PAGE = 30

export default function Products() {
  // Khi path trong URL là dynamic. Chúng ta có thể dùng useParams để lấy ra từng phần dynamic
  // Cụ thể ở đây path có dạng /:slug/:id. slug và id là các dynamic path.
  // Khi đó useParams sẽ trả về object dạng { slug: slugPath, id: idPath }
  const { id: categoryId } = useParams()
  const paramsObj = useSearchParamsObj()

  // productsParamsObj sẽ là argument truyền vào getProducts function.
  // productsParamsObj nhằm tạo ra một object đầy đủ các params cần thiết cho getProducts function.
  // Dùng omitBy kết hợp với callback để loại bỏ cách giá trị undefined
  // mục đích là để khi tạo productsParams thì sẽ không có các giá trị undefined
  // cụ thể nếu không loại bỏ các giá trị undefined params URL sẽ có dạng ?page=3&sort=undefined&minPrice=undefined&maxPrice=undefined.
  // Nói thêm, khi truyền object vào getProducts function mà property có dạng [key]: undefined
  // thì property đó sẽ tự động được loại bỏ không gắn vào URL để gọi API
  const productsParamsObj = omitBy(
    {
      page: paramsObj.page || '1',
      limit: PRODUCT_PER_PAGE.toString(),
      categories: categoryId,
      sort: paramsObj.sort,
      minPrice: paramsObj.minPrice,
      maxPrice: paramsObj.maxPrice,
      fields: 'name,real_price,price,categories,slug,id,images,rating_average,review_count,discount_rate',
    },
    (value) => value === undefined,
  )

  // createSearchParams(productsParamsObj).toString() sẽ tạo ra searchParams từ productsParamsObj
  // Cụ thể nếu productsParamsObj có dạng { page: 3, limit: 12, categories: '60aba4e' }
  // thì searchParams sẽ có dạng page=3&limit=12&categories=60aba4e
  const productsParams = createSearchParams(omit(productsParamsObj, ['fields'])).toString()

  useScrollTop([productsParams])

  const getProductsService = useQuery({
    queryFn: ({ signal }) => productsService.getProducts(productsParamsObj, signal),
    queryKey: [productsParams],
    // cacheTime: 5000,
    keepPreviousData: true,
  })
  const products = getProductsService.data
  const isLoadingProducts =
    getProductsService.status === SERVICE_STATUS.idle || getProductsService.status === SERVICE_STATUS.pending

  const getCategoriesService = useCategories()

  const categories = getCategoriesService.data
  const isLoadingCategories =
    getCategoriesService.status === SERVICE_STATUS.idle || getCategoriesService.status === SERVICE_STATUS.pending

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
                          {isLoadingCategories ? (
                            Array.from(Array(12)).map((_, index) => (
                              <li key={index} className="list-styled-item">
                                <Skeleton height={24} />
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="list-styled-item">
                                <Link
                                  to={PATH.products}
                                  className={twJoin('list-styled-link', categoryId === undefined && 'font-bold')}
                                >
                                  Tất cả sản phẩm
                                </Link>
                              </li>
                              {categories.data.map((category) => {
                                const categoryPath = generatePath(PATH.category, {
                                  slug: slugify(category.title),
                                  id: category.id,
                                })
                                return (
                                  <li key={category.id} className="list-styled-item">
                                    {/* Toggle */}
                                    <Link
                                      to={categoryPath}
                                      className={twJoin(
                                        'list-styled-link',
                                        Number(categoryId) === category.id && 'font-bold',
                                      )}
                                    >
                                      {category.title}
                                    </Link>
                                  </li>
                                )
                              })}
                            </>
                          )}
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
              {/* TODO */}

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
                <Pagination totalPage={products?.paginate?.totalPage} />
              </nav>
              <h4 className="mb-5 text-2xl">Searching for `Clothing`</h4>
              {/* Products */}
              <div className="row">
                {isLoadingProducts
                  ? Array.from(Array(15)).map((_, index) => <ProductCardLoading key={index} />)
                  : products?.data?.map((product) => <ProductCard key={product.id} {...product} />)}
              </div>
              {/* Pagination */}
              <nav className="d-flex justify-content-center justify-content-md-end">
                <Pagination totalPage={products?.paginate?.totalPage} />
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
