import { Box, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import { displayActions } from "../redux/display";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
//import CarComponent from "../components/Car/CarComponent/CarComponent";
import DviderLine from "../components/Home/DviderLine";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../components/Home/Display/Tabs";
import Tables from "../components/Home/Display/Tables";

const SellersFromOutside = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const toDisplay = useSelector(
    (bigPie) => bigPie.displaySlice.display.sellers
  );
  //const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let qparams = useQueryParams();

  useEffect(() => {
    axios
      .get("/VAR/From-Outside/true")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  //second useEffect evry time we make change on search
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

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

  const handleGetDisplayName = (nameOfDispaly) => {
    dispatch(displayActions.setDisplayPage("sellers"));
  };

  const handleDeleteFromInitialCarsArr = async (id) => {
    try {
      await axios.delete("/VAR/" + id);
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
    } catch (err) {
      toast.error("error when deleting car to publish", err.response.data);
    }
  };

  const handleEditFromInitialCarsArr = (id) => {};
  const handelOnLike = (id) => {};
  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?VARId=${id}`);
  };
  if (!carsArr || carsArr.length === 0) {
    return (
      <Fragment>
        <Typography variant="h5" color="initial" m={3}>
          The requests folder is empty
        </Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </Fragment>
    );
  }
  return (
    <Box className="myCarBox" mt={3}>
      <DviderLine text={"Offers for selling cars from outside the showroom"} />
      <ControlledOpenSpeedDial getDisplayName={handleGetDisplayName} />
      {toDisplay === false ? (
        <Tabs
          carsArrFromHome={carsArr}
          handleOnClick={handleOnClick}
          handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
          handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
        />
      ) : (
        <Tables
          carsArrFromHome={carsArr}
          handleOnClick={handleOnClick}
          handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
          handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
        />
      )}
      {/* <Grid container spacing={2}>
        {carsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CarComponent
              img={item.image ? item.image.url[0] : ""}
              manufacturer={
                item.manufacturerData ? item.manufacturerData.manufacturer : ""
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
      </Grid> */}
    </Box>
  );
};
export default SellersFromOutside;
