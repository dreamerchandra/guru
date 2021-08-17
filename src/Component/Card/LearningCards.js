import React, { useEffect, useState } from 'react';
import './learningCard.scss';
import { ReactComponent as EditIcon } from './edit.svg';
import { MODEL, useModel } from '../../Hoc/Model';
import More, { DefaultMore } from './more';

export default function LearningCards ({
  imgUrl = '',
  title = '',
  description = '',
  id: cardId,
  chapterId,
}) {

  const [flip, setFlip] = useState(false);
  const { showModel } = useModel();

  useEffect(() => {
    setFlip(false);
  }, [title])


  return (
    <div className={`flip ${flip && 'flip-vertical'}`} onClick={() => setFlip(!flip)}>
      <DefaultMore
        onDelete={() => showModel(MODEL.CONCEPT_CARD, { chapterId, title, imgUrl, description, cardId })}
        onEdit={() => showModel(MODEL.CONCEPT_CARD, { chapterId, title, imgUrl, description, cardId })}
      />
      <div className="front">
        {imgUrl && <img src={imgUrl} alt={title} />}
        <h1 className="text-shadow">{title.toUpperCase()}</h1>
      </div>

      <div className="back">
        <p>{description}</p>
      </div>

    </div>
  )
}