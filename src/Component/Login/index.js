import React from 'react'
import { googleLogin } from '../../js/firebase-auth';
import { ReactComponent as Google } from './google.svg';

export default function Login () {
  return (
    <Google onClick={googleLogin} />
  )
}