import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";

const TextFieldSelectForFuel = ({
  passSelectedFromChildToParent,
  listOfSelection,
  inputKey,
  selectedManufacturerRelatedToType,
  inputValue,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
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
        id={inputKey}
        label=""
        helperText="Please select your fuel type *"
        value={inputValue !== undefined ? inputValue : selectedValue}
        onChange={handleChange}
        select
      >
        {listOfSelection.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
};

export default TextFieldSelectForFuel;
