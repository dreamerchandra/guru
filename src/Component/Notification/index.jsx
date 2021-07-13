import React from "react";
import style from "./index.module.scss";
import Tick from "./tick.png";
import Wrong from "./wrong.png";

export default function Notification({ text, showSuccessIcon }) {
  return (
    <div className="notification-wrapper">
      <div className={style.notification}>
        <img src={showSuccessIcon ? Tick : Wrong} alt="" />
        <p>{text}</p>
      </div>
    </div>
  );
}
