import { toast } from 'sonner'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useSearchParams } from 'react-router-dom'

import { ErrorResponse } from '@/types'
import { PATH } from '@/constants/path'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { isAxiosBadRequestError, isAxiosForbiddenError } from '@/utils/error'
import { useAuthStore } from '@/stores/auth-store'
import { useLogin, useLoginByCode } from '@/lib/react-query'
import { LoginSchemaType, loginSchema } from '@/lib/schemas/auth.schema'
import { LockIcon, MessageIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading } from '@/components/shared/button'

export default function LoginForm() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const loginByCodeRef = useRef<unknown>(null)

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

  const { mutateAsync: loginByCodeMutateAsync } = useLoginByCode()

  useEffect(() => {
    if (!code || loginByCodeRef.current !== null) return
    ;(async () => {
      loginByCodeRef.current = loginByCodeMutateAsync

      try {
        await loginByCodeMutateAsync(code)
        setIsAuthenticated(true)
        setTimeout(() => {
          loginByCodeRef.current = null
        }, 10000)
      } catch (error) {
        if (isAxiosBadRequestError<ErrorResponse<{ code: string }>>(error)) {
          toast.error(error.response!.data.detail?.code)
        } else if (isAxiosForbiddenError<ErrorResponse>(error)) {
          toast.error(error.response!.data.message)
        }
      }
    })()
  }, [code, loginByCodeMutateAsync, setIsAuthenticated])

  function onValid(data: LoginSchemaType) {
    const { username, password } = data

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => setIsAuthenticated(true),
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
      <div className="flex-center justify-between">
        {/* Remember */}
        <label className="flex-center gap-2.5">
          <input type="checkbox" className="size-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue" />
          <span className="text-secondary2_dark3 text-regular-14 sm:text-medium-15">Remember me</span>
        </label>
        {/* Forgot Password */}
        {/* TODO: Update `to` prop */}
        <Link to={PATH.HOMEPAGE} className="focus-primary text-medium-14 text-primary-blue sm:text-medium-15">
          Forgot Password?
        </Link>
      </div>
      {/* Button */}
      <ButtonWithLoading
        buttonClassName="mt-12 h-12 rounded-xl bg-primary-yellow px-5 text-medium-18 text-secondary-1 transition-opacity hover:opacity-85"
        isLoading={loginMutation.isPending}
      >
        Login
      </ButtonWithLoading>
    </form>
  )
}
