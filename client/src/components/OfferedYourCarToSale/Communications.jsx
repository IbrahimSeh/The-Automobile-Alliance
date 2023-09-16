import { Alert, Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { communicationsData } from "../Pagination/arrayOfPages";
import validateCommunicationsSchema from "../../validation/OfferedCarToSale/Communications";

const Communications = ({ passData, prevState }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //validate
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  //first useEffect when page load
  useEffect(() => {
    if (communicationsData.phone !== "") {
      setPhone(communicationsData.phone);
      handleBlurPhone();
    }
    if (communicationsData.email !== "") {
      setEmail(communicationsData.email);
      handleBlurEmail();
    }
  }, []);

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
    passData("phone", event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    passData("email", event.target.value);
  };
  const handleBlurPhone = () => {
    joiResponse = validateCommunicationsSchema(prevState);
    setInputsErrorsState(joiResponse);
  };
  const handleBlurEmail = () => {
    joiResponse = validateCommunicationsSchema(prevState);
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
          COMMUNICATION DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="phone"
              required
              fullWidth
              helperText=""
              id="phone"
              label="phone"
              autoComplete="Currect Phone"
              value={phone}
              onChange={handleChangePhone}
              onBlur={handleBlurPhone}
            />
            {inputsErrorsState && inputsErrorsState["phone"] && (
              <Alert severity="warning">
                {inputsErrorsState["phone"].map((item) => (
                  <div key={`${"phone"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="email"
              fullWidth
              helperText=""
              id="email"
              label="email"
              autoComplete="Currect Email"
              value={email}
              onChange={handleChangeEmail}
              onBlur={handleBlurEmail}
            />
            {inputsErrorsState && inputsErrorsState["email"] && (
              <Alert severity="warning">
                {inputsErrorsState["email"].map((item) => (
                  <div key={`${"email"}-errors` + item}>
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

export default Communications;
