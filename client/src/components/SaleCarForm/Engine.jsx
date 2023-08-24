import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import listOfFuelType from "../Form/GridComponent/helper/fuelTypeSelection";

const Engine = () => {
  const [engineType, setEngineType] = useState("");
  const [fuelType, setFuelType] = useState("");

  const handleChangeEngineType = (event) => setEngineType(event.target.value);
  const handleChangeFuelType = (event) => setFuelType(event.target.value);

  return (
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
            autoComplete={"given-"}
            name={"fuelType"}
            required
            fullWidth
            id={"fuelType"}
            label={"fuelType"}
            value={fuelType}
            onChange={handleChangeFuelType}
            select
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
  );
};

export default Engine;
