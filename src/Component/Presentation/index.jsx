import React, { useEffect, useState } from "react";
import style from "./index.module.scss";

export default function Presentation({ cards, fetchMore, Component, isMore, chapterId }) {
  const firstID = cards[0]?.id;
  const [currentId, setCurrentId] = useState(firstID);

  // when first id is changed it means the whole card desk has been change.
  // Typically while user switching between concept and question.
  useEffect(() => {
    setCurrentId(firstID);
  }, [firstID]);

  // fetch more logic. Kinda infinite scroll
  // When we have shown 80% of cards then we need to fetch more
  const totalCards = cards.length;
  const currentIndex = cards.findIndex(({ id }) => id === currentId);
  const percentLeftToShow = (currentIndex / totalCards) * 100;
  const THRESHOLD_PERCENT_FOR_FETCHING_MORE = 80;
  const shouldFetchMore =
    percentLeftToShow >= THRESHOLD_PERCENT_FOR_FETCHING_MORE;

  useEffect(() => {
    if (!shouldFetchMore) return;
    if (!isMore) return;
    fetchMore();
  }, [shouldFetchMore, fetchMore, isMore]);

  // back, next button logic when. Based on current index we will show next card or pre card
  const isNextAvailable = currentIndex !== totalCards - 1;
  const isBackAvailable = currentIndex !== 0;
  const nextID = isNextAvailable ? cards[currentIndex + 1]?.id : currentId;
  const preId = isBackAvailable ? cards[currentIndex - 1]?.id : currentId;
  const displayCard = cards.find(({ id }) => id === currentId);

  if (cards.length === 0) return null;

  return (
    <section className={style.root}>
      <div>
        <Component {...displayCard} chapterId={chapterId}/>
      </div>

      <div className={style.control}>
        <button disabled={!isBackAvailable} onClick={() => setCurrentId(preId)}>
          Back
        </button>
        <button
          disabled={!isNextAvailable}
          onClick={() => setCurrentId(nextID)}
        >
          Next
        </button>
      </div>

      <div className={style.miniBarWrapper}>
        {cards.map((card, idx) => (
          <div
            className={`
            ${style.miniBar}
             ${card.id === currentId && style.active}`}
            onClick={() => setCurrentId(card.id)}
            key={card.id}
          >
            {card.imgUrl && <img src={card.imgUrl} alt="Mini Selection" />}
            {!card.imgUrl && idx + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
