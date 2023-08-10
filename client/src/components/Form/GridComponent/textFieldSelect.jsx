import { MenuItem, TextField } from "@mui/material";
import { Fragment } from "react";
import carManufacturer from "./carManufacturer";

const textFieldSelect = ({
  inputKey,
  getLabel,
  handleInputChange,
  handelBlurChange,
}) => {
  return (
    <Fragment>
      <TextField
        autoComplete={"given-" + inputKey}
        name={inputKey}
        required
        fullWidth
        id={inputKey}
        label={getLabel(inputKey)}
        value={""}
        onChange={handleInputChange}
        onBlur={handelBlurChange}
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
export default textFieldSelect;
