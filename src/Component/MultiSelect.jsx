import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import {
  Checkbox,
  Input,
  ListItemText,
  makeStyles,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  menuItem: {
    background: "#313131",
    color: "#ffffff",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSelect({
  options,
  label,
  values,
  setValue,
  keyLabel,
  displayLabel,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const displayValues = values.map((value) => value[displayLabel]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        variant="filled"
        id={label}
        multiple
        value={values}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.map((value) => value[displayLabel]).join(', ')}
        MenuProps={MenuProps}
        className="input"
      >
        {options.map((option) => (
          <MenuItem
            key={option[keyLabel]}
            value={option}
            className={classes.menuItem}
          >
            <Checkbox
              checked={displayValues.indexOf(option[displayLabel]) !== -1}
            />
            <ListItemText primary={option[displayLabel]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
