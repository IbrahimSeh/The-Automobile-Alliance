import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import carManufacturer from "./helper/carManufacturer";

const TextFieldSelect = ({ passSelectedFromChildToParent }) => {
  const [manufacturer, setManufacturer] = useState("");

  const handleChange = (event) => {
    setManufacturer(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };
  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={"manufacturer"}
        required
        fullWidth
        id={"manufacturer"}
        label={"manufacturer"}
        value={manufacturer}
        onChange={handleChange}
        //onBlur={onBlur}
        select
        defaultValue="Skoda"
        helperText="Please select your car manufacturer"
      >
        {carManufacturer.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
};
export default TextFieldSelect;
