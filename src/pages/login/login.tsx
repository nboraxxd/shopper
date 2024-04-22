import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { LoginForm } from '@/components/shared/form'

export default function Login() {
  return (
    <>
      <h1 className="medium-22 sm:medium-30 text-secondary1_dark3 mt-14">Hello Again!</h1>
      <p className="medium-14 sm:medium-15 mt-2.5 text-balance text-secondary-2">
        Welcome back to sign in. As a returning customer, you have access to your previously saved all information.
      </p>
      <LoginForm />
      {/* Redirect link */}
      <div className="mt-14 justify-center gap-2.5 flex-center lg:mt-24">
        <span className="regular-15 sm:regular-18 text-secondary2_dark3">Don't have an account yet?</span>
        <Link to={PATH.REGISTER} className="medium-15 sm:medium-18 focus-primary text-primary-blue">
          Sign Up
        </Link>
      </div>
    </>
  )
}
