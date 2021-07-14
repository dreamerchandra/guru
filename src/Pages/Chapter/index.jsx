import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api, { queryConfig } from "../../js/api";
import New from "../../Component/New";
import { MODEL, useModel } from "../../Hoc/Model";
import { LearningCards } from "../../Component/Card";
import Toggle from "../../Component/Toggle";
import style from "../index.module.scss";

export default function Chapter() {
  const { chapterId } = useParams();
  const { showModel } = useModel();

  const { data: cardData = [] } = useQuery(
    `${chapterId}.cards`,
    () => api.cards.get(chapterId),
    queryConfig
  );

  const [isQuestion, toggleCards] = useState(false);

  const filterByConcept = (card) => card.type === "concept";
  const filterByQuestion = (card) => card.type === "question";

  const onAdd = () => {
    if (isQuestion) {
      showModel(MODEL.QUESTION_CARD, { chapterId });
    } else {
      showModel(MODEL.CONCEPT_CARD, { chapterId });
    }
  };

  return (
    <section style={{ marginTop: "35px" }}>
      <div className={style.toggleSwitch}>
        <Toggle
          offLabel="Question"
          onLabel="Concept"
          toggle={isQuestion}
          onToggle={() => toggleCards(!isQuestion)}
        />
      </div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">{isQuestion ? "Questions" : "Concept"}</h1>
          <New onClick={onAdd} />
        </div>
        <div className="cards fullPage">
          {isQuestion
            ? cardData
                .filter(filterByQuestion)
                .map((card) => (
                  <LearningCards
                    key={card.id}
                    img={card.imgUrl}
                    label={card.title}
                    description={card.description}
                  />
                ))
            : cardData
                .filter(filterByConcept)
                .map((card) => (
                  <LearningCards
                    key={card.id}
                    img={card.imgUrl}
                    label={card.title}
                    description={card.description}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}
