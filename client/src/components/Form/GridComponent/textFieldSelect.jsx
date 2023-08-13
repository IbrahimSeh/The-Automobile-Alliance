import { MenuItem, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import getLabel from "./helper/getLabel";

const TextFieldSelect = ({
  passSelectedFromChildToParent,
  listOfSelection,
  inputKey,
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
        label={getLabel(inputKey)}
        value={selectedValue}
        onChange={handleChange}
        //onBlur={onBlur}
        select
        defaultValue="Skoda"
        //helperText="Please select your car manufacturer"
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

// TextFieldSelect.propTypes = {
//   listOfSelection: PropTypes.array,
// };
export default TextFieldSelect;
