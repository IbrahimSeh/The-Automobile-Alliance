import { Alert, Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { restData } from "../Pagination/arrayOfPages";
import validateRestSchema from "../../validation/OfferedCarToSale/Rest";

const Rest = ({ passData, prevState }) => {
  const [previousOwners, setPreviousOwners] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [yearOfProduction, setYearOfProduction] = useState(dayjs("2022-04-17"));

  //validate
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  //first useEffect when page load
  useEffect(() => {
    if (restData.previousOwners !== 0) {
      setPreviousOwners(restData.previousOwners);
      handleBlurPreviousOwners();
    }
    if (restData.kilometers !== 0) {
      setKilometers(restData.kilometers);
      handleBlurKilometers();
    }
    if (restData.yearOfProduction !== "2022")
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
  const handleBlurPreviousOwners = () => {
    joiResponse = validateRestSchema(prevState);
    setInputsErrorsState(joiResponse);
  };
  const handleBlurKilometers = () => {
    joiResponse = validateRestSchema({ previousOwners, kilometers });
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
              onBlur={handleBlurPreviousOwners}
              InputProps={{ inputProps: { min: 0, max: 300 } }}
            />
            {inputsErrorsState && inputsErrorsState["previousOwners"] && (
              <Alert severity="warning">
                {inputsErrorsState["previousOwners"].map((item) => (
                  <div key={`${"previousOwners"}-errors` + item}>
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
              autoComplete={"given-kilometers"}
              name="kilometers"
              required
              fullWidth
              label="kilometers"
              value={kilometers}
              type="number"
              onChange={handleChangeKilometers}
              onBlur={handleBlurKilometers}
              InputProps={{ inputProps: { min: 0, max: 2000000 } }}
            />
            {inputsErrorsState && inputsErrorsState["kilometers"] && (
              <Alert severity="warning">
                {inputsErrorsState["kilometers"].map((item) => (
                  <div key={`${"kilometers"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
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
