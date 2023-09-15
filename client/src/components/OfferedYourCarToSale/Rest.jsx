import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { restData } from "../Pagination/arrayOfPages";

const Rest = ({ passData }) => {
  const [previousOwners, setPreviousOwners] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [yearOfProduction, setYearOfProduction] = useState(dayjs("2022-04-17"));

  //first useEffect when page load
  useEffect(() => {
    if (restData.previousOwners !== "")
      setPreviousOwners(restData.previousOwners);
    if (restData.kilometers !== "") setKilometers(restData.kilometers);
    if (restData.yearOfProduction !== "")
      setYearOfProduction(dayjs(`${restData.yearOfProduction}-04-17`));
  }, []);

  const handleChangePreviousOwners = (event) => {
    setPreviousOwners(event.target.value);
    passData("previousOwners", event.target.value);
  };
  const handleChangeKilometers = (event) => {
    setKilometers(event.target.value);
    passData("kilometers", event.target.value);
  };
  const handleChangeYearOfProduction = (event) => {
    setYearOfProduction(event);
    passData("yearOfProduction", event.$y);
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
          A LITTLE MORE INFORMATION AND DONE
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete={"given-previousOwners"}
              name="previousOwners"
              required
              fullWidth
              label="previousOwners"
              value={previousOwners}
              type="number"
              onChange={handleChangePreviousOwners}
              //onBlur={handelBlurChange}
              InputProps={{ inputProps: { min: 0, max: 300 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete={"given-kilometers"}
              name="kilometers"
              required
              fullWidth
              label="kilometers"
              value={kilometers}
              type="number"
              onChange={handleChangeKilometers}
              //onBlur={handelBlurChange}
              InputProps={{ inputProps: { min: 0, max: 2000000 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label={'"year of production *"'}
                  openTo="year"
                  views={["year"]}
                  fullWidth
                  //value={YearOfProduction}
                  value={yearOfProduction}
                  onChange={handleChangeYearOfProduction}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
export default Rest;
