import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import InputClip from "../../ClipInput";
import api from "../../../js/api";
import { getUuid } from "../../../js/helper";
import Input from "../../Input";
import Notification from "../../Notification";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import style from "./index.module.scss";

export default function Match({ hideModel, model: { info: modelInfo } }) {
  const initialState = () => ({
    question: "",
    qImg: "",
    answer: "",
    aImg: "",
    id: getUuid(),
  });
  const [fields, setFields] = useState([initialState()]);
  const { chapterId, cardId } = modelInfo;

  const queryClient = useQueryClient();

  const createMatch = useMutation(api.cards.upsertMatch, {
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

  const setField = (name, index) => (val) => {
    setFields((pre) => {
      const newVal = typeof val === "function" ? val(pre[index][name]) : val;
      pre[index][name] = newVal;
      return [...pre];
    });
  };

  const removeItem = (id) => {
    const index = fields.findIndex((field) => field.id === id);
    setFields([...fields.slice(0, index), ...fields.slice(index + 1)]);
  };

  return (
    <>
      <div className="body">
        <ol className={style.matchList}>
          {fields.map((field, idx) => (
            <li key={field.id}>
              <div className={style.setWrapper}>
                <div className={style.matchWrapper}>
                  <div>
                    <Input
                      label="Question"
                      type="text"
                      value={field.question}
                      setValue={setField("question", idx)}
                    />
                    <Input
                      label="Image"
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      value={field.qImg}
                      setValue={setField("qImg", idx)}
                    />
                  </div>

                  <div>
                    <Input
                      label="Answer"
                      type="text"
                      value={field.answer}
                      setValue={setField("answer", idx)}
                    />
                    <Input
                      label="Image"
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      value={field.aImg}
                      setValue={setField("aImg", idx)}
                    />
                  </div>
                </div>
                <Close onClick={() => removeItem(field.id)} />
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="footer">
        <button
          className="secondary"
          onClick={() => setFields([...fields, initialState()])}
        >
          Add
        </button>
        <button
          disabled={createMatch.isLoading}
          onClick={() => {
            createMatch.mutate({ chapterId, fields, cardId })
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
