import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../../../js/api";
import Input from "../../../Input";
import InputClip from "../../../../Component/ClipInput";
import Notification from "../../../Notification";
import { getUuid, InternalError } from "../../../../js/helper";
import style from "./index.module.scss";

const McqOptions = ({ options, highlightLabel, onClick }) => {
  return (
    <div className={style.mcqOptionWrapper}>
      {options.map((option) => (
        <button
          key={option}
          className={`${option === highlightLabel && `${style.selected}`}`}
          onClick={() => onClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const transformData = (fields) => {
  const questionId = getUuid();
  const question = [
    {
      id: questionId,
      label: fields.question,
    },
  ];
  const options = fields.options.map((option) => ({
    id: getUuid(),
    label: option,
  }));
  const answer = options.find(({ label }) => label === fields.answerKey);
  const answerKey = [
    {
      questionId,
      answerId: answer?.id,
    },
  ];

  return {
    question,
    options,
    answerKey,
    imgUrl: fields.imgUrl,
  };
};

export default function Mcq({ hideModel, model: { info: modelInfo } }) {
  const [fields, setFields] = useState({
    question: "",
    options: [],
    answerKey: "",
    questionId: getUuid(),
    imgUrl: null,
  });

  const queryClient = useQueryClient();

  const createMcq = useMutation(api.cards.createMcq, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      hideModel();
      queryClient.invalidateQueries(`${modelInfo.chapterId}.cards`);
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
    <>
      <div className="body">
        <Input
          label="Question"
          type="text"
          value={fields.question}
          setValue={setField("question")}
        />
        <Input
          label="Image"
          type="file"
          value={fields.imgUrl}
          setValue={setField("imgUrl")}
        />
        <InputClip
          label="Options"
          type="text"
          clips={fields.options}
          setClips={setField("options")}
        />
        <McqOptions
          options={fields.options}
          onClick={setField("answerKey")}
          highlightLabel={fields.answerKey}
        />
      </div>
      <div className="footer">
        <button
          disabled={createMcq.isLoading}
          onClick={() =>
            createMcq.mutate({
              chapterId: modelInfo.chapterId,
              fields: transformData(fields),
            })
          }
        >
          Save
        </button>
      </div>
    </>
  );
}
