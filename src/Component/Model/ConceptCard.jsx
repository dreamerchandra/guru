import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Close } from "../../asserts/svg/close.svg";
import { MODEL, withModelListener } from "../../Hoc/Model";
import api from "../../js/api";
import Input from "../Input";
import Notification from "../Notification";

function ConceptCard({ hideModel, model: { info: modelInfo } }) {
  const {
    chapterId,
    title = "",
    imgUrl = null,
    description = "",
    cardId,
  } = modelInfo;

  const [fields, setFields] = useState({
    title,
    imgUrl,
    description,
  });

  const queryClient = useQueryClient();

  const createChapter = useMutation(api.cards.upsertConcept, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      hideModel();
      queryClient.invalidateQueries(`${chapterId}.cards`);
    },
    onError: (err) => {
      toast.dark(
        <Notification
          showSuccessIcon={false}
          text={`Failure due to error in ${err.code}`}
        />
      );
    },
  });

  const setField = (name) => (val) => {
    setFields((pre) => {
      const newState = typeof val === "function" ? val(pre[name]) : val;
      return {
        ...pre,
        [name]: newState,
      };
    });
  };

  return (
    <section className="modelHolder">
      <div className="header">
        <h1> Concept Card </h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <Input
          label="Title"
          type="text"
          value={fields.title}
          setValue={setField("title")}
        />
        <Input
          label="Description"
          type="text"
          value={fields.description}
          setValue={setField("description")}
        />
        <Input
          label="Image"
          type="file"
          value={fields.imgUrl}
          setValue={setField("imgUrl")}
          inputProps={{ accept: "image/*" }}
        />
      </div>
      <div className="footer">
        <button
          disabled={createChapter.isLoading}
          onClick={() => createChapter.mutate({ chapterId, fields, cardId })}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(ConceptCard, MODEL.CONCEPT_CARD);
