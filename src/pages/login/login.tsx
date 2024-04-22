import { LoginForm } from '@/components/shared/form'

export default function Login() {
  return (
    <>
      <h1 className="medium-22 sm:medium-30 text-secondary1_dark3 mt-14">Hello Again!</h1>
      <p className="medium-14 sm:medium-15 mt-2.5 text-balance text-secondary-2">
        Welcome back to sign in. As a returning customer, you have access to your previously saved all information.
      </p>
      <LoginForm />
    </>
  )
}
