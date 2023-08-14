import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import carManufacturerSelection from "../Form/GridComponent/helper/carManufacturerSelection";
import fuelTypeSelection from "../Form/GridComponent/helper/fuelTypeSelection";
import typeSelection from "../Form/GridComponent/helper/typeSelection";
import ROUTES from "../../routes/ROUTES";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridComponent/GridItemComponent";
import TextFieldSelect from "../Form/GridComponent/TextFieldSelect";
import DatePickerOpenTo from "../Form/GridComponent/DatePicker";
import NumberInput from "../Form/GridComponent/NumberInput";
import TexFieldSelectForType from "../Form/GridComponent/TexFieldSelectForType";

const CreateCar = () => {
  const [inputState] = useState({
    //type: "",
    subType: "",
    kilometers: "",
    engineType: "",
    phone: "",
    email: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
  });
  const [manufacturerSelected, setManufacturerSelected] = useState("ALL");
  const [previousOwners, setPreviousOwners] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [type, setType] = useState("");
  const [btnDisable, setbtnDisable] = useState(true);
  const [yearOfProductionSelected, setYearOfProduction] = useState(
    dayjs("2022-04-17")
  );
  //const [manuRelatedToType, setManuRelatedToType] = useState("");
  const navigate = useNavigate();

  const handleBtnSubmitClick = async (ev) => {
    try {
      await axios.post("/cars/", {
        manufacturerData: {
          manufacturer: manufacturerSelected,
          type: type,
          subType: inputState.subType,
        },
        yearOfProduction: yearOfProductionSelected.$y,
        previousOwners: previousOwners,
        kilometers: inputState.kilometers,
        engine: {
          engineType: inputState.engineType,
          fuelType: fuelType,
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

  const handleBtnCancelClick = () => navigate(ROUTES.MYCARDS);

  const handleBtnResetClick = () => window.location.reload();

  const updateState = (key, value) => (inputState[key] = value);

  const onBlurHandel = (submitLock) => setbtnDisable(submitLock);

  const updateSelectedManufacturer = (value) => {
    //setManuRelatedToType(value);
    setManufacturerSelected(value);
  };

  const updateSelectedFuelType = (fuelType) => setFuelType(fuelType);

  const updateSelectedType = (type) => setType(type);

  const updateSelectedYear = (year) => setYearOfProduction(year);

  const updateSelectedPrevOwners = (hands) => setPreviousOwners(hands);

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
                passSelectedFromChildToParent={updateSelectedManufacturer}
                listOfSelection={carManufacturerSelection}
                inputKey={"manufacturer"}
                selectedMan={manufacturerSelected}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldSelect
                passSelectedFromChildToParent={updateSelectedFuelType}
                listOfSelection={fuelTypeSelection}
                inputKey={"fuelType"}
                selectedMan={manufacturerSelected}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TexFieldSelectForType
                passSelectedFromChildToParent={updateSelectedType}
                returnManufacturerRelatedToSelectedType={
                  updateSelectedManufacturer
                }
                listOfSelection={typeSelection[manufacturerSelected]}
                inputKey={"type"}
                selectedMan={manufacturerSelected}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedPrevOwners}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateSelectedYear}
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
