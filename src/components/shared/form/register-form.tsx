import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorResponse } from '@/types'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { cn } from '@/utils'
import { isAxiosBadRequestError } from '@/utils/error'
import { useRegister, useResendEmail } from '@/lib/react-query/queries-and-mutations'
import { RegisterSchemaType, registerSchema } from '@/lib/schemas/auth.schema'
import { LockIcon, MessageIcon, ProfileIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading, CountdownButton } from '@/components/shared/button'
import { SucssessAlert } from '@/components/auth/alerts'

export default function RegisterForm() {
  const [isWaiting, setIsWaiting] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', username: '', password: '', confirmPassword: '' },
  })

  const registerMutation = useRegister()

  const resendEmailMutation = useResendEmail()

  function onValid(data: RegisterSchemaType) {
    const { name, username, password } = data

    registerMutation.mutate(
      { name, username, password },
      {
        onSuccess: () => {
          setIsWaiting(true)
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse<Omit<RegisterSchemaType, 'confirmPassword'>>>(error)) {
            const isValidateError = error.response?.data.error === VALIDATION_MESSAGES.ERROR
            const formErrors = error.response?.data.detail

            if (isValidateError && formErrors) {
              Object.keys(formErrors).forEach((key) => {
                const formError = formErrors[key as keyof typeof formErrors]
                setError(key as keyof Omit<RegisterSchemaType, 'confirmPassword'>, {
                  type: 'server',
                  message: formError,
                })
              })
            } else {
              setError('username', {
                type: 'server',
                message: error.response!.data.message,
              })
            }
          }
        },
      }
    )
  }

  function handleResendEmail() {
    setIsWaiting(false)

    resendEmailMutation.mutate(getValues('username'), {
      onSuccess: (response) => {
        toast.success(response.data.message)
        setIsWaiting(true)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse>(error)) {
          toast.error(error.response!.data.message)
        }
      },
    })
  }

  return (
    <>
      {registerMutation.isSuccess && (
        <SucssessAlert className="mt-8 lg:mt-14">{registerMutation.data.data.message}</SucssessAlert>
      )}
      <form
        className={cn('mt-8 flex w-full flex-col lg:mt-14', { 'mt-7 lg:mt-7': registerMutation.isSuccess })}
        onSubmit={handleSubmit(onValid)}
      >
        {/* Name */}
        <AuthInput
          register={register('name')}
          errorMessage={errors.name?.message}
          Icon={ProfileIcon}
          type="text"
          autoFocus
          placeholder="Name"
          autoComplete="name"
        />
        {/* Email */}
        <AuthInput
          register={register('username')}
          errorMessage={errors.username?.message}
          Icon={MessageIcon}
          type="email"
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
        {/* Confirm Password */}
        <AuthInput
          register={register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          Icon={LockIcon}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
        {/* Button */}
        {registerMutation.isSuccess ? (
          <CountdownButton
            className="medium-18 mt-5 h-12 rounded-[10px] bg-primary-yellow px-5 text-secondary-1 transition-opacity hover:opacity-85 disabled:bg-primary-yellow/50 disabled:opacity-100"
            type="button"
            timer={60}
            onClick={handleResendEmail}
            isLoading={resendEmailMutation.isPending}
            triggerCountdown={isWaiting}
          >
            Resend email
          </CountdownButton>
        ) : (
          <ButtonWithLoading
            className="medium-18 mt-5 h-12 rounded-[10px] bg-primary-yellow px-5 text-secondary-1 transition-opacity hover:opacity-85"
            isLoading={registerMutation.isPending}
          >
            Sign Up
          </ButtonWithLoading>
        )}
      </form>
    </>
  )
}
