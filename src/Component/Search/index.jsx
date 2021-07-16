import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  fontFace: {
    "& > *": {
      fontSize: "14px",
      color: "#ffffff",
    },
  },
}));

export default function Search({ val, setVal }) {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        alignContent="center"
        justifyContent="center"
      >
        <Grid item></Grid>
        <Grid item>
          <TextField
            value={val}
            onChange={(e) => setVal(e.target.value)}
            id="search-input"
            label="Search"
            className={classes.fontFace}
          />
        </Grid>
      </Grid>
    </div>
  );
}
