import React from "react";
import { useQuery } from "react-query";
import { TileCard as Card } from "../../Component/Card";
import New from "../../Component/New";
import { MODEL, useModel } from "../../Hoc/Model";
import api, { queryConfig } from "../../js/api";
import folderIcon from "../../asserts/svg/folder.svg";

export default function Teacher() {
  const { showModel } = useModel();
  const { data: chapterData = [] } = useQuery(
    "my.chapter",
    api.chapter.getMine.bind(null, 20),
    queryConfig
  );
  const { data: folderData = [] } = useQuery(
    "my.folder",
    api.folder.getMine,
    queryConfig
  );
  const { data: batchData = [] } = useQuery(
    "my.batches",
    api.batch.getMine,
    queryConfig
  );

  return (
    <section>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Folders</h1>
          <New onClick={() => showModel(MODEL.FOLDER)} />
        </div>
        <div className="cards">
          {folderData.map((folder) => (
            <Card
              key={folder.id}
              img={folderIcon}
              label={folder.title}
              to={{
                pathname: `/folder/${folder.id}`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Chapter</h1>
          <New onClick={() => showModel(MODEL.CHAPTER)} />
        </div>
        <div className="cards">
          {chapterData.map((chapter) => (
            <Card
              key={chapter.id}
              img={chapter.titleImg}
              label={chapter.title}
              to={{
                pathname: `/chapter/${chapter.id}`,
              }}
              onEdit={() => {
                showModel(MODEL.CHAPTER, chapter);
              }}
            />
          ))}
        </div>
      </div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Batches</h1>
          <New onClick={() => showModel(MODEL.BATCHES)} />
        </div>
        <div className="cards">
          {batchData.map((batch) => (
            <Card key={batch.id} img={batch.imgUrl} label={batch.displayName} />
          ))}
        </div>
      </div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Acquaintances</h1>
          <New onClick={() => showModel(MODEL.WIND_UP_QUESTIONS)} />
        </div>
        <div className="cards">
          {batchData.map((batch) => (
            <Card key={batch.id} img={batch.imgUrl} label={batch.displayName} />
          ))}
        </div>
      </div>
    </section>
  );
}
