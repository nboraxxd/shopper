import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { RegisterForm } from '@/components/shared/form'

export default function Register() {
  return (
    <>
      <h1 className="medium-22 sm:medium-30 text-secondary1_dark3 mt-14">Sign Up</h1>
      <p className="medium-14 sm:medium-15 mt-2.5 text-balance text-secondary-2">
        Let's create your account and Shop like a pro and save money.
      </p>
      <RegisterForm />
      {/* Redirect link */}
      <div className="mt-14 justify-center gap-2.5 flex-center lg:mt-24">
        <span className="regular-15 sm:regular-18 text-secondary2_dark3">You have an account yet?</span>
        <Link to={PATH.LOGIN} className="medium-15 sm:medium-18 focus-primary text-primary-blue">
          Sign In
        </Link>
      </div>
    </>
  )
}
