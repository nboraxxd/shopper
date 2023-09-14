export default function Address() {
  return (
    <section className="pb-12 pt-7">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">Sổ địa chỉ</h3>
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
            <div className="row">
              <div className="col-12">
                {/* Card */}
                <div className="card card-lg bg-light mb-8">
                  <div className="card-body">
                    {/* Text */}
                    <p className="font-size-sm mb-0 leading-[35px]">
                      <a className="text-body text-xl font-bold " href="./product.html">
                        Đặng Thuyền Vương
                      </a>{' '}
                      <br />
                      <b>Số điện thoại:</b> 123456789 <br />
                      <b>Email:</b>dangthuyenvuong@gmail.com
                      <br />
                      <b>Quận / Huyện:</b> Q1 <br />
                      <b>Tỉnh / thành phố:</b> Ho Chi Minh <br />
                      <b>Địa chỉ:</b> 123
                    </p>
                    <div className="card-action-right-bottom">
                      <div className="color-success cursor-pointer">Địa chỉ mặc định</div>
                    </div>
                    {/* Action */}
                    <div className="card-action card-action-right">
                      {/* Button */}
                      <button className="btn btn-xs btn-circle btn-white-primary" href="account-address-edit.html">
                        <i className="fe fe-edit-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* Card */}
                <div className="card card-lg bg-light mb-8">
                  <div className="card-body">
                    {/* Text */}
                    <p className="font-size-sm mb-0 leading-[35px]">
                      <a className="text-body text-xl font-bold " href="./product.html">
                        Đặng Thuyền Vương
                      </a>{' '}
                      <br />
                      <b>Số điện thoại:</b> 123456789 <br />
                      <b>Email:</b>dangthuyenvuong@gmail.com
                      <br />
                      <b>Quận / Huyện:</b> Q1 <br />
                      <b>Tỉnh / thành phố:</b> Ho Chi Minh <br />
                      <b>Địa chỉ:</b> 123
                    </p>
                    {/* Action */}
                    <div className="card-action card-action-right flex gap-2">
                      {/* Button */}
                      <button className="btn btn-xs btn-circle btn-white-primary" href="account-address-edit.html">
                        <i className="fe fe-edit-2" />
                      </button>
                      {/* Button */}
                      <button className="btn btn-xs btn-circle btn-white-primary">
                        <i className="fe fe-x" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* Button */}
                <a className="btn btn-block btn-lg btn-outline-border" href="account-address-edit.html">
                  Add Address <i className="fe fe-plus" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}