import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import carManufacturer from "./helper/carManufacturerSelection";
import getLabel from "./helper/getLabel";

const NumberInput = ({
  passSelectedFromChildToParent,
  inputKey,
  inputValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };
  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={inputKey}
        required
        fullWidth
        label={getLabel(inputKey)}
        value={inputValue !== undefined ? inputValue : selectedValue}
        onChange={handleChange}
        type="number"
        InputProps={
          inputKey === "previousOwners"
            ? { inputProps: { min: 0, max: 300 } }
            : { inputProps: { min: 0, max: 2000000 } }
        }
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
export default NumberInput;
