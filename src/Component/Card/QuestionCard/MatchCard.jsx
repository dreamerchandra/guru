import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shuffleArray } from "../../../js/helper";
import StorageImg from "../../StorageImg";
import style from './match.module.scss'

const TYPE = {
  QUESTION: "question",
  ANSWER: "answer",
};

const seedState = (fields) => {
  const questions = fields.map((field) => ({
    label: field.question,
    imgUrl: field.qImg,
    id: field.id,
    key: `${TYPE.QUESTION}${field.id}`,
    type: TYPE.QUESTION,
    isCompleted: false,
    isSelected: false,
  }));
  const answers = fields.map((field) => ({
    label: field.answer,
    imgUrl: field.aImg,
    type: TYPE.ANSWER,
    key: `${TYPE.ANSWER}${field.id}`,
    id: field.id,
    isCompleted: false,
    isSelected: false,
  }));
  return shuffleArray([...questions, ...answers])
};

export default function MatchCard({ fields }) {

  const initialState = seedState(fields)
  const [options, setOptions] = useState(initialState);

  useEffect(() => {
    setOptions(seedState(fields))
  }, [fields])

  const onTileSelect = (_pickedOption) => {
    /**
     * Terminology
     * PickedOption - user selected option
     * leftOption - In match there will be two column where left reps left options (aka question in match)
     * rightOption - Answer to leftOption (aka ans in match)
     * option.key - represent type and id
     * option.id - represents id. Both left and right options shares the same id
     */
    const newState = JSON.parse(JSON.stringify(options));
    const pickedOption = JSON.parse(JSON.stringify(_pickedOption));
    const pickedIdx = newState.findIndex((option) => option.key === pickedOption.key)
    const [leftOption] = newState.filter(
      (option) => option.id === pickedOption.id && option.type === TYPE.QUESTION
    );
    const [rightOption] = newState.filter(
      (option) => option.id === pickedOption.id && option.type === TYPE.ANSWER
    );
    const isBothSelected = (leftOption.isSelected && rightOption.key === pickedOption.key) || (rightOption.isSelected && leftOption.key === pickedOption.key)
    
    if (isBothSelected) {
      leftOption.isSelected = true;
      rightOption.isSelected = true;
      rightOption.isCompleted = true;
      leftOption.isCompleted = true;
    } else {
      // reset previous selected
      newState.forEach((option, idx) => {
        if (idx === pickedIdx) {
          newState[pickedIdx].isSelected = !newState[pickedIdx].isSelected;
          return;
        }
        option.isSelected = false;
      });
    }

    setOptions(newState);
  };

  return (
    <div className={style.root}>
      {options
        .filter((option) => !option.isCompleted)
        .map((option) => (
          <div
            className={`${style.option}  ${
              option.isSelected && style.selected
            }`}
            key={option.key}
            onClick={onTileSelect.bind(null, option)}
          >
            {option.imgUrl && (
              <StorageImg src={option.imgUrl} alt={option.label} />
            )}
            {option.label}
          </div>
        ))}
    </div>
  );
}
