import React from "react";
import { ReactComponent as Add } from './add.svg';
import style from './index.module.scss'

export default function New ({ onClick = () => { }}) {
  return (
    <button className={style.add} onClick={onClick}>
      <Add />
    </button>
  );
}
