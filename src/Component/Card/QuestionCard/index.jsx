import React from "react";
import { QUESTION_TYPE } from "../../Model/QuestionCard";
import MatchCard from "./MatchCard";
import McqCard from "./McqCard";

export default function QuestionCard(props) {
  const { subType = QUESTION_TYPE.MCQ } = props;
  return (
    <>
      {subType === QUESTION_TYPE.MCQ ? (
        <McqCard {...props} />
      ) : (
        <MatchCard {...props} />
      )}
    </>
  );
}
