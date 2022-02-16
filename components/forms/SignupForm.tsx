import React from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { SignupParams } from '@/lib/next-hook-auth'

type Props = {
  signup: (SignupParams) => void
}

const SignupForm: React.FC<Props> = ({ signup }) => {
  const { register, handleSubmit, errors } = useForm()
  const { addToast } = useToasts()

  const onSubmit = async (params: SigninParams) => {
    try {
      console.log("SigninForm.onSubmit()")
      await signup(params)
      addToast('Sign in Successfully', { appearance: 'success' })
    } catch (e) {
      console.log("SigninForm.onSubmit() false")
      addToast('Please reconfirm your input', { appearance: 'error' })
    }
  }
  const onError = () => {
    addToast('Please reconfirm your input', { appearance: 'error' })
  }

  return (
    <form
      className="mt-8 space-y-6"
      action="#"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            ref={register({ required: true })}
          />
          {errors.emailRequired && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.passwordRequired && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password_confirmation" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password_confirmation"
            type="password"
            autoComplete="current-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            ref={register({ required: true })}
          />
          {errors.passwordRequired && <span>This field is required</span>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-6 rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:ring-2"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SignupForm
