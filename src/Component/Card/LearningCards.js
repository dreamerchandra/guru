import React, { useEffect, useState } from 'react';
import './index.scss';

export default function LearningCards ({
  imgUrl = '',
  title = '',
  description = '',
}) {

  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setFlip(false);
  }, [title])


  return (
    <div className={`flip ${flip && 'flip-horizontal'}`} onClick={() => setFlip(!flip)}>
      
      <div className="front">
        <img src={imgUrl} alt={title} />
        <h1 className="text-shadow">{title.toUpperCase()}</h1>
      </div>

      <div className="back">
        <p>{description}</p>
      </div>

    </div>
  )
}