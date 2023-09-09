import {
  Avatar,
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import MultipleSelectManufacturer from "../components/SpecificSearch/MultipleSelectManufacturer";
import MultipleSelectType from "../components/SpecificSearch/MultipleSelectType";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DatePickerOpenTo from "../components/Form/GridComponent/OtherTextField/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Kilometers from "../components/SpecificSearch/Kilometers";
import PrevOwners from "../components/SpecificSearch/PrevOwners";
import CarComponent from "../components/Car/CarComponent/CarComponent";
import DviderLine from "../components/Home/DviderLine";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const SpecificSearch = () => {
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const [manufacturerArr, setManufacturerArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);
  const [fromYear, setFromYear] = useState(dayjs("1900-04-17"));
  const [toYear, setToYear] = useState(dayjs("2099-04-17"));
  const [FromKm, setFromKm] = useState(0);
  const [toKm, setToKm] = useState(0);
  const [fromPrvOwn, setFromPrvOwn] = useState(0);
  const [toPrvOwn, setToPrvOwn] = useState(0);
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const [save, setSave] = useState(false);

  //second useEffect evry time we make change on search
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const updateManufacturerArr = (value) => setManufacturerArr(value);
  const updateTypeArr = (value) => setTypeArr(value);
  const updateFromYear = (value) => setFromYear(value);
  const updateToYear = (value) => setToYear(value);
  const updateFromKm = (value) => setFromKm(value);
  const updateToKm = (value) => setToKm(value);
  const updateFromPrvOwn = (value) => setFromPrvOwn(value);
  const updateToPrvOwn = (value) => setToPrvOwn(value);

  const handelClickSendSearch = async () => {
    axios
      .get("/cars/search/", {
        params: {
          manufacturerArr: manufacturerArr,
          typeArr: typeArr,
          fromYear: fromYear.$y,
          toYear: toYear.$y,
          FromKm: FromKm,
          toKm: toKm,
          fromPrvOwn: fromPrvOwn,
          toPrvOwn: toPrvOwn,
        },
      })
      .then(({ data }) => {
        console.log("data = ", data);
        filterFunc(data);
        setTimeout(() => {
          //toast.success("you'r search request has been sent");
          //navigate(ROUTES.HOME);
        }, "3000");
        setSave(true);
        setTimeout(() => {
          setSave(false);
        }, "3000");
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  };

  const filterFunc = (data) => {
    if (!originalCarsArr && !data) {
      return;
    }

    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();
    }

    if (!originalCarsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCarsArr(data);
      setCarsArr(
        data.filter(
          (car) =>
            car.manufacturerData.manufacturer
              .toLowerCase()
              .startsWith(filter) ||
            car.manufacturerData.type.toLowerCase().startsWith(filter) ||
            car._id.startsWith(filter)
        )
      );
      return;
    }
    if (originalCarsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCarsArr = JSON.parse(JSON.stringify(originalCarsArr));
      setCarsArr(
        newOriginalCarsArr.filter(
          (car) =>
            car.manufacturerData.manufacturer
              .toLowerCase()
              .startsWith(filter) ||
            car.manufacturerData.type.toLowerCase().startsWith(filter) ||
            car._id.startsWith(filter)
        )
      );
    }
  };
  const handleDeleteFromInitialCarsArr = async (id) => {
    try {
      await axios.delete("/VAR/" + id);
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
    } catch (err) {
      toast.error("error when deleting car to publish", err.response.data);
    }
  };
  const handelOnLike = (id) => {};
  const handleEditFromInitialCarsArr = (id) => {};
  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?VARId=${id}`);
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
          <ContentPasteSearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SPECIFIC SEARCH
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">Manufacturer :</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MultipleSelectManufacturer
                passSelectedFromChildToParent={updateManufacturerArr}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MultipleSelectType
                passSelectedFromChildToParent={updateTypeArr}
                manufacturerArr={manufacturerArr}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">Year Of Production :</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateFromYear}
                label={"From Year "}
                year={"1900"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePickerOpenTo
                passSelectedFromChildToParent={updateToYear}
                label={"To Year "}
                year={"2099"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">Kilometers :</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Kilometers
                passSelectedFromChildToParent={updateFromKm}
                label={"Between"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Kilometers
                passSelectedFromChildToParent={updateToKm}
                label={"And"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">Previous Owners :</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PrevOwners
                passSelectedFromChildToParent={updateFromPrvOwn}
                label={"Between"}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PrevOwners
                passSelectedFromChildToParent={updateToPrvOwn}
                label={"And"}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              margin: "auto",
              mt: 3,
              width: "fit-content",
              alignItems: "center",
            }}
          >
            <LoadingButton
              loading={save}
              loadingPosition="start"
              startIcon={<SendIcon />}
              variant="outlined"
              onClick={handelClickSendSearch}
            >
              Send
            </LoadingButton>
          </Box>
        </Box>
      </Box>
      <Box className="myCarBox" mt={3}>
        <DviderLine text={"the result of specific search"} />
        {!carsArr || carsArr.length === 0 ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {carsArr.map((item) => (
              <Grid item xs={4} key={item._id + Date.now()}>
                <CarComponent
                  img={item.image ? item.image.url[0] : ""}
                  manufacturer={
                    item.manufacturerData
                      ? item.manufacturerData.manufacturer
                      : ""
                  }
                  type={item.manufacturerData ? item.manufacturerData.type : ""}
                  subType={
                    item.manufacturerData ? item.manufacturerData.subType : ""
                  }
                  yearOfProduction={
                    item.yearOfProduction ? item.yearOfProduction : ""
                  }
                  phone={item.phone}
                  address={
                    item.address
                      ? item.address.country +
                        ", " +
                        item.address.city +
                        ", " +
                        item.address.street
                      : ""
                  }
                  id={item._id}
                  clickOnCar={handleOnClick}
                  bizNumber={item.bizNumber}
                  userId={item.user_id}
                  onDelete={handleDeleteFromInitialCarsArr}
                  candelete={payload && payload.isAdmin}
                  onEdit={handleEditFromInitialCarsArr}
                  //Anyone can edit a car sales form from outside advertisers.
                  //The site administrator can agree or reject the publication request
                  canEdit={false}
                  onLike={handelOnLike}
                  disLike={
                    item.likes.includes(payload && payload._id) ? true : false
                  }
                  collection={"VAR"}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
export default SpecificSearch;
