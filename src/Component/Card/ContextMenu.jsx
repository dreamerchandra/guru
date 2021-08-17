import React, { useState } from "react";
import style from "./contextMenu.module.scss";
import { ReactComponent as EditIcon } from "./edit.svg";
import { ReactComponent as DeleteIcon } from "./delete.svg";

export default function ContextMenu({ children, className }) {
  const [open, setOpen] = useState(false);

  /**
   *
   * @param {Event} e
   */
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  if (!children) return null;

  return (
    <div className={`${className} ${style.root}`}>
      <button
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
        className={`${open && style.active}`}
      >
        <code></code>
        <code></code>
        <code></code>
      </button>
      {open && <div className={style.optionWrapper}>{children}</div>}
    </div>
  );
}

export const DefaultMenu = ({ onEdit, onDelete, className}) => {
  return (
    <ContextMenu className={`more ${className}`}>
      {onEdit && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onEdit();
          }}
        >
          <span>Edit</span>
          <EditIcon />
        </div>
      )}
      {onDelete && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete();
          }}
        >
          <span>Delete</span>
          <DeleteIcon />
        </div>
      )}
    </ContextMenu>
  );
};
