import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import carManufacturerSelection from "../../Form/GridComponent/helper/carManufacturerSelection";
import fuelTypeSelection from "../../Form/GridComponent/helper/fuelTypeSelection";
import typeSelection from "../../Form/GridComponent/helper/typeSelection";
import ROUTES from "../../../routes/ROUTES";
import SubmitComponent from "../../Form/SubmitComponent";
import CRComponent from "../../Form/CRComponent";
import GridItemComponent from "../../Form/GridComponent/GridItemComponent";
import TextFieldSelect from "../../Form/GridComponent/TextFieldSelect";
import DatePickerOpenTo from "../../Form/GridComponent/DatePicker";
import NumberInput from "../../Form/GridComponent/NumberInput";
import TexFieldSelectForType from "../../Form/GridComponent/TexFieldSelectForType";
import TextFieldSelectForFuel from "../../Form/GridComponent/TextFieldSelectForFuel";
import UploadImage from "../../Form/GridComponent/UploadImage/UploadImage";
import { validateSelectedField } from "./validateSelectedField";
import AlertDialogSlide from "./AlertDialogSlide";

const CreateCar = () => {
  const [inputState] = useState({
    subType: "",
    engineType: "",
    phone: "",
    email: "",
    state: "",
    country: "",
    city: "",
    street: "",
  });

  const [manufacturerSelected, setManufacturerSelected] = useState("ALL");
  const [previousOwners, setPreviousOwners] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [type, setType] = useState("");
  const [btnDisable, setbtnDisable] = useState(true);
  const [yearOfProductionSelected, setYearOfProduction] = useState(
    dayjs("2022-04-17")
  );
  const [url, setUrl] = useState([]);
  const [alt, setAlt] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [dialogErrMsg, setDialogErrMsg] = useState([]);
  const handleBtnSubmitClick = async (ev) => {
    //validate manufacturer, type & fuelType
    if (
      validateSelectedField(manufacturerSelected, type, fuelType).length !== 0
    ) {
      setDialogErrMsg(
        validateSelectedField(manufacturerSelected, type, fuelType)
      );
      setOpenDialog(true);
      return;
    }

    try {
      await axios.post("/cars/", {
        manufacturerData: {
          manufacturer: manufacturerSelected,
          type: type,
          subType: inputState.subType,
        },
        yearOfProduction: yearOfProductionSelected.$y,
        previousOwners: previousOwners,
        kilometers: kilometers,
        engine: {
          engineType: inputState.engineType,
          fuelType: fuelType,
        },
        image: { url: url, alt: alt },
        address: {
          state: inputState.state,
          country: inputState.country,
          city: inputState.city,
          street: inputState.street,
        },
        communications: { phone: inputState.phone, email: inputState.email },
      });

      toast.success("A new car has been created");
      navigate(ROUTES.ADDCAR);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the card has been not created");
    }
  };

  const handleBtnCancelClick = () => navigate(ROUTES.ADDCAR);
  const handleBtnResetClick = () => window.location.reload();
  const updateState = (key, value) => (inputState[key] = value);
  const onBlurHandel = (submitLock) => setbtnDisable(submitLock);
  const updateSelectedManufacturer = (value) => setManufacturerSelected(value);
  const updateSelectedFuelType = (fuelType) => setFuelType(fuelType);
  const updateSelectedType = (type) => setType(type);
  const updateSelectedYear = (year) => setYearOfProduction(year);
  const updateSelectedPrevOwners = (hands) => setPreviousOwners(hands);
  const updateSelectedKilometers = (KM) => setKilometers(KM);
  const updateSelectedAlt = (alt) => setAlt(alt);
  const updateSelectedUrl = (url) => setUrl(url);
  const handelClose = () => setOpenDialog(false);

  const updateSelectedImage = (event) => {
    let tempalt = [];
    if (event.target.files[0]) tempalt[0] = event.target.files[0].name;
    if (event.target.files[1]) tempalt[1] = event.target.files[1].name;
    if (event.target.files[2]) tempalt[2] = event.target.files[2].name;
    updateSelectedAlt(tempalt);
    let tempurl = [];
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();
    reader.onloadend = () => (tempurl[0] = reader.result);
    reader1.onloadend = () => (tempurl[1] = reader1.result);
    reader2.onloadend = () => (tempurl[2] = reader2.result);
    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[1]) reader1.readAsDataURL(event.target.files[1]);
    if (event.target.files[2]) reader2.readAsDataURL(event.target.files[2]);
    updateSelectedUrl(tempurl);
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
        <AlertDialogSlide
          falgToOpen={openDialog}
          closeFromCreateCar={handelClose}
          information={dialogErrMsg}
        />
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
                selectedManufacturerRelatedToType={manufacturerSelected}
                onBlur={onBlurHandel}
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
                selectedManufacturer={manufacturerSelected}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldSelectForFuel
                passSelectedFromChildToParent={updateSelectedFuelType}
                listOfSelection={fuelTypeSelection}
                inputKey={"fuelType"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedPrevOwners}
                inputKey={"previousOwners"}
                previousOwners={previousOwners}
                kilometers={kilometers}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateSelectedYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedKilometers}
                inputKey={"kilometers"}
                previousOwners={previousOwners}
                kilometers={kilometers}
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
            <UploadImage passSelectedFromChildToParent={updateSelectedImage} />
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
            FromForm={"CreateCar"}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCar;
