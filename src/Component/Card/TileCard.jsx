import React from "react";
import style from "./titleCard.module.scss";

const TileCard = ({ img, label, rating }) => {
  return (
    <a href="#" className={style.card}>
      <img src={img} alt={label}></img>
      <h6>{label}</h6>
    </a>
  );
};

export default TileCard;
