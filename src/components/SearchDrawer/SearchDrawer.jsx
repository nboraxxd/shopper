import { SERVICE_STATUS } from '@/config/serviceStatus'
import productsService from '@/services/products.service'
import { formatCurrency } from '@/utils'
import { Drawer } from 'antd'
import { Skeleton } from '@/components/Skeleton'
import useQuery from '@/hooks/useQuery'
import useDebounce from '@/hooks/useDebounce'

export default function SearchDrawer({ open, onClose }) {
  const [value, setValue] = useDebounce('')

  const productsParamsObj = {
    name: value.trim(),
    limit: '5',
    fields: 'id,name,real_price,price,thumbnail_url',
  }

  const { data, status } = useQuery({
    queryKey: [value],
    queryFn: ({ signal }) => productsService.getProducts(productsParamsObj, signal),
    enabled: Boolean(value.trim()),
  })

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
          <div className="form-group">
            <label className="sr-only" htmlFor="modalSearchCategories">
              Categories:
            </label>
            <select className="custom-select" id="modalSearchCategories">
              <option>All Categories</option>
              <option>Women</option>
              <option>Men</option>
              <option>Kids</option>
            </select>
          </div>
          <div className="input-group input-group-merge">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              onChange={(ev) => setValue(ev.target.value)}
            />
            <div className="input-group-append">
              <div className="btn btn-outline-border !pl-0">
                <i className="fe fe-search" />
              </div>
            </div>
          </div>
        </div>
        {/* Body: Results (add `.d-none` to disable it) */}
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          <p>Search Results:</p>
          {/* Items */}
          {status === SERVICE_STATUS.pending
            ? Array.from(Array(5)).map((_, index) => <SearchItemLoading key={index} />)
            : data?.data?.map((item) => <SearchItem key={item.id} {...item} />)}

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

function SearchItem({ name, real_price, price, thumbnail_url }) {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3">
        {/* Image */}
        <img className="img-fluid" src={thumbnail_url} alt={name} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="font-weight-bold mb-0">
          <a className="stretched-link text-body" href="./product.html">
            {name}
          </a>
        </p>
        <div className="card-product-price">
          <span className="sale text-primary">{formatCurrency(real_price)}₫</span>
          {real_price < price && (
            <span className="text-muted ml-1 inline-block line-through">{formatCurrency(price)}₫</span>
          )}
        </div>
        <p />
      </div>
    </div>
  )
}

function SearchItemLoading() {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3">
        {/* Image */}
        <span className="img-fluid">
          <Skeleton height={86.81} />
        </span>
      </div>
      <div className="col position-static">
        {/* Text */}
        <div className="font-weight-bold mb-0">
          <Skeleton height={16} />
          <Skeleton height={16} />
          <br />
        </div>
        <div className="card-product-price">
          <Skeleton height={43} width="80%" />
        </div>
        <p />
      </div>
    </div>
  )
}
