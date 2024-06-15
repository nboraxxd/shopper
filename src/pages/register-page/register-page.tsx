import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { RegisterForm } from '@/components/shared/form'

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-secondary1_dark3 mt-14 text-medium-22 sm:text-medium-30">Sign Up</h1>
      <p className="mt-2.5 text-balance text-medium-14 text-secondary-2 sm:text-medium-15">
        Let's create your account and Shop like a pro and save money.
      </p>
      <RegisterForm />
      {/* Redirect link */}
      <div className="flex-center mt-14 justify-center gap-2.5 lg:mt-24">
        <span className="text-secondary2_dark3 text-regular-15 sm:text-regular-18">You have an account yet?</span>
        <Link to={PATH.LOGIN} className="focus-primary text-medium-15 text-primary-blue sm:text-medium-18">
          Sign In
        </Link>
      </div>
    </>
  )
}
