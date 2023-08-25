import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import carManufacturer from "../Form/GridComponent/helper/carManufacturerSelection";
import typeSelection from "../Form/GridComponent/helper/typeSelection";
import { useState } from "react";
const ManufacturerData = ({ passData }) => {
  const [manufacturer, setManufacturer] = useState("ALL");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const handleChangeManufacturer = (event) => {
    if (manufacturer !== "ALL" && type !== "") setType("");
    setManufacturer(event.target.value);
    passData("manufacturer", event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    passData("type", event.target.value);
  };
  const handleChangeSubType = (event) => {
    setSubType(event.target.value);
    passData("subType", event.target.value);
  };
  const getDisable = () => {
    if (manufacturer === "ALL") return true;
    return false;
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
          MANUFACTURER DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="manufacturer"
              //label="manufacturer"
              name="given-manufacturer"
              select
              required
              fullWidth
              value={manufacturer === "ALL" ? "" : manufacturer}
              onChange={handleChangeManufacturer}
            >
              {carManufacturer.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="type"
              name="given-type"
              select
              //label="type"
              fullWidth
              required
              value={type}
              onChange={handleChangeType}
              disabled={getDisable()}
            >
              {typeSelection[manufacturer].map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="subType"
              name="given-subtype"
              label="sub type"
              required
              fullWidth
              value={subType}
              onChange={handleChangeSubType}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default ManufacturerData;
