import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import UserRole from '../js/user-role'
import Header from './Header'
import style from './index.module.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import Model from './New/Model'

export default function App ({ children }) {

  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    if (!user) return
    UserRole.updateRole()
  }, [user])

  return (
    <div className={style.root}>
      <Header />
      <Model />
      <div className={style.body}>{children}</div>
    </div>
  )
}