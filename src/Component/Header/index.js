import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Login from '../Login'
import Search from '../Search';
import style from './index.module.scss';

export default function Header () {
  const [val, setVal] = useState('')
  const history = useHistory();
  const [pathBeforeSearch, setPath] = useState('');

  useEffect(() => {
    if (val.length < 4) {
      if (history.location.pathname.startsWith('/search')) {
        history.push(pathBeforeSearch);
      }
      return;
    }

    if (!history.location.pathname.startsWith('/search')) {
      setPath(history.location.pathname);
    }
    history.push(`/search/${val}`)

  }, [val, history])

  return (
    <header className={style.header}>

      <a href="/"><h1>Guru</h1></a>

      <nav>
        <Search val={val} setVal={setVal} />
        <a href="/contact">Contact Us</a>
        <Login />
      </nav>

    </header>
  )
}