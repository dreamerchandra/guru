import React from "react";
import { useQuery } from "react-query";
import { TileCard as Card } from "../../Component/Card";
import New from "../../Component/New";
import { MODEL, useModel } from "../../Hoc/Model";
import api, { queryConfig } from "../../js/api";

export default function Teacher() {
  const { showModel } = useModel();
  const { data: chapterData = [] } = useQuery(
    "my.chapter",
    api.chapter.getMine.bind(null, 20),
    queryConfig,
  );
  

  return (
    <section style={{ marginTop: "35px" }}>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Folders</h1>
          <New />
        </div>
        <div className="cards">
          <Card
            img="https://play-lh.googleusercontent.com/N0UxhBVUmx8s7y3F7Kqre2AcpXyPDKAp8nHjiPPoOONc_sfugHCYMjBpbUKCMlK_XUs=s180-rw"
            label="Hill top climbing"
          />
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
            />
          ))}
        </div>
      </div>
      <div className="cardsHolder">
        <div className="cardHeaderWrapper">
          <h1 className="cardHeader">Batches</h1>
          <New />
        </div>
        <div className="cards"></div>
      </div>
    </section>
  );
}
