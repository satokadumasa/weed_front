import React, { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios'
import useSWR, { mutate } from 'swr'
import customAxios from '../../lib/customAxios'

export type Props = {
  currentUserPath: string
  signinPath: string
  signoutPath: string
  redirectPath: string
  resourceName: string
}

export type AuthContext = {
  config: Props
}

export const AuthContext = createContext<AuthContext>({
  config: {
    currentUserPath: '',
    signinPath: '',
    signoutPath: '',
    redirectPath: '',
    resourceName: 'user',
  },
})
                                                                                                                                          
export const AuthProvider: React.FC<Props> = (props) => {
  console.log("AuthProvider()")
  const context: AuthContext = {
    config: {
      currentUserPath: props.currentUserPath,
      signinPath: props.signinPath,
      signoutPath: props.signoutPath,
      redirectPath: props.redirectPath,
      resourceName: props.resourceName,
    },
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}

export type SigninParams = {
  email: string
  password: string
}

export const useSignin = () => {
  console.log("useSignin()")
  const context = useContext(AuthContext)
  return async (params: SigninParams) => {
    const signinParams = {}
    signinParams[context.config.resourceName] = params
    // await axios.post(context.config.signinPath, signinParams)
    await axios.post(context.config.signinPath, params).then((res) => {
      console.log("access-token:" + res.headers['access-token'])
      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers['client']);
      localStorage.setItem('uid', res.headers['uid']);
    })
    await mutate(context.config.currentUserPath)
  }
}

export const useSignout = () => {
  console.log("useSignout()")
  const context = useContext(AuthContext)
  return async () => {
    await axios.get(context.config.currentUserPath)
    await axios.delete(context.config.signoutPath)
    localStorage.setItem('next-hook-auth', 'signout')
    await mutate(context.config.currentUserPath)
  }
}

export type User = {
  id: number
  createdAt: string
  updatedAt: string
}

export const useAuth = (redirect = false) => {
  console.log("useAuth()")
  const context = useContext(AuthContext)
  const fetcher = () => {
    console.log("access-token:" + localStorage.getItem('access-token'))
    if (localStorage.getItem('access-token') == 'undefined') {
      console.log("useAuth() fails")
      throw Error('Unauthorized')
    }
    return customAxios.get(context.config.currentUserPath).then((res) => {
      console.log("authorized.")
      return res.data
    })
  }
  console.log("useAuth() CH-01")
  const { data, error } = useSWR(context.config.currentUserPath, fetcher)
  const router = useRouter()
  console.log("useAuth() CH-02")

  useEffect(() => {
    console.log("useAuth() CH-03")
    if (error && redirect) router.push(context.config.redirectPath)
  }, [data, error])
  console.log("useAuth() CH-04")

  return {
    currentUser: !error && data,
    loading: (!error && !data) || (redirect && !data),
  }
}
