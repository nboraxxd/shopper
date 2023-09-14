export default function WishList() {
  return (
    <section className="pb-12 pt-7">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">Sản phẩm yêu thích</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-md-0 mb-10">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-orders.html">
                  Theo dõi đơn hàng
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle "
                  href="account-personal-info.html"
                >
                  Thông tin cá nhân
                </a>
                <a
                  className="list-group-item list-group-item-action dropright-toggle active"
                  href="account-wishlist.html"
                >
                  Sản phẩm yêu thích
                </a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-address.html">
                  Sổ địa chỉ
                </a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-payment.html">
                  Sổ thanh toán
                </a>
                <a className="list-group-item list-group-item-action dropright-toggle" href="#!">
                  Đăng xuất
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            {/* Products */}
            <div className="row">
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="product-card card mb-7">
                  {/* Badge */}
                  <div className="badge badge-white card-badge card-badge-left text-uppercase">New</div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img className="card-img-top card-img-back" src="./img/products/product-120.jpg" alt="..." />
                      <img className="card-img-top card-img-front" src="./img/products/product-5.jpg" alt="..." />
                    </a>
                    {/* Actions */}
                    <div className="card-actions">
                      <span className="card-action"></span>
                      <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                          <i className="fe fe-shopping-cart" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="card-product-category font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Shoes
                      </a>
                    </div>
                    {/* Title */}
                    <div className="card-product-title font-weight-bold">
                      <a className="text-body card-product-name" href>
                        Leather mid-heel Sandals
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$129.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="product-card card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img className="card-img-top card-img-back" src="./img/products/product-121.jpg" alt="..." />
                      <img className="card-img-top card-img-front" src="./img/products/product-6.jpg" alt="..." />
                    </a>
                    {/* Actions */}
                    <div className="card-actions">
                      <span className="card-action"></span>
                      <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                          <i className="fe fe-shopping-cart" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="card-product-category font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Dresses
                      </a>
                    </div>
                    {/* Title */}
                    <div className="card-product-title font-weight-bold">
                      <a className="text-body card-product-name" href="product.html">
                        Cotton floral print Dress
                      </a>
                    </div>
                    {/* Price */}
                    <div className="card-product-price">$40.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="product-card card mb-7">
                  {/* Badge */}
                  <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">- 50%</div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img className="card-img-top card-img-back" src="./img/products/product-122.jpg" alt="..." />
                      <img className="card-img-top card-img-front" src="./img/products/product-7.jpg" alt="..." />
                    </a>
                    {/* Actions */}
                    <div className="card-actions">
                      <span className="card-action"></span>
                      <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                          <i className="fe fe-shopping-cart" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="card-product-category font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Shoes
                      </a>
                    </div>
                    {/* Title */}
                    <div className="card-product-title font-weight-bold">
                      <a className="text-body card-product-name" href="product.html">
                        Leather Sneakers
                      </a>
                    </div>
                    <div className="card-product-rating">
                      5
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
                        style={{ color: 'rgb(253, 216, 54)' }}
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
                        style={{ color: 'rgb(253, 216, 54)' }}
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
                        style={{ color: 'rgb(253, 216, 54)' }}
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
                        style={{ color: 'rgb(253, 216, 54)' }}
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
                        style={{ color: 'rgb(253, 216, 54)' }}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    {/* Price */}
                    <div className="card-product-price">
                      <span className="text-primary sale">$40.00</span>
                      <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">$85.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="product-card card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a href="#!">
                      <img className="card-img-top card-img-front" src="./img/products/product-8.jpg" alt="..." />
                    </a>
                    {/* Actions */}
                    <div className="card-actions">
                      <span className="card-action"></span>
                      <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                          <i className="fe fe-shopping-cart" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="card-product-category font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Tops
                      </a>
                    </div>
                    {/* Title */}
                    <div className="card-product-title font-weight-bold">
                      <a className="text-body card-product-name" href>
                        Cropped cotton Top
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$29.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="product-card card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a href="#!">
                      <img className="card-img-top card-img-front" src="./img/products/product-9.jpg" alt="..." />
                    </a>
                    {/* Actions */}
                    <div className="card-actions">
                      <span className="card-action"></span>
                      <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                          <i className="fe fe-shopping-cart" />
                        </button>
                      </span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="card-product-category font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Dresses
                      </a>
                    </div>
                    {/* Title */}
                    <div className="card-product-title font-weight-bold">
                      <a className="text-body card-product-name" href>
                        Floral print midi Dress
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$50.00</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <nav className="d-flex justify-content-center justify-content-md-end">
              <ul className="pagination pagination-sm text-gray-400">
                <li className="page-item">
                  <a className="page-link page-link-arrow" href="#">
                    <i className="fa fa-caret-left" />
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    6
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link page-link-arrow" href="#">
                    <i className="fa fa-caret-right" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
