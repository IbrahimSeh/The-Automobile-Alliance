import { Alert, MenuItem, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import carManufacturer from "./helper/carManufacturerSelection";
import getLabel from "./helper/getLabel";
import { validateOwnersAndKm } from "../../Car/CreateCar/validateSelectedField";

const NumberInput = ({
  passSelectedFromChildToParent,
  inputKey,
  inputValue,
  prevState,
}) => {
  // const [selectedValue, setSelectedValue] = useState(0);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [inputState, setInputState] = useState({
    previousOwners: "",
    kilometers: "",
  });
  let joiResponse;

  const handleChange = (event) => {
    console.log("handleChange");
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[event.target.id] = event.target.value;
    setInputState(newInputState);
    passSelectedFromChildToParent(event.target.value);
  };

  const handelBlurChange = () => {
    console.log("handelBlurChange");
    //validate Owners And Km
    joiResponse = validateOwnersAndKm(prevState);
    console.log("joiResponse = ", joiResponse);
    setInputsErrorsState(joiResponse);
    console.log("inputsErrorsState = ", inputsErrorsState);
  };

  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={inputKey}
        required
        fullWidth
        label={getLabel(inputKey)}
        value={inputValue !== undefined ? inputState[inputKey] : inputValue}
        onChange={handleChange}
        type="number"
        onBlur={handelBlurChange}
        InputProps={
          inputKey === "previousOwners"
            ? { inputProps: { min: 0, max: 300 } }
            : { inputProps: { min: 0, max: 2000000 } }
        }
      />
      {inputsErrorsState !== null && inputsErrorsState[inputKey] && (
        <Alert severity="warning">
          {inputsErrorsState[inputKey].map((item) => (
            <div key={`${inputKey}-errors` + item}>
              {item.includes("pattern:")
                ? item.split("pattern:")[0] + "pattern"
                : item}
            </div>
          ))}
        </Alert>
      )}
    </Fragment>
  );
};
export default NumberInput;
