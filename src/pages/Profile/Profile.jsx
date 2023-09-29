import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { PATH } from '@/config'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useForm from '@/hooks/useForm'
import useQuery from '@/hooks/useQuery'
import { userService } from '@/services/user.service'
import { logoutAction, setUserAction } from '@/stores/authSlice'
import { authSelector } from '@/stores/selector'
import { handleError, regexp, required } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const profileRules = {
  name: [required('Vui lòng nhập họ tên của bạn')],
  phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
}

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(authSelector)
  const profileForm = useForm(profileRules, { initialValue: user })

  const profileService = useQuery({
    queryFn: ({ params }) => userService.updateProfile(...params),
    enabled: false,
  })

  async function onSubmit(ev) {
    ev.preventDefault()

    if (profileForm.isValid() === true) {
      try {
        const response = await profileService.refetch(profileForm.values)
        dispatch(setUserAction(response.data))
        toast.success('Bạn đã cập nhật thông tin thành công')
      } catch (err) {
        handleError(err)
      }
    }
  }

  return (
    <section className="pb-12 pt-7">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">Thông tin cá nhân</h3>
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
                <button
                  className="list-group-item list-group-item-action dropright-toggle"
                  onClick={() => {
                    dispatch(logoutAction())
                    navigate(PATH.homePage)
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            {/* Form */}
            <form noValidate onSubmit={onSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="profile-avatar">
                    <div className="wrap">
                      <img src="./img/avt.png" />
                      <i className="icon">
                        <img src="./img/icons/icon-camera.svg" />
                      </i>
                    </div>
                  </div>
                </div>
                {/* Full Name */}
                <div className="col-12">
                  <Field label="Họ và tên *" placeholder="Họ và tên của bạn" {...profileForm.register('name')} />
                </div>
                {/* Phone Number */}
                <div className="col-md-6">
                  <Field
                    label="Số điện thoại *"
                    placeholder="Số điện thoại của bạn"
                    {...profileForm.register('phone')}
                  />
                </div>
                {/* Email */}
                <div className="col-md-6">
                  <Field
                    label="Địa chỉ Email"
                    type="email"
                    placeholder="Email Address"
                    defaultValue={user.username}
                    disabled
                  />
                </div>
                {/* Password */}
                <div className="col-12 col-md-12">
                  <Field
                    label="Mật khẩu hiện tại"
                    type="password"
                    placeholder="Mật khẩu hiện tại của bạn"
                    {...profileForm.register('currentPassword')}
                  />
                </div>
                {/* New Password */}
                <div className="col-12 col-md-6">
                  <Field
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Mật khẩu mới của bạn"
                    {...profileForm.register('newPassword')}
                  />
                </div>
                {/* Confirm Password */}
                <div className="col-12 col-md-6">
                  <Field
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="Xác nhận lại mật khẩu của bạn"
                    {...profileForm.register('confirmPassword')}
                  />
                </div>
                {/* Date of Birth */}
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input className="form-control form-control-sm" type="date" placeholder="dd/mm/yyyy" required />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  {/* Gender */}
                  <div className="form-group mb-8">
                    <label>Giới tính</label>
                    <div className="btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-sm btn-outline-border active">
                        <input type="radio" name="gender" defaultChecked /> Nam
                      </label>
                      <label className="btn btn-sm btn-outline-border">
                        <input type="radio" name="gender" /> Nữ
                      </label>
                    </div>
                  </div>
                </div>
                {/* Button */}
                <div className="col-12">
                  <Button loading={profileService.status === SERVICE_STATUS.pending}>Lưu thay đổi</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
