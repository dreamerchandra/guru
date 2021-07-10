import React from "react";
import { TileCard as Card } from "../../Component/Card";
import New from "../../Component/New";
import { MODEL, useModel } from "../../Hoc/Model";

export default function Teacher() {
  const { showModel } = useModel();

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
        <div className="cards"></div>
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
