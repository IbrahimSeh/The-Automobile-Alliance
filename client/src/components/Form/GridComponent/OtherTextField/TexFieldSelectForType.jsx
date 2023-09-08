import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import getManufacturerRelatedToSelectedType from "../helper/getManufacturerRelatedToSelectedType";

const TexFieldSelectForType = ({
  passSelectedFromChildToParent,
  returnManufacturerRelatedToSelectedType,
  listOfSelection,
  inputKey,
  selectedTypeRelatedToManufacturer,
  inputValue,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    returnManufacturerRelatedToSelectedType(
      getManufacturerRelatedToSelectedType(event.target.value)
    );
    setSelectedValue(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };

  const getValue = () => {
    if (inputValue !== undefined) return inputValue;
    if (selectedTypeRelatedToManufacturer === "0") return "";
    else return selectedValue;
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
        helperText="Please select your type *"
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
export default TexFieldSelectForType;
