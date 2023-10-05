import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { PATH } from '@/config'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useForm from '@/hooks/useForm'
import useQuery from '@/hooks/useQuery'
import { userService } from '@/services/user.service'
import { logoutAction, setUserAction } from '@/stores/authSlice'
import { authSelector } from '@/stores/selector'
import { areObjectsEqual, confirm, different, handleError, max, min, regexp, required, validate } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { avatarDefault } from '@/config/assets'
import { fileService } from '@/services/file.service'
import { UploadImage } from '@/components/UploadImage'
import { useRef } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { Radio } from '@/components/Radio'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

const profileRules = {
  name: [required('Vui lòng nhập họ tên của bạn')],
  phone: [regexp('phone', 'Số điện thoại chưa đúng định dạng')],
  currentPassword: [
    (_, forms) => {
      if (forms.newPassword?.trim()?.length >= PASSWORD_MIN_LENGTH) {
        const errorObj = validate(
          {
            currentPassword: [required('Vui lòng nhập mật khẩu hiện tại')],
          },
          forms,
        )
        return errorObj.currentPassword
      }
      return
    },
    min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
    max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
  ],
  newPassword: [
    (_, forms) => {
      if (forms.currentPassword?.trim().length >= PASSWORD_MIN_LENGTH) {
        const errorObj = validate(
          {
            newPassword: [required('Vui lòng nhập mật khẩu mới')],
          },
          forms,
        )
        return errorObj.newPassword
      }
      return
    },
    min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
    max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    different('currentPassword', 'Mật khẩu mới phải khác với mật khẩu hiện tại'),
  ],
  confirmPassword: [
    (_, forms) => {
      if (
        forms.newPassword?.trim().length >= PASSWORD_MIN_LENGTH &&
        forms.newPassword?.trim() !== forms?.currentPassword
      ) {
        const errObj = validate(
          {
            confirmPassword: [required('Vui lòng xác nhận lại mật khẩu')],
          },
          forms,
        )
        return errObj.confirmPassword
      }
      return
    },
    confirm('newPassword', 'Mật khẩu nhập lại chưa chính xác'),
  ],
}

export default function Profile() {
  const fileRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(authSelector)
  const profileForm = useForm(profileRules, {
    dependencies: {
      currentPassword: ['newPassword'],
      newPassword: ['confirmPassword'],
    },
    initialValue: user,
  })

  const profileService = useQuery({
    queryFn: ({ params }) => userService.updateProfile(...params),
    enabled: false,
  })

  const changePasswordService = useQuery({
    queryFn: ({ params }) => userService.changePassword(...params),
    enabled: false,
  })

  async function onSubmit(ev) {
    ev.preventDefault()
    const isEqual = areObjectsEqual(user, profileForm.values, 'name', 'phone', 'birthday', 'gender')

    let avatar
    if (fileRef.current) {
      const response = await fileService.uploadFile(fileRef.current)

      if (response.success === true) {
        avatar = response.link
      }
    }

    if (Boolean(profileForm.values.newPassword) === false && isEqual === true && Boolean(avatar) === false) {
      toast.error('Nhập thông tin mới để cập nhật')
      return
    }

    if (profileForm.isValid() === true) {
      if (profileForm.values.newPassword) {
        changePasswordService
          .refetch({
            currentPassword: profileForm.values.currentPassword,
            newPassword: profileForm.values.newPassword,
          })
          .then(() => {
            profileForm.setValues({
              ...profileForm.values,
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            })
            toast.success('Thay đổi mật khẩu thành công')
          })
          .catch(handleError)
      }

      if (Boolean(avatar) === true || isEqual === false) {
        profileService
          .refetch({ ...profileForm.values, avatar })
          .then((response) => {
            dispatch(setUserAction(response?.data))
            fileRef.current = null
            toast.success('Cập nhật thông tin tài khoản thành công')
          })
          .catch(handleError)
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
                  <UploadImage onChange={(file) => (fileRef.current = file)}>
                    {(previewLink, trigger) => {
                      return (
                        <div className="profile-avatar">
                          <div className="wrap" onClick={trigger}>
                            <img src={previewLink || user.avatar || avatarDefault} />
                            <i className="icon">
                              <img src="./img/icons/icon-camera.svg" />
                            </i>
                          </div>
                        </div>
                      )
                    }}
                  </UploadImage>
                </div>
                {/* Full Name */}
                <div className="col-12">
                  <Field label="Họ và tên *" placeholder="Họ và tên của bạn" {...profileForm.register('name')} />
                </div>
                {/* Phone Number */}
                <div className="col-md-6">
                  <Field label="Số điện thoại" placeholder="Số điện thoại của bạn" {...profileForm.register('phone')} />
                </div>
                {/* Email */}
                <div className="col-md-6">
                  <Field
                    label="Địa chỉ Email"
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
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
                    autoComplete="current-password"
                    {...profileForm.register('currentPassword')}
                  />
                </div>
                {/* New Password */}
                <div className="col-12 col-md-6">
                  <Field
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Mật khẩu mới của bạn"
                    autoComplete="new-password"
                    {...profileForm.register('newPassword')}
                  />
                </div>
                {/* Confirm Password */}
                <div className="col-12 col-md-6">
                  <Field
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="Xác nhận lại mật khẩu của bạn"
                    autoComplete="new-password"
                    {...profileForm.register('confirmPassword')}
                  />
                </div>
                {/* Date of Birth */}
                <div className="col-12 col-lg-6">
                  <Field
                    label="Ngày sinh"
                    {...profileForm.register('birthday')}
                    renderField={({ value, onChange, ...props }) => (
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={value ? dayjs(value) : ''}
                        onChange={(_date, dateString) => {
                          const birthday = dayjs(dateString).format('DD/MM/YYYY')

                          return onChange?.(birthday === 'Invalid Date' ? '' : birthday)
                        }}
                        className="form-control form-control-sm transition-all hover:border-[#e5e5e5]"
                        {...props}
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  {/* Gender */}
                  <Field
                    label="Giới tính"
                    {...profileForm.register('gender')}
                    renderField={({ value, onChange }) => (
                      <div className="btn-group-toggle">
                        <Radio defaultValue={value} handleChangeRadio={(value) => onChange?.(value)}>
                          <Radio.Gender value="male">Nam</Radio.Gender>
                          <Radio.Gender value="female">Nữ</Radio.Gender>
                        </Radio>
                      </div>
                    )}
                  />
                </div>
                {/* Button */}
                <div className="col-12">
                  <Button
                    loading={
                      profileService.status === SERVICE_STATUS.pending ||
                      changePasswordService.status === SERVICE_STATUS.pending
                    }
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
