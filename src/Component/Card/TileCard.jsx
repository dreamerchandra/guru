import React from "react";
import { Link } from "react-router-dom";
import style from "./titleCard.module.scss";
import { DefaultMenu } from "./ContextMenu";

const TileCard = ({
  img,
  label,
  rating,
  onClick = () => {},
  to,
  onEdit = () => {},
}) => {

  return (
    <Link to={to} className={style.card} onClick={() => to || onClick()}>
      <DefaultMenu
        className={style.moreOption}
        onEdit={onEdit}
      />
      <div className={style.imgHolder}>
        {img && <img src={img} alt={label}></img>}
      </div>
      <h6>{label}</h6>
    </Link>
  );
};

export default TileCard;
