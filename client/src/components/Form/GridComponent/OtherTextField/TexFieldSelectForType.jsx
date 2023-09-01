import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import getLabel from "../helper/getLabel";
import typeSelection from "../helper/typeSelection";

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

  const getManufacturerRelatedToSelectedType = (type) => {
    for (const [key, value] of Object.entries(typeSelection)) {
      for (const element of value) {
        if (element.label === type) return key;
      }
    }
    return "";
  };

  const getDisable = () => {
    if (selectedTypeRelatedToManufacturer === "ALL") return true;
    return false;
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
        //label={getLabel(inputKey)}
        label=""
        helperText="Please select your type"
        value={getValue()}
        onChange={handleChange}
        select
        //disabled={getDisable()}
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
