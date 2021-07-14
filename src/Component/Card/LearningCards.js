import React, { useState } from 'react'
import './index.scss'

export default function LearningCards ({
  img = '',
  label = '',
  description = '',
}) {

  const [flip, setFlip] = useState(false);
  return (
    <div className={`flip ${flip && 'flip-horizontal'}`} onClick={() => setFlip(!flip)}>
      <div className="front">
        <img src={img} alt={label} />
        <h1 className="text-shadow">{label.toUpperCase()}</h1>
      </div>
      <div className="back">
        <h2>{label}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}