import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import { MODEL, useModel, withModelListener } from "../../../Hoc/Model";
import api, { paginate } from "../../../js/api";
import Input from "../../Input";
import Notification from "../../Notification";

function QuestionCard({ hideModel }) {
  const { showModel } = useModel();

  const [fields, setFields] = useState({
    title: "",
    type: "",
    imgUrl: null,
    question: [],
    options: [],
    answerKey: [],
    description: "",
  });

  const queryClient = useQueryClient();

  const createChapter = useMutation(api.cards.create, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      hideModel();
      paginate.chapter.invalidateLastPage();
      queryClient.invalidateQueries("my.chapter");
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
        <h1>
          New
          <button onClick={() => showModel(MODEL.CONCEPT_CARD)}> {'<'} Question</button>
          Card
        </h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <Input
          label="Title"
          type="text"
          clips={fields.tag}
          setClips={setField("tag")}
        />
      </div>
      <div className="footer">
        <button
          disabled={createChapter.isLoading}
          onClick={() => createChapter.mutate(fields)}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(QuestionCard, MODEL.QUESTION_CARD);
