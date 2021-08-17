import React, { useState } from "react";
import style from "./mcq.module.scss";
import { ReactComponent as EditIcon } from "../edit.svg";
import { MODEL, useModel } from "../../../Hoc/Model";
import { QUESTION_TYPE } from "../../Model/QuestionCard";

export default function McqCard({
  question,
  imgUrl,
  answerKey,
  options,
  id: cardId,
  chapterId,
}) {
  const quesLabel = question?.[0]?.label;
  const ansId = answerKey?.[0]?.answerId;

  const [optionId, setOptionId] = useState(null);
  const { showModel } = useModel();

  if (!ansId) return null;
  if (!quesLabel) return null;
  if (!Array.isArray(options) && options.length === 0) return null;

  const getClassName = (id) => {
    const hasAnySelected = optionId !== null;
    if (!hasAnySelected) return "";
    const isCurrentSelected = optionId === id;
    const isSelectionCorrect = optionId === ansId;
    if (isCurrentSelected && isSelectionCorrect) return style.correct;
    if (isCurrentSelected && !isSelectionCorrect) return style.wrong;
    return "";
  };

  return (
    <div className={style.mcq}>
      <div
        className={style.editWrapper}
        onClick={() =>
          showModel(MODEL.QUESTION_CARD, {
            options,
            imgUrl,
            quesLabel,
            ansId,
            cardId,
            chapterId,
            type: QUESTION_TYPE.MCQ,
          })
        }
      >
        <EditIcon />
      </div>
      {imgUrl && <img src={imgUrl} alt={quesLabel} />}
      <h2 className={imgUrl && `${style.shrink}`}>{quesLabel}</h2>
      <div className={`${style.choiceWrapper} ${imgUrl && `${style.shrink}`}`}>
        {options.map(({ id, label: ansLabel }) => (
          <button
            className={`${style.choice} ${getClassName(id)}`}
            onClick={() => setOptionId(id)}
            key={id}
          >
            {ansLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
