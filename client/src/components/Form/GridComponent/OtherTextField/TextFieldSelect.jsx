import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";

const TextFieldSelect = ({
  passSelectedFromChildToParent,
  listOfSelection,
  inputKey,
  selectedManufacturerRelatedToType,
  inputValue,
  returnTypeRelatedToSelectedManufacturer,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    passSelectedFromChildToParent(event.target.value);
    returnTypeRelatedToSelectedManufacturer("0");
  };

  const getValue = () => {
    if (inputValue !== undefined) {
      return inputValue;
    }
    if (selectedManufacturerRelatedToType === "ALL") {
      return selectedValue;
    } else {
      return selectedManufacturerRelatedToType;
    }
  };
  return (
    <Fragment>
      <TextField
        id={"manufacturer"}
        autoComplete={"given-"}
        name={"manufacturer"}
        required
        fullWidth
        label=""
        helperText="Please select your manufacturer *"
        value={getValue()}
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
export default TextFieldSelect;
