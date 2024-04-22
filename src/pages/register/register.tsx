import { RegisterForm } from '@/components/shared/form'

export default function Register() {
  return (
    <>
      <h1 className="medium-22 sm:medium-30 text-secondary1_dark3 mt-14">Sign Up</h1>
      <p className="medium-14 sm:medium-15 mt-2.5 text-balance text-secondary-2">
        Let's create your account and Shop like a pro and save money.
      </p>
      <RegisterForm />
    </>
  )
}
