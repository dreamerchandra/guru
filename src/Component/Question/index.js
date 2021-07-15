import React, { useState } from 'react'
import style from './index.module.scss'

export default function QuestionCard ({
  question,
  imgUrl,
  answerKey,
  options,
}) {
  const quesLabel = question?.[0]?.label;
  const ansId = answerKey?.[0]?.answerId;

  const [optionId, setOptionId] = useState(null);

  console.log({ quesLabel, ansId, options })

  if (!ansId) return null;
  if (!quesLabel) return null;
  if (!Array.isArray(options) && options.length === 0) return null;

  const getClassName = (id) => {
    const hasUserSelected = optionId !== null;
    if (!hasUserSelected) return '';
    const isCurrentSelected = optionId === id;
    const isSelectionCorrect = optionId === ansId;
    if (isCurrentSelected && isSelectionCorrect) return style.correct;
    if (isCurrentSelected && !isSelectionCorrect) return style.wrong;
    return '';
  }

  return (
    <div className={style.mcq}>
      {imgUrl && <img src={imgUrl} alt={quesLabel} />}
      <h2 className={imgUrl && `${style.shrink}`}>{quesLabel}</h2>
      <div className={`${style.choiceWrapper} ${imgUrl && `${style.shrink}`}`}>
        {
          options.map(
            ({ id, label: ansLabel }) => (
              <button className={`${style.choice} ${getClassName(id)}`} onClick={() => setOptionId(id)}>
                {ansLabel}
              </button>
            )
          )
        }
      </div>
    </div>
  )
}