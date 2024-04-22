import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchemaType, loginSchema } from '@/lib/schemas/auth.schema'
import { LockIcon, MessageIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading } from '@/components/shared/button'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  function onValid(data: LoginSchemaType) {
    console.log(data)
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
        <Link to={PATH.HOMEPAGE} className="medium-14 sm:medium-15 text-primary-blue">
          Forgot Password?
        </Link>
      </div>
      {/* Button */}
      <ButtonWithLoading className="medium-18 mt-12 h-12 rounded-[10px] bg-primary-yellow px-5 text-secondary-1">
        Login
      </ButtonWithLoading>
    </form>
  )
}
