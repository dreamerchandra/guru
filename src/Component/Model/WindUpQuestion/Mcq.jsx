import React from "react";
import DIFFICULT from "../../../js/constant";
import InputClip from "../../ClipInput";
import Input from "../../Input";
import Select from "../../Select";
import style from "../QuestionCard/index.module.scss";

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

const Mcq = ({ field, setField }) => {
  return (
    <div>
      <div className="multi-column">
        <Input
          label="Question"
          type="text"
          value={field.question}
          setValue={setField("question")}
        />
        <Input
          label="Image"
          type="file"
          inputProps={{ accept: "image/*" }}
          value={field.imgUrl}
          setValue={setField("imgUrl")}
        />
      </div>
      <div className="multi-column">
        <div className="column-item">
          <InputClip
            label="Options"
            type="text"
            clips={field.options}
            setClips={setField("options")}
          />
        </div>

        <div className="column-item">
          <h1>Select the right answer</h1>
          <McqOptions
            options={field.options}
            onClick={setField("answerKey")}
            selectedLabel={field.answerKey}
          />
        </div>
      </div>
      <div className="multi-column">
        <div className="column-item">
          <InputClip
            label="Tag"
            type="text"
            clips={field.tags}
            setClips={setField("tags")}
          />
        </div>
        <div className="column-item">
          <Select
            label="Difficulty"
            values={field.difficult}
            setValue={setField("difficult")}
            options={DIFFICULT}
            keyLabel="id"
            displayLabel="label"
            multiple={false}
          />
        </div>
        <div className="column-item" style={{'--col': 15}}>
          <Select
            label="Difficulty"
            values={field.difficult}
            setValue={setField("difficult")}
            options={DIFFICULT}
            keyLabel="id"
            displayLabel="label"
            multiple={false}
          />
        </div>
      </div>
    </div>
  );
};
export default Mcq;
