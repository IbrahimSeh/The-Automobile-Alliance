import { Alert, MenuItem, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import carManufacturer from "./helper/carManufacturerSelection";
import getLabel from "./helper/getLabel";
import { validateOwnersAndKm } from "../../Car/CreateCar/validateSelectedField";

const NumberInput = ({
  passSelectedFromChildToParent,
  inputKey,
  inputValue,
  previousOwners,
  kilometers,
}) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  //const [dialogErrMsg, setDialogErrMsg] = useState([]);
  const [inputState, setInputState] = useState({
    previousOwners: "",
    kilometers: "",
  });
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };

  const handelBlurChange = () => {
    //validate Owners And Km
    console.log("previousOwners = ", previousOwners);
    console.log("kilometers = ", kilometers);
    setInputsErrorsState(validateOwnersAndKm(previousOwners, kilometers));
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
        onBlur={handelBlurChange}
        InputProps={
          inputKey === "previousOwners"
            ? { inputProps: { min: 0, max: 300 } }
            : { inputProps: { min: 0, max: 2000000 } }
        }
      >
        {/* {inputsErrorsState && inputsErrorsState[inputKey] && (
          <Alert severity="warning">
            {inputsErrorsState[inputKey].map((item) => (
              <div key={`${inputKey}-errors` + item}>
                {item.includes("pattern:")
                  ? item.split("pattern:")[0] + "pattern"
                  : item}
              </div>
            ))}
          </Alert>
        )} */}

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
