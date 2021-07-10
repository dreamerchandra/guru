import React from "react";
import { ReactComponent as Close } from "../../asserts/svg/close.svg";
import style from "./index.module.scss";

export default function Clip({ label, onDelete }) {
  return (
    <div className={style.root}>
      <div className={style.clip}>
        <p>{label}</p>
        <Close onClick={() => onDelete(label)} />
      </div>
    </div>
  );
}
