import { Alert, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import validateRegisterSchema from "../../validation/signupValidation";
import validateCardSchema from "../../validation/CreateCardValidation";

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
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    title: "",
    subTitle: "",
    description: "",
    zipCode: "",
    web: "",
    url: "",
    alt: "",
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
    if (schema === "card") {
      joiResponse = validateCardSchema(prevState);
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
      if (schema === "user" || schema === "card") {
        onBlur(true);
      }
    }
  };

  const getType = (inputKey) => {
    switch (inputKey) {
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return;
    }
  };

  const checkIfRequired = (inputKey) => {
    switch (inputKey) {
      case "imgUrl":
        return false;
      case "imgAlt":
        return false;
      case "imageUrl":
        return false;
      case "imageAlt":
        return false;
      case "middleName":
        return false;
      case "state":
        return false;
      case "zip":
        return false;
      case "zipCode":
        return false;
      case "web":
        return false;
      case "url":
        return false;
      case "alt":
        return false;
      default:
        return true;
    }
  };

  return (
    <Fragment>
      <TextField
        autoComplete={"given-" + inputKey}
        name={inputKey}
        required={checkIfRequired(inputKey)}
        fullWidth
        autoFocus={inputKey === "firstName" ? true : false}
        helperText=""
        type={getType(inputKey)}
        id={inputKey}
        label={inputKey}
        value={inputState[inputKey] == "" ? inputValue : inputState[inputKey]}
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
