import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import carManufacturer from "./helper/carManufacturerSelection";

const NumberInput = ({ passSelectedFromChildToParent }) => {
  const [previousOwners, setPreviousOwners] = useState();

  const handleChange = (event) => {
    setPreviousOwners(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };
  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={"previousOwners"}
        required
        fullWidth
        label={"previous owners"}
        value={previousOwners}
        onChange={handleChange}
        //onBlur={onBlur}
        type="number"
        defaultValue={0}
        InputProps={{ inputProps: { min: 0, max: 300 } }}
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
