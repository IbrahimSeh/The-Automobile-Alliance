import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { carManufacturer } from "../Form/GridComponent/helper/carManufacturerSelection";
import fuelTypeSelection from "../Form/GridComponent/helper/fuelTypeSelection";
import typeSelection from "../Form/GridComponent/helper/typeSelection";
import SubmitComponent from "../Form/FormButtons/SubmitComponent";
import CRComponent from "../Form/FormButtons/CRComponent";
import GridItemComponent from "../Form/GridComponent/GridItemComponent";
import TextFieldSelect from "../Form/GridComponent/OtherTextField/TextFieldSelect";
import DatePickerOpenTo from "../Form/GridComponent/OtherTextField/DatePicker";
import NumberInput from "../Form/GridComponent/OtherTextField/NumberInput";
import TexFieldSelectForType from "../Form/GridComponent/OtherTextField/TexFieldSelectForType";
import TextFieldSelectForFuel from "../Form/GridComponent/OtherTextField/TextFieldSelectForFuel";
import UploadImage from "../Form/GridComponent/UploadImage/UploadImage";
import validateCarSchemaGroup3 from "../../validation/CreateCarValidation/Group3";
import AlertDialogSlide from "../Dialog(Popup)/AlertDialogSlide";
import ROUTES from "../../routes/ROUTES";
import updateSelectedImage from "./updateSelectedImage";

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

  const [manufacturer, setManufacturer] = useState("ALL");
  const [previousOwners, setPreviousOwners] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [type, setType] = useState("");
  const [btnDisable1, setbtnDisable1] = useState(true);
  const [btnDisable2, setbtnDisable2] = useState(true);
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
    let resultfromGroup3 = validateCarSchemaGroup3(
      manufacturer,
      type,
      fuelType
    );
    if (resultfromGroup3.length !== 0) {
      setDialogErrMsg(resultfromGroup3);
      setOpenDialog(true);
      return;
    }
    try {
      await axios.post("/cars/", {
        manufacturerData: {
          manufacturer: manufacturer,
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
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the car has been not created");
    }
  };

  const handleBtnCancelClick = () => navigate(-1);
  const handleBtnResetClick = () => window.location.reload();
  const updateState = (key, value) => (inputState[key] = value);
  const onBlurHandel1 = (submitLock1) => setbtnDisable1(submitLock1);
  const onBlurHandel2 = (submitLock2) => setbtnDisable2(submitLock2);
  const updateSelectedManufacturer = (value) => setManufacturer(value);
  const updateSelectedFuelType = (fuelType) => setFuelType(fuelType);
  const updateSelectedType = (type) => setType(type);
  const updateSelectedYear = (year) => setYearOfProduction(year);
  const updateSelectedPrevOwners = (hands) => setPreviousOwners(hands);
  const updateSelectedKilometers = (KM) => setKilometers(KM);
  const updateSelectedAlt = (alt) => setAlt(alt);
  const updateSelectedUrl = (url) => setUrl(url);
  const handelClose = () => setOpenDialog(false);

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
                listOfSelection={carManufacturer}
                inputKey={"manufacturer"}
                returnTypeRelatedToSelectedManufacturer={updateSelectedType}
                selectedManufacturerRelatedToType={manufacturer}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TexFieldSelectForType
                passSelectedFromChildToParent={updateSelectedType}
                listOfSelection={typeSelection[manufacturer]}
                inputKey={"type"}
                returnManufacturerRelatedToSelectedType={
                  updateSelectedManufacturer
                }
                selectedTypeRelatedToManufacturer={type}
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
                prevState={{
                  previousOwners: previousOwners,
                  kilometers: kilometers,
                }}
                onBlur={onBlurHandel2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateSelectedYear}
                label={"Year Of Production *"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedKilometers}
                inputKey={"kilometers"}
                prevState={{
                  previousOwners: previousOwners,
                  kilometers: kilometers,
                }}
                onBlur={onBlurHandel2}
              />
            </Grid>
            {Object.entries(inputState).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={value}
                  onChange={updateState}
                  onBlur={onBlurHandel1}
                  prevState={inputState}
                  schema={"car"}
                />
              </Grid>
            ))}
            <UploadImage
              passSelectedFromChildToParent={(event) =>
                updateSelectedImage(event, updateSelectedAlt, updateSelectedUrl)
              }
            />
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={!btnDisable1 && !btnDisable2}
            from={"createcar"}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCar;
