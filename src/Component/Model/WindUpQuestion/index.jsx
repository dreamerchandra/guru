import React, { forwardRef, useRef, useState } from "react";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import { MODEL, withModelListener } from "../../../Hoc/Model";
import { QUESTION_TYPE } from "../QuestionCard";
import Match from "./Match";
import Mcq from "./Mcq";

const Question = ({ field, setField }) => {
  const Component = field.subType === QUESTION_TYPE.MCQ ? Mcq : Match;
  return <Component setField={setField} field={field} />;
};

const Questions = forwardRef(({ questions, setField }, ref) => (
  <>
    {questions.map((question, index) => (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <p style={{ fontSize: "2.5em" }}>{index + 1}.</p>

        <Question
          field={question}
          setField={setField.bind(null, index)}
          index={index}
        />
      </div>
    ))}
  </>
));

function WindUpQuestion({ hideModel, autoClose }) {
  const getQuesIniField = (subType) => ({
    description: "",
    type: "question",
    subType,
    imgUrl: "",
    question: [],
    options: [],
    answerKey: [],
    tags: [],
    difficult: undefined,
  });

  const [fields, setFields] = useState({
    questions: [getQuesIniField(QUESTION_TYPE.MCQ)],
  });

  const scrollMarker = useRef();
  const bodyRef = useRef();

  const setQuestionFields = (index, name) => (val) => {
    setFields((pre) => {
      const newState =
        typeof val === "function" ? val(pre.questions[index][name]) : val;
      const newQuestion = JSON.parse(JSON.stringify(pre.questions));
      newQuestion[index][name] = newState;
      return {
        ...pre,
        questions: newQuestion,
      };
    });
  };

  const addNewQuestion = (subType) => {
    setFields({
      ...fields,
      questions: [...fields.questions, getQuesIniField(subType)],
    });
    const scrollToNew = () => {
      bodyRef.current.scrollTop = scrollMarker.current.offsetTop;
    };
    setTimeout(scrollToNew, 0);
  };
  return (
    <section className="modelHolder">
      <div className="header">
        <h1>New Chapter</h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body" ref={bodyRef}>
        <Questions
          questions={fields.questions}
          setField={setQuestionFields}
          ref={scrollMarker}
        />
      </div>
      <div className="footer">
        <button
          className="secondary"
          style={{
            color: "blueviolet",
          }}
          onClick={() => addNewQuestion(QUESTION_TYPE.MCQ)}
        >
          Add Mcq
        </button>
        <button>Save</button>
      </div>
    </section>
  );
}

export default withModelListener(WindUpQuestion, MODEL.WIND_UP_QUESTIONS);
