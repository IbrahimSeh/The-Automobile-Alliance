import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import MultipleSelectManufacturer from "../components/SpecificSearch/MultipleSelectManufacturer";
import MultipleSelectType from "../components/SpecificSearch/MultipleSelectType";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DatePickerOpenTo from "../components/Form/GridComponent/OtherTextField/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";

const SpecificSearch = () => {
  const [manufacturerArr, setManufacturerArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);
  const [fromYear, setFromYear] = useState(dayjs("1900-04-17"));
  const [toYear, setToYear] = useState(dayjs("2099-04-17"));

  const updateManufacturerArr = (value) => setManufacturerArr(value);
  const updateTypeArr = (value) => setTypeArr(value);
  const updateFromYear = (value) => setFromYear(value);
  const updateToYear = (value) => setToYear(value);

  //console.log("fromYear = ", fromYear.$y);
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#945a61" }}>
          <ContentPasteSearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SPECIFIC SEARCH
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MultipleSelectManufacturer
                passSelectedFromChildToParent={updateManufacturerArr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MultipleSelectType
                passSelectedFromChildToParent={updateTypeArr}
                manufacturerArr={manufacturerArr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateFromYear}
                label={"From Year "}
                year={"1900"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateToYear}
                label={"To Year "}
                year={"2099"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo passSelectedFromChildToParent />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MultipleSelectManufacturer />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SpecificSearch;
