import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import getLabel from "./helper/getLabel";
import typeSelection from "./helper/typeSelection";

const TexFieldSelectForType = ({
  passSelectedFromChildToParent,
  returnManufacturerRelatedToSelectedType,
  listOfSelection,
  inputKey,
  selectedManufacturer,
  inputValue,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    if (selectedManufacturer === "ALL") {
      returnManufacturerRelatedToSelectedType(
        getManufacturerRelatedToSelectedType(event.target.value)
      );
    }
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

  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={inputKey}
        required
        fullWidth
        id={inputKey}
        label={getLabel(inputKey)}
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
export default TexFieldSelectForType;
