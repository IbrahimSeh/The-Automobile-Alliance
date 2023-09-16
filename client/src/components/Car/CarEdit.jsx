import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
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
import useQueryParams from "../../hooks/useQueryParams";
import UploadImage from "../Form/GridComponent/UploadImage/UploadImage";
import AlertDialogSlide from "../Dialog(Popup)/AlertDialogSlide";
import validateCarSchemaGroup3 from "../../validation/CreateCarValidation/Group1";
import updateSelectedImage from "./updateSelectedImage";

const CarEdit = () => {
  let qparams = useQueryParams();
  const [inputState] = useState({});
  const [manufacturer, setManufacturer] = useState("SKODA");
  const [previousOwners, setPreviousOwners] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [type, setType] = useState("");
  const [btnDisable1, setbtnDisable1] = useState(false);
  const [btnDisable2, setbtnDisable2] = useState(false);
  const [yearOfProductionSelected, setYearOfProduction] = useState(
    dayjs("2022-04-17")
  );
  const [url, setUrl] = useState([]);
  const [alt, setAlt] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogErrMsg, setDialogErrMsg] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cars/" + qparams.carId)
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputState[key] = data[key];
        }
        setUrl(inputState.image.url);
        setAlt(inputState.image.alt);
        delete inputState.image;
        inputState.phone = inputState.communications.phone;
        inputState.email = inputState.communications.email;
        delete inputState.communications;
        setManufacturer(inputState.manufacturerData.manufacturer);
        setType(inputState.manufacturerData.type);
        inputState.subType = inputState.manufacturerData.subType;
        delete inputState.manufacturerData;
        inputState.engineType = inputState.engine.engineType;
        setFuelType(inputState.engine.fuelType);
        delete inputState.engine;
        inputState.state = inputState.address.state;
        inputState.country = inputState.address.country;
        inputState.city = inputState.address.city;
        inputState.street = inputState.address.street;
        delete inputState.address;
        setPreviousOwners(inputState.previousOwners);
        setKilometers(inputState.kilometers);
        setYearOfProduction(dayjs(`${inputState.yearOfProduction}-04-17`));
        delete inputState.previousOwners;
        delete inputState.kilometers;
        delete inputState.yearOfProduction;
        delete inputState._id;
        delete inputState.createdAt;
        delete inputState.likes;
        delete inputState.bizNumber;
        delete inputState.__v;
        delete inputState.user_id;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputState, qparams.carId]);

  let tempItemData = [
    {
      img: url[0],
      title: alt[0],
      rows: 2,
      cols: 2,
    },
    {
      img: url[1],
      title: alt[1],
      rows: 3,
      cols: 2,
    },
    {
      img: url[2],
      title: alt[2],
      rows: 2,
      cols: 2,
    },
  ];
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
      await axios.put("/cars/" + qparams.id, {
        manufacturerData: {
          manufacturer: manufacturer,
          type: type,
          subType: inputState.subType,
        },
        yearOfProduction: yearOfProductionSelected,
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

      toast.success("the car has been edited");
      navigate(-1);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the car has been not edited");
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
          CAR UPDATE FORM
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextFieldSelect
                passSelectedFromChildToParent={updateSelectedManufacturer}
                listOfSelection={carManufacturer}
                inputKey={"manufacturer"}
                selectedManufacturerRelatedToType={manufacturer}
                inputValue={manufacturer}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TexFieldSelectForType
                passSelectedFromChildToParent={updateSelectedType}
                returnManufacturerRelatedToSelectedType={
                  updateSelectedManufacturer
                }
                listOfSelection={typeSelection[manufacturer]}
                inputKey={"type"}
                selectedManufacturer={manufacturer}
                inputValue={type}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldSelectForFuel
                passSelectedFromChildToParent={updateSelectedFuelType}
                listOfSelection={fuelTypeSelection}
                inputKey={"fuelType"}
                inputValue={fuelType}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedPrevOwners}
                inputKey={"previousOwners"}
                inputValue={previousOwners}
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
                inputValue={yearOfProductionSelected}
                label={"Year Of Production *"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                passSelectedFromChildToParent={updateSelectedKilometers}
                inputKey={"kilometers"}
                inputValue={kilometers}
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
              itemDataFromCarEdit={tempItemData}
            />
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable1 || btnDisable2}
            from={""}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CarEdit;
