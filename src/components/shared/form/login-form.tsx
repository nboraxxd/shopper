import { useEffect } from 'react'
import { toast } from 'sonner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorResponse } from '@/types'
import { PATH } from '@/constants/path'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { isAxiosBadRequestError, isAxiosForbiddenError } from '@/utils/error'
import { useAuthStore } from '@/stores/auth-store'
import { useLogin, useLoginByCode } from '@/lib/react-query/queries-and-mutations'
import { LoginSchemaType, loginSchema } from '@/lib/schemas/auth.schema'
import { LockIcon, MessageIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading } from '@/components/shared/button'

export default function LoginForm() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const navigate = useNavigate()

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const loginMutation = useLogin()

  const loginByCodeMutation = useLoginByCode()

  useEffect(() => {
    if (code) {
      loginByCodeMutation.mutate(code, {
        onSuccess: () => {
          setIsAuthenticated(true)
          navigate(PATH.HOMEPAGE)
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse<{ code: string }>>(error)) {
            toast.error(error.response!.data.detail?.code)
          } else if (isAxiosForbiddenError<ErrorResponse>(error)) {
            toast.error(error.response!.data.message)
          }
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  function onValid(data: LoginSchemaType) {
    const { username, password } = data

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          setIsAuthenticated(true)
          navigate(PATH.HOMEPAGE)
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse<LoginSchemaType>>(error)) {
            const isValidateError = error.response?.data.error === VALIDATION_MESSAGES.ERROR
            const formErrors = error.response?.data.detail

            if (isValidateError && formErrors) {
              Object.keys(formErrors).forEach((key) => {
                const formError = formErrors[key as keyof typeof formErrors]
                setError(key as keyof LoginSchemaType, {
                  type: 'server',
                  message: formError,
                })
              })
            }
          } else if (isAxiosForbiddenError<ErrorResponse>(error)) {
            setError('username', {
              type: 'server',
              message: error.response!.data.message,
            })
          }
        },
      }
    )
  }

  return (
    <form className="mt-8 flex w-full flex-col lg:mt-14" onSubmit={handleSubmit(onValid)}>
      {/* Email */}
      <AuthInput
        register={register('username')}
        errorMessage={errors.username?.message}
        Icon={MessageIcon}
        type="email"
        autoFocus
        placeholder="Email"
        autoComplete="email"
      />
      {/* Password */}
      <AuthInput
        register={register('password')}
        errorMessage={errors.password?.message}
        Icon={LockIcon}
        type="password"
        placeholder="Password"
        autoComplete="new-password"
      />
      <div className="justify-between flex-center">
        {/* Remember */}
        <label className="gap-2.5 flex-center">
          <input type="checkbox" className="size-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
          <span className="regular-14 sm:medium-15 text-secondary2_dark3">Remember me</span>
        </label>
        {/* Forgot Password */}
        {/* TODO: Update `to` prop */}
        <Link to={PATH.HOMEPAGE} className="medium-14 sm:medium-15 focus-primary text-primary-blue">
          Forgot Password?
        </Link>
      </div>
      {/* Button */}
      <ButtonWithLoading
        buttonClassName="medium-18 mt-12 h-12 rounded-[10px] bg-primary-yellow px-5 text-secondary-1 transition-opacity hover:opacity-85"
        isLoading={loginMutation.isPending}
      >
        Login
      </ButtonWithLoading>
    </form>
  )
}
