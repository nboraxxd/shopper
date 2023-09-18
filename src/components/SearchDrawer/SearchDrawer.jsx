import { Drawer } from 'antd'

export default function SearchDrawer({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose} width={470} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
      <div className="modal-content">
        {/* Close */}
        <button type="button" className="close !outline-none" data-dismiss="modal" aria-label="Close" onClick={onClose}>
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Search Products</strong>
        </div>
        {/* Body: Form */}
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="sr-only" htmlFor="modalSearchCategories">
                Categories:
              </label>
              <select className="custom-select" id="modalSearchCategories">
                <option selected>All Categories</option>
                <option>Women</option>
                <option>Men</option>
                <option>Kids</option>
              </select>
            </div>
            <div className="input-group input-group-merge">
              <input className="form-control" type="search" placeholder="Search" />
              <div className="input-group-append">
                <button className="btn btn-outline-border" type="submit">
                  <i className="fe fe-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Body: Results (add `.d-none` to disable it) */}
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          <p>Search Results:</p>
          {/* Items */}
          <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
              {/* Image */}
              <img className="img-fluid" src="/img/products/product-5.jpg" alt="..." />
            </div>
            <div className="col position-static">
              {/* Text */}
              <p className="font-weight-bold mb-0">
                <a className="stretched-link text-body" href="./product.html">
                  Leather mid-heel Sandals
                </a>{' '}
                <br />
              </p>
              <div className="card-product-price">
                <span className="sale text-primary">45,000</span>
                <span className="text-muted ml-1 inline-block line-through">60,000</span>
              </div>
              <p />
            </div>
          </div>
          <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
              {/* Image */}
              <img className="img-fluid" src="/img/products/product-6.jpg" alt="..." />
            </div>
            <div className="col position-static">
              {/* Text */}
              <p className="font-weight-bold mb-0">
                <a className="stretched-link text-body" href="./product.html">
                  Cotton floral print Dress
                </a>{' '}
                <br />
              </p>
              <div className="card-product-price">
                <span className="sale text-primary">45,000</span>
                <span className="text-muted ml-1 inline-block line-through">60,000</span>
              </div>
              <p />
            </div>
          </div>
          <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
              {/* Image */}
              <img className="img-fluid" src="/img/products/product-7.jpg" alt="..." />
            </div>
            <div className="col position-static">
              {/* Text */}
              <p className="font-weight-bold mb-0">
                <a className="stretched-link text-body" href="./product.html">
                  Leather Sneakers
                </a>{' '}
                <br />
              </p>
              <div className="card-product-price">
                <span className="sale text-primary">45,000</span>
                <span className="text-muted ml-1 inline-block line-through">60,000</span>
              </div>
              <p />
            </div>
          </div>
          <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
              {/* Image */}
              <img className="img-fluid" src="/img/products/product-8.jpg" alt="..." />
            </div>
            <div className="col position-static">
              {/* Text */}
              <p className="font-weight-bold mb-0">
                <a className="stretched-link text-body" href="./product.html">
                  Cropped cotton Top
                </a>{' '}
                <br />
              </p>
              <div className="card-product-price">
                <span className="sale text-primary">45,000</span>
                <span className="text-muted ml-1 inline-block line-through">60,000</span>
              </div>
              <p />
            </div>
          </div>
          <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
              {/* Image */}
              <img className="img-fluid" src="/img/products/product-9.jpg" alt="..." />
            </div>
            <div className="col position-static">
              {/* Text */}
              <p className="font-weight-bold mb-0">
                <a className="stretched-link text-body" href="./product.html">
                  Floral print midi Dress
                </a>{' '}
                <br />
              </p>
              <div className="card-product-price">
                <span className="sale text-primary">45,000</span>
                <span className="text-muted ml-1 inline-block line-through">60,000</span>
              </div>
              <p />
            </div>
          </div>
          {/* Button */}
          <a className="btn btn-link text-reset px-0" href="./shop.html">
            View All <i className="fe fe-arrow-right ml-2" />
          </a>
        </div>
        {/* Body: Empty (remove `.d-none` to disable it) */}
        <div className="d-none modal-body border">
          {/* Text */}
          <p className="font-size-sm mb-3 text-center">Nothing matches your search</p>
          <p className="font-size-sm mb-0 text-center">😞</p>
        </div>
      </div>
    </Drawer>
  )
}
