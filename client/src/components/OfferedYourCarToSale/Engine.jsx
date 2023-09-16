import {
  Alert,
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import listOfFuelType from "../Form/GridComponent/helper/fuelTypeSelection";
import { engineData } from "../Pagination/arrayOfPages";
import validateEngineSchema from "../../validation/OfferedCarToSale/Engine";

const Engine = ({ passData }) => {
  const [engineType, setEngineType] = useState("");
  const [fuelType, setFuelType] = useState("");

  //validate
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  //first useEffect when page load
  useEffect(() => {
    if (engineData.engineType !== "") {
      setEngineType(engineData.engineType);
      handleBlurEngineType();
    }
    if (engineData.fuelType !== "") setFuelType(engineData.fuelType);
  }, []);

  const handleChangeEngineType = (event) => {
    setEngineType(event.target.value);
    passData("engineType", event.target.value);
  };
  const handleChangeFuelType = (event) => {
    setFuelType(event.target.value);
    passData("fuelType", event.target.value);
  };
  const handleBlurEngineType = () => {
    joiResponse = validateEngineSchema({ engineType });
    setInputsErrorsState(joiResponse);
  };
  const handleBlurFuelType = () => {
    joiResponse = validateEngineSchema({ fuelType });
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
          ENGINE DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name={"engineType"}
              required
              fullWidth
              helperText=""
              id={"engineType"}
              label={"engineType"}
              value={engineType}
              onChange={handleChangeEngineType}
              onBlur={handleBlurEngineType}
            />
            {inputsErrorsState && inputsErrorsState["engineType"] && (
              <Alert severity="warning">
                {inputsErrorsState["engineType"].map((item) => (
                  <div key={`${"engineType"}-errors` + item}>
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
              id="fuelType"
              name="given-fuelType"
              select
              label=""
              helperText="Please select your fuel type *"
              fullWidth
              required
              value={fuelType}
              onChange={handleChangeFuelType}
              //onBlur={handleBlurFuelType}
            >
              {listOfFuelType.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
              {/* {inputsErrorsState && inputsErrorsState["fuelType"] && (
                <Alert severity="warning">
                  {inputsErrorsState["fuelType"].map((item) => (
                    <div key={`${"fuelType"}-errors` + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )} */}
            </TextField>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Engine;
