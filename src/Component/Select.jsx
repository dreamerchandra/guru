import InputLabel from "@material-ui/core/InputLabel";
import MatSelect from "@material-ui/core/Select";
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
    margin: `${theme.spacing(1)} 0`,
    width: '100%',
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

export default function Select({
  options,
  label,
  values: _values,
  setValue,
  keyLabel,
  displayLabel,
  multiple=true,
}) {
  const values = multiple ? _values : _values? [_values]: [];
  const classes = useStyles();

  const handleChange = (event) => {
    const selectedOption = options.filter(option => event.target.value.includes(option[displayLabel]))
    const newState = multiple ? selectedOption : selectedOption[0];
    setValue(newState);
  };

  const displayValues = values.map((value) => value[displayLabel]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={label}>{label}</InputLabel>
      <MatSelect
        labelId={label}
        variant="filled"
        id={label}
        multiple={multiple}
        value={values.map((value) => value[displayLabel])}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        className="input"
      >
        {options.map((option) => (
          <MenuItem
            key={option[keyLabel]}
            value={option[displayLabel]}
            className={classes.menuItem}
          >
            <Checkbox
              checked={displayValues.indexOf(option[displayLabel]) !== -1}
            />
            <ListItemText primary={option[displayLabel]} />
          </MenuItem>
        ))}
      </MatSelect>
    </FormControl>
  );
}
