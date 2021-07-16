import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TileCard } from "../../Component/Card";
import api, { queryConfig } from "../../js/api";
import style from "../index.module.scss";

export default function Search() {
  const { search } = useParams();

  const { data: chapterData = [] } = useQuery(
    `${search}.search.chapter`,
    () => api.chapter.getBy({ search }),
    queryConfig
  );

  return (
    <section style={{ marginTop: "35px" }}>
      <div className={style.toggleSwitch}></div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Search Result</h1>
        </div>
        <div className="cards fullPage">
          {chapterData.map((chapter) => (
            <TileCard
              img={chapter.titleImg}
              label={chapter.title}
              to={{
                pathname: `/chapter/${chapter.id}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
