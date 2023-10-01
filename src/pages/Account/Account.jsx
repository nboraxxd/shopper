import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { PATH } from '@/config'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useBodyClass from '@/hooks/useBodyClass'
import useForm from '@/hooks/useForm'
import useQuery from '@/hooks/useQuery'
import useSearchParamsObj from '@/hooks/useSearchParamsObj'
import { userService } from '@/services/user.service'
import { loginAction, loginByCodeAction } from '@/stores/authSlice'
import { authSelector } from '@/stores/selector'
import { copyToClipboard, handleError, confirm, max, min, regexp, required } from '@/utils'
import { message } from 'antd'
import omit from 'lodash/omit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

export default function Account() {
  useBodyClass('bg-light')
  const { code } = useSearchParamsObj()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loginService = useSelector(authSelector)

  const registerForm = useForm(
    {
      name: [required('Vui lòng nhập họ tên của bạn')],
      username: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
      password: [
        required('Vui lòng nhập mật khẩu của bạn'),
        min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
        max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
      ],
      confirmPassword: [
        required('Vui lòng nhập lại mật khẩu của bạn'),
        confirm('password', 'Các mật khẩu đã nhập chưa khớp với nhau'),
      ],
    },
    {
      dependencies: {
        // Tức là confirmPassword sẽ phụ thuộc vào password. Khi password thay đổi thì validate lại confirm password
        password: ['confirmPassword'],
      },
    },
  )

  const loginForm = useForm({
    username: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    password: [
      required('Vui lòng nhập mật khẩu của bạn'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    ],
  })

  useEffect(() => {
    if (Boolean(code) === true) {
      dispatch(loginByCodeAction(code))
      navigate(PATH.homePage)
    }
  }, [code, dispatch, navigate])

  const registerService = useQuery({
    queryFn: () =>
      userService.register({ ...omit(registerForm.values, ['confirmPassword']), redirect: window.location.href }),
    enabled: false,
    limitDuration: 1000,
  })

  async function handleOnRegister(ev) {
    ev.preventDefault()
    if (registerForm.isValid() === true) {
      try {
        const response = await registerService.refetch()
        if (response.success === true) {
          toast.success(response.message)
        }
      } catch (err) {
        handleError(err)
      }
    }
  }

  async function handleOnLogin(ev) {
    ev.preventDefault()
    if (loginForm.isValid() === true) {
      try {
        await dispatch(loginAction(loginForm.values)).unwrap()
      } catch (err) {
        handleError(err)
      }
    }
  }

  function _copyToClipboard(ev) {
    copyToClipboard(ev.target.innerText)
    message.info('Copied')
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="card card-lg mb-md-0 mb-10">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Returning Customer</h6>
                {/* Form */}
                <form noValidate onSubmit={handleOnLogin}>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        type="email"
                        placeholder="Email Address *"
                        autoComplete="email"
                        {...loginForm.register('username')}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        type="password"
                        placeholder="Password *"
                        autoComplete="current-password"
                        {...loginForm.register('password')}
                      />
                    </div>
                    <div className="col-12 col-md">
                      {/* // TODO: Handle remember me feature later */}
                      {/* Remember */}
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" id="loginRemember" type="checkbox" />
                          <label className="custom-control-label" htmlFor="loginRemember">
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="form-group">
                        <a className="font-size-sm text-reset" data-toggle="modal" href="#modalPasswordReset">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button loading={loginService.status === SERVICE_STATUS.pending}>Sign In</Button>
                    </div>
                    <div className="col-12">
                      <p className="font-size-sm text-muted mb-2 mt-5 font-light">
                        Tài khoản demo:{' '}
                        <b className="text-black">
                          <span
                            className="cursor-pointer underline underline-offset-1"
                            title="email"
                            onClick={_copyToClipboard}
                          >
                            demo@spacedev.com
                          </span>{' '}
                          /{' '}
                          <span
                            className="cursor-pointer underline underline-offset-1"
                            title="password"
                            onClick={_copyToClipboard}
                          >
                            Spacedev@123
                          </span>
                        </b>
                      </p>
                      <p className="font-size-sm text-muted mb-2 mt-5 text-justify font-light">
                        Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích học tập, để đảm bảo những người khác có
                        thể sử dụng chung tài khoản chúng tôi sẽ hạn chế rất nhiều quyền trên tài khoản này ví dụ:{' '}
                        <br />
                        - Không thay đổi thông tin cá nhân, mật khẩu <br />
                        - không reset password,... <br />
                        <br />
                        Để có thể sử dụng toàn bộ chức năng trên website, vui lòng tiến hành{' '}
                        <b className="text-black">đăng ký</b> bằng tài khoản email có thật
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            {/* Card */}
            <div className="card card-lg">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">New Customer</h6>
                {/* Form */}
                <form onSubmit={handleOnRegister} noValidate>
                  <div className="row">
                    <div className="col-12">
                      {/* Full Name */}
                      <Field placeholder="Full Name *" {...registerForm.register('name')} />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        type="email"
                        placeholder="Email Address *"
                        autoComplete="email"
                        {...registerForm.register('username')}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        type="password"
                        placeholder="Password *"
                        autoComplete="new-password"
                        {...registerForm.register('password')}
                      />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field
                        type="password"
                        placeholder="Confirm Password *"
                        autoComplete="new-password"
                        {...registerForm.register('confirmPassword')}
                      />
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Link */}
                      <div className="form-group font-size-sm text-muted font-light">
                        By registering your details, you agree with our Terms &amp; Conditions, and Privacy and Cookie
                        Policy.
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Button */}
                      <Button loading={registerService.status === SERVICE_STATUS.pending}>Register</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
