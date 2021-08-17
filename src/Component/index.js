import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import UserRole from '../js/user-role'
import Header from './Header'
import style from './index.module.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import Model from './Model'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App ({ children }) {

  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    if (!user) return
    UserRole.updateRole()
  }, [user])

  return (
    <>
      <div className={style.root}>
        <Header />
        <Model />
        <ReactQueryDevtools initialIsOpen={false} />
        <div className={style.body}>{children}</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}