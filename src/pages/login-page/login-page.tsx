import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoginForm } from '@/components/shared/form'

export default function LoginPage() {
  return (
    <>
      <h1 className="text-secondary1_dark3 mt-14 text-medium-22 sm:text-medium-30">Hello Again!</h1>
      <p className="mt-2.5 text-balance text-medium-14 text-secondary-2 sm:text-medium-15">
        Welcome back to sign in. As a returning customer, you have access to your previously saved all information.
      </p>
      <LoginForm />
      {/* Redirect link */}
      <div className="flex-center mt-14 justify-center gap-2.5 lg:mt-24">
        <span className="text-secondary2_dark3 text-regular-15 sm:text-regular-18">Don't have an account yet?</span>
        <Link to={PATH.REGISTER} className="focus-primary text-medium-15 text-primary-blue sm:text-medium-18">
          Sign Up
        </Link>
      </div>
    </>
  )
}
