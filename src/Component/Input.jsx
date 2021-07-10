import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Input({
  label,
  type,
  error,
  value,
  setValue,
  errorMsg,
}) {
  return (
    <TextField
      style={{ width: "100%" }}
      id={label}
      label={label}
      type={type}
      helperText={errorMsg}
      variant="filled"
      error={error}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
