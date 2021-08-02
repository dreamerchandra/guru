import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import InputClip from "../../../../Component/ClipInput";
import api from "../../../../js/api";
import { getUuid } from "../../../../js/helper";
import Input from "../../../Input";
import Notification from "../../../Notification";
import style from "./index.module.scss";

const McqOptions = ({ options, selectedLabel, onClick }) => {
  return (
    <div className={style.mcqOptionWrapper}>
      {options.map((option, idx) => (
        <button
          key={idx}
          className={`${option === selectedLabel && `${style.selected}`}`}
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

const transformPropsOnEdit = (data) => {
  const options = data.options?.map(({ label }) => label) ?? [];
  const { imgUrl, quesLabel: question = "", ansId, cardId, chapterId } = data;
  const answerKey = data.options?.find(({ id }) => id === ansId)?.label ?? "";
  return {
    options,
    imgUrl,
    question,
    answerKey,
    cardId,
    chapterId,
  };
}

export default function Mcq ({ hideModel, model: { info: modelInfo } }) {
  const { options, imgUrl, question, answerKey, cardId, chapterId } = transformPropsOnEdit(modelInfo);
  const [fields, setFields] = useState({
    question,
    options,
    answerKey,
    imgUrl,
  });

  const queryClient = useQueryClient();

  const createMcq = useMutation(api.cards.upsertMcq, {
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
          inputProps={{ accept: "image/*" }}
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
          selectedLabel={fields.answerKey}
        />
      </div>
      <div className="footer">
        <button
          disabled={createMcq.isLoading}
          onClick={() =>
            createMcq.mutate({
              chapterId,
              fields: transformData(fields),
              cardId,
            })
          }
        >
          Save
        </button>
      </div>
    </>
  );
}
