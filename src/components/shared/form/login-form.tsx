import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

import { LockIcon, MessageIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading } from '@/components/shared/button'

export default function LoginForm() {
  return (
    <form className="mt-14 flex w-full flex-col">
      {/* Email */}
      <AuthInput Icon={MessageIcon} type="email" autoFocus placeholder="Email" autoComplete="email" />
      {/* Password */}
      <AuthInput Icon={LockIcon} type="password" placeholder="Password" autoComplete="new-password" />
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
      {/* Redirect link */}
      <div className="mt-28 justify-center gap-2.5 flex-center">
        <span className="regular-15 sm:regular-18 text-secondary2_dark3">Don't have an account yet?</span>
        <Link to={PATH.REGISTER} className="medium-15 sm:medium-18 focus-primary text-primary-blue">
          Sign Up
        </Link>
      </div>
    </form>
  )
}
