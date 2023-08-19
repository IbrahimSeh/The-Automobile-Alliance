import { Alert, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import validateRegisterSchema from "../../../validation/signupValidation";
import validateCarSchema from "../../../validation/CreateCarValidation";
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
    zipCode: "",
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
    if (schema === "car") {
      joiResponse = validateCarSchema(prevState);
      console.log("joiResponse = ", joiResponse);
    } else {
      if (schema === "user") {
        joiResponse = validateRegisterSchema(prevState);
        if (joiResponse !== null && joiResponse.hasOwnProperty("password")) {
          delete joiResponse.password;
          if (Object.keys(joiResponse).length === 0) {
            joiResponse = null;
          }
        }
      } else {
        joiResponse = validateRegisterSchema(prevState);
      }
    }
    setInputsErrorsState(joiResponse);
    if (!joiResponse) {
      if (schema === "user") {
        onBlur(false);
      } else {
        onBlur(false);
      }
    } else {
      if (schema === "user" || schema === "car") {
        onBlur(true);
      }
    }
  };

  return (
    <Fragment>
      <TextField
        autoComplete={"given-" + inputKey}
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
