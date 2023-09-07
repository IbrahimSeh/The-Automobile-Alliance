import { Alert, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { validateUserSchema } from "../../../validation/userValidation";
import validateCarSchemaGroup1 from "../../../validation/CreateCarValidation/Group1";
import validateNewUserSchema from "../../../validation/newUserValidation";
import getLabel from "./helper/getLabel";
import getType from "./helper/getType";
import checkIfRequired from "./helper/checkIfRequired";

const GridItemComponent = ({
  inputKey,
  inputValue,
  onChange,
  onBlur,
  prevState,
  schema,
}) => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: 0,
    title: "",
    subTitle: "",
    description: "",
    web: "",
    type: "",
    subType: "",
    yearOfProduction: "",
    previousOwners: "",
    kilometers: "",
    engineType: "",
    fuelType: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    onChange(ev.target.id, ev.target.value);
  };

  const handelBlurChange = () => {
    switch (schema) {
      case "car":
        joiResponse = validateCarSchemaGroup1(prevState);
        break;
      case "user":
        joiResponse = validateUserSchema(prevState);
        break;
      case "new-user":
        joiResponse = validateNewUserSchema(prevState);
        break;
      default:
        break;
    }
    setInputsErrorsState(joiResponse);
    if (!joiResponse) onBlur(false);
    else onBlur(true);
  };

  return (
    <Fragment>
      <TextField
        autoComplete={inputKey === "password" ? "new-password" : "given-"}
        name={inputKey}
        required={checkIfRequired(inputKey)}
        fullWidth
        helperText=""
        type={getType(inputKey)}
        id={inputKey}
        label={getLabel(inputKey)}
        value={inputState[inputKey] === "" ? inputValue : inputState[inputKey]}
        onChange={handleInputChange}
        onBlur={handelBlurChange}
      />
      {inputsErrorsState && inputsErrorsState[inputKey] && (
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

GridItemComponent.propTypes = {
  inputKey: PropTypes.string.isRequired,
  passDataFromChildToParent: PropTypes.func,
};

export default GridItemComponent;
