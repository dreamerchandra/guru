import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TileCard } from "../../Component/Card";
import api, { queryConfig } from "../../js/api";
import style from "../index.module.scss";

export default function Folder() {
  const { folderId } = useParams();

  const { data: chapterData = [] } = useQuery(
    `${folderId}.folder`,
    () => api.chapter.getBy({ folderId }),
    queryConfig
  );

  return (
    <section>
      <div className={style.toggleSwitch}></div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Folder</h1>
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
