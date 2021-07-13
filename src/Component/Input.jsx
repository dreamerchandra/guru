import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Input({
  label,
  type,
  error,
  value,
  setValue,
  errorMsg,
  inputProps = {}
}) {
  const getValueOnChange = (e) => {
    const { files, value } = e.target;
    if (type === "file") {
      return { files, label: value };
    }
    return value;
  };

  const getDisplayValue = () => {
    return type === "file" ? value?.label ?? '' : value;
  };

  return (
    <TextField
      style={{ width: "100%" }}
      id={label}
      label={label}
      type={type}
      helperText={errorMsg}
      variant="filled"
      error={error}
      value={getDisplayValue()}
      onChange={(e) => setValue(getValueOnChange(e))}
      inputProps={inputProps}
    />
  );
}
