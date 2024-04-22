import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

import { LockIcon, MessageIcon } from '@/components/icons'
import { AuthInput } from '@/components/shared/input'
import { ButtonWithLoading } from '@/components/shared/button'

export default function RegisterForm() {
  return (
    <form className="mt-14 flex w-full flex-col">
      {/* Email */}
      <AuthInput Icon={MessageIcon} type="email" autoFocus placeholder="Email" autoComplete="email" />
      {/* Password */}
      <AuthInput Icon={LockIcon} type="password" placeholder="Password" autoComplete="new-password" />
      {/* Confirm Password */}
      <AuthInput Icon={LockIcon} type="password" placeholder="Confirm Password" autoComplete="new-password" />
      {/* Button */}
      <ButtonWithLoading className="medium-18 mt-5 h-12 rounded-[10px] bg-primary-yellow px-5 text-secondary-1">
        Sign Up
      </ButtonWithLoading>
      {/* Redirect link */}
      <div className="mt-28 justify-center gap-2.5 flex-center">
        <span className="regular-15 sm:regular-18 text-secondary2_dark3">You have an account yet?</span>
        <Link to={PATH.LOGIN} className="medium-15 sm:medium-18 focus-primary text-primary-blue">
          Sign In
        </Link>
      </div>
    </form>
  )
}
