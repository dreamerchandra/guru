import React, { useState } from "react";
import "./index.scss";

// https://codepen.io/Mr_Rahul_Tiwari/pen/ZEWMZNV
export default function Toggle({ onLabel, offLabel, onToggle, toggle }) {
  return (
    <div className="toggle-button-cover">
      <div className="button-cover">
        <div className="button r" id="button-6">
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => onToggle(e.target.value)}
            checked={toggle}
          />
          <div className="knobs" data-on={onLabel} data-off={offLabel}></div>
          <div className="layer"></div>
        </div>
      </div>
    </div>
  );
}
