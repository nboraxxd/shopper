import { Button } from '@/components/Button'
import { Field } from '@/components/Field'
import { SERVICE_STATUS } from '@/config/serviceStatus'
import useBodyClass from '@/hooks/useBodyClass'
import useForm from '@/hooks/useForm'
import useQuery from '@/hooks/useQuery'
import { userService } from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import { confirm, max, min, regexp, required } from '@/utils/validate'
import omit from 'lodash/omit'
import { toast } from 'sonner'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

export default function Account() {
  useBodyClass('bg-light')

  const { isValid, register, values } = useForm({
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
  })

  const registerService = useQuery({
    queryFn: () => userService.register({ ...omit(values, ['confirmPassword']), redirect: window.location.href }),
    enabled: false,
  })

  async function handleOnRegister(ev) {
    ev.preventDefault()
    if (isValid() === true) {
      try {
        const response = await registerService.refetch()
        console.log('🔥 ~ handleOnRegister ~ response:', response)
        if (response.success === true) {
          toast.success(response.message)
        }
      } catch (err) {
        handleError(err)
      }
    }
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
                <form noValidate>
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field type="email" placeholder="Email Address *" />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field type="password" placeholder="Password *" />
                    </div>
                    <div className="col-12 col-md">
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
                      <Button>Sign In</Button>
                    </div>
                    <div className="col-12">
                      <p className="font-size-sm text-muted mb-2 mt-5 font-light">
                        Tài khoản demo: <b className="text-black">demo@spacedev.com / Spacedev@123</b>
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
                      <Field placeholder="Full Name *" {...register('name')} />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field type="email" placeholder="Email Address *" {...register('username')} />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field type="password" placeholder="Password *" {...register('password')} />
                    </div>
                    <div className="col-12">
                      {/* Password */}
                      <Field type="password" placeholder="Confirm Password *" {...register('confirmPassword')} />
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
