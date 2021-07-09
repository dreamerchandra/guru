import React from 'react'
import style from './index.module.scss'
import { ReactComponent as FilterIcon } from './filter.svg';


export default function Filter () {
  return (
    <div className={style.filter}>
      <FilterIcon />
    </div>
  )
}