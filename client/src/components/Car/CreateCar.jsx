import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridComponent/GridItemComponent";
import TextFieldSelect from "../Form/GridComponent/TextFieldSelect";

const CreateCar = () => {
  const [inputState] = useState({
    type: "",
    subType: "",
    yearOfProduction: "",
    previousOwners: "",
    kilometers: "",
    engineType: "",
    fuelType: "",
    phone: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
  });
  const [manufacturerSelected, setManufacturerSelected] = useState("");
  const navigate = useNavigate();
  const [btnDisable, setbtnDisable] = useState(true);

  const handleBtnSubmitClick = async (ev) => {
    try {
      console.log("manufacturerSelected = ", manufacturerSelected);
      await axios.post("/cars/", {
        manufacturerData: {
          manufacturer: manufacturerSelected,
          type: inputState.type,
          subType: inputState.subType,
        },
        yearOfProduction: inputState.yearOfProduction,
        previousOwners: inputState.previousOwners,
        kilometers: inputState.kilometers,
        engine: {
          engineType: inputState.engineType,
          fuelType: inputState.fuelType,
        },
        image: { url: inputState.url, alt: inputState.alt },
        address: {
          state: inputState.state,
          country: inputState.country,
          city: inputState.city,
          street: inputState.street,
        },
        communications: { phone: inputState.phone, email: inputState.email },
      });

      toast.success("A new card has been created");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the card has been not created");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.MYCARDS);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputState[key] = value;
  };

  const onBlurHandel = (submitLock) => {
    console.log("submitLock = ", submitLock);
    setbtnDisable(submitLock);
  };

  const updateSelectedState = (value) => {
    setManufacturerSelected(value);
  };
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
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          CREATE A CAR SALES FORM
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFieldSelect
                passSelectedFromChildToParent={updateSelectedState}
              />
            </Grid>
            {Object.entries(inputState).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={value}
                  onChange={updateState}
                  onBlur={onBlurHandel}
                  prevState={inputState}
                  schema={"car"}
                />
              </Grid>
            ))}
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCar;
