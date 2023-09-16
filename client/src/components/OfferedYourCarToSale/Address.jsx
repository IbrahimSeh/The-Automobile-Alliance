import { Alert, Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addressData } from "../Pagination/arrayOfPages";
import validateAddressSchema from "../../validation/OfferedCarToSale/Address";

const Address = ({ passData, prevState }) => {
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  //validate
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  //first useEffect when page load
  useEffect(() => {
    if (addressData.state !== "") {
      setState(addressData.state);
      handleBlurState();
    }
    if (addressData.country !== "") {
      setCountry(addressData.country);
      handleBlurCountry();
    }
    if (addressData.city !== "") {
      handleBlurCity();
      setCity(addressData.city);
    }
    if (addressData.street !== "") {
      setStreet(addressData.street);
      handleBlurStreet();
    }
  }, []);
  //onchange
  const handleChangeState = (event) => {
    setState(event.target.value);
    passData("state", event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    passData("country", event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
    passData("city", event.target.value);
  };
  const handleChangeStreet = (event) => {
    setStreet(event.target.value);
    passData("street", event.target.value);
  };
  //onBlur
  const handleBlurState = () => {
    joiResponse = validateAddressSchema(prevState);
    console.log("joiResponse = ", joiResponse);
    setInputsErrorsState(joiResponse);
  };
  const handleBlurCountry = () => {
    joiResponse = validateAddressSchema(prevState);
    setInputsErrorsState(joiResponse);
  };
  const handleBlurCity = () => {
    joiResponse = validateAddressSchema(prevState);
    console.log("joiResponse = ", joiResponse);
    setInputsErrorsState(joiResponse);
  };
  const handleBlurStreet = () => {
    joiResponse = validateAddressSchema(prevState);
    setInputsErrorsState(joiResponse);
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Typography mb={3} variant="h3" align="center" color="blue">
          ADDRESS DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"state"}
              fullWidth
              helperText=""
              id={"state"}
              label={"state"}
              value={state}
              onChange={handleChangeState}
              onBlur={handleBlurState}
            />
            {inputsErrorsState && inputsErrorsState["state"] && (
              <Alert severity="warning">
                {inputsErrorsState["state"].map((item) => (
                  <div key={`${"state"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"country"}
              required
              fullWidth
              helperText=""
              id={"country"}
              label={"country"}
              autoComplete="Currect Country"
              value={country}
              onChange={handleChangeCountry}
              onBlur={handleBlurCountry}
            />
            {inputsErrorsState && inputsErrorsState["country"] && (
              <Alert severity="warning">
                {inputsErrorsState["country"].map((item) => (
                  <div key={`${"country"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"city"}
              required
              fullWidth
              helperText=""
              id={"city"}
              label={"city"}
              value={city}
              onChange={handleChangeCity}
              onBlur={handleBlurCity}
            />
            {inputsErrorsState && inputsErrorsState["city"] && (
              <Alert severity="warning">
                {inputsErrorsState["city"].map((item) => (
                  <div key={`${"city"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"street"}
              required
              fullWidth
              helperText=""
              id={"street"}
              label={"street"}
              value={street}
              onChange={handleChangeStreet}
              onBlur={handleBlurStreet}
            />
            {inputsErrorsState && inputsErrorsState["street"] && (
              <Alert severity="warning">
                {inputsErrorsState["street"].map((item) => (
                  <div key={`${"street"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Address;
