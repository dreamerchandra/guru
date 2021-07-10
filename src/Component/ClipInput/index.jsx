import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Clip from "../Clip";
import style from "./index.module.scss";

const removeClip = (labelToBeRemoved) => (clips) =>
  clips.filter((clip) => clip !== labelToBeRemoved);

export default function InputClip({
  setClips = () => {},
  clips,
  clipPlaceHolder = "",
  label,
  errorMsg,
  error,
}) {
  const [word, setWord] = useState("");

  const addClip = (event) => {
    const { key } = event;
    if (key === "Enter" && word) {
      setClips((preClips) => {
        return [...new Set([...preClips, word])];
      });

      setWord("");
    }
  };

  return (
    <div className={style.inputClipWrapper}>
      <TextField
        id={label}
        label={label}
        type="text"
        helperText={errorMsg}
        variant="filled"
        error={error}
        value={word}
        onKeyDownCapture={addClip}
        onChange={(event) => {
          setWord(event.target.value);
        }}
      />
      <div className={style.clipsHolder}>
        {/* https://stackoverflow.com/a/46057536/5277189 */}
        {clips.length ? (
          [...clips].reverse().map((clip) => (
            <Clip
              label={clip}
              key={clip}
              onDelete={(label) => {
                setClips(removeClip(label));
              }}
            />
          ))
        ) : (
          <span>{clipPlaceHolder}</span>
        )}
      </div>
    </div>
  );
}
