import React from 'react'
import Login from '../Login'
import style from './index.module.scss';

export default function Header () {
  return (
    <header className={style.header}>

      <a href="/"><h1>Guru</h1></a>

      <nav>
        <a href="/contact">Contact Us</a>
        <Login />
      </nav>

    </header>
  )
}