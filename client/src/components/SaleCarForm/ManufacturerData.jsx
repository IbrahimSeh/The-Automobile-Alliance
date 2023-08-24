import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import carManufacturer from "../Form/GridComponent/helper/carManufacturerSelection";
import typeSelection from "../Form/GridComponent/helper/typeSelection";
const ManufacturerData = () => {
  return (
    <div>
      <Typography mb={3} variant="h3" align="center" color="blue">
        MANUFACTURER DATA
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete={"given-"}
            name={"manufacturer"}
            required
            fullWidth
            id={"manufacturer"}
            label={"manufacturer"}
            //value={}
            //onChange={handleChange}
            select
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
            autoComplete={"given-"}
            name={"type"}
            required
            fullWidth
            id={"type"}
            label={"type"}
            //value={inputValue !== undefined ? inputValue : selectedValue}
            //onChange={handleChange}
            select
          >
            {/* {listOfSelection.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))} */}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            //autoComplete={"given-" + inputKey}
            name={"subType"}
            required
            fullWidth
            helperText=""
            //type={"sub type"}
            id={"subType"}
            label={"sub type"}
            // value={
            //   inputState[inputKey] === "" ? inputValue : inputState[inputKey]
            // }
            // onChange={handleInputChange}
            // onBlur={handelBlurChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ManufacturerData;
