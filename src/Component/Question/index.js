import React from 'react'
import style from './index.module.scss'

export default function Mcq ({
  img: imgProp, ques, choices: {
    options = []
  }, hardness
}) {

  if (!ques) return null;
  if (!Array.isArray(options) && options.length === 0) return null;

  return (
    <div className={style.mcq}>
      {imgProp && <img {...imgProp} />}
      <h2>{ques}</h2>
      <div className={style.choiceWrapper}>
        {
          options.map(
            ({ id, isAns, label }) => (
              <div className={style.choice}>
                <code></code>
                <h6>{label}</h6>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}