import { Alert, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import getLabel from "../helper/getLabel";
import { validateOwnersAndKm } from "../../../Car/CreateCar/validateSelectedField";

const NumberInput = ({
  passSelectedFromChildToParent,
  inputKey,
  inputValue,
  prevState,
}) => {
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [inputState, setInputState] = useState({
    previousOwners: "",
    kilometers: "",
  });
  let joiResponse;

  const handleChange = (event) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[event.target.id] = event.target.value;
    setInputState(newInputState);
    passSelectedFromChildToParent(event.target.value);
  };

  const handelBlurChange = () => {
    joiResponse = validateOwnersAndKm(prevState);
    setInputsErrorsState(joiResponse);
  };

  return (
    <Fragment>
      <TextField
        autoComplete={"given-"}
        name={inputKey}
        required
        fullWidth
        label={getLabel(inputKey)}
        value={inputValue !== "" ? inputValue : inputState[inputKey]}
        type="number"
        onChange={handleChange}
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