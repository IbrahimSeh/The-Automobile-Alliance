import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import MultipleSelectManufacturer from "../components/SpecificSearch/MultipleSelectManufacturer";
import MultipleSelectType from "../components/SpecificSearch/MultipleSelectType";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DatePickerOpenTo from "../components/Form/GridComponent/OtherTextField/DatePicker";
const SpecificSearch = () => {
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
              <MultipleSelectManufacturer />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MultipleSelectType />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo passSelectedFromChildToParent inputValue />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo passSelectedFromChildToParent inputValue />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo passSelectedFromChildToParent inputValue />
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
