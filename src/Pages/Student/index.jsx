import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { TileCard as Card } from "../../Component/Card";
import New from "../../Component/New";
import { MODEL, useModel } from "../../Hoc/Model";
import api, { queryConfig } from "../../js/api";
import folderIcon from "../../asserts/svg/folder.svg";

export default function Student() {
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
  
  const { data: userData = {}, isLoading } = useQuery(
    "my.user",
    api.user.getMine,
    queryConfig
  )

  useEffect(() => {
    if (isLoading) return;
    if (userData.category) return;
    console.log('userData not found show showing model to add category')
    showModel(MODEL.CHOOSE_CATEGORY)
  }, [userData, isLoading, showModel])

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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
