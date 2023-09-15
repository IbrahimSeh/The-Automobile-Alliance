import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import listOfFuelType from "../Form/GridComponent/helper/fuelTypeSelection";
import { engineData } from "../Pagination/arrayOfPages";

const Engine = ({ passData }) => {
  const [engineType, setEngineType] = useState("");
  const [fuelType, setFuelType] = useState("");

  //first useEffect when page load
  useEffect(() => {
    if (engineData.engineType !== "") setEngineType(engineData.engineType);
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
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="fueltype"
              name="given-fueltype"
              select
              label=""
              helperText="Please select your fuel type *"
              fullWidth
              required
              value={fuelType}
              onChange={handleChangeFuelType}
            >
              {listOfFuelType.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Engine;
