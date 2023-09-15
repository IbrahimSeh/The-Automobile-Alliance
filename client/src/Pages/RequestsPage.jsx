import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import useQueryParams from "../hooks/useQueryParams";
import ROUTES from "../routes/ROUTES";
import RequestsComponent from "../components/Requests/RequestsComponent";
import useNumberOfRequest from "../hooks/useNumberOfRequest";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import { useDispatch, useSelector } from "react-redux";
import { displayActions } from "../redux/display";
import Tables from "../components/Home/Display/Tables";
import Tabs from "../components/Home/Display/Tabs";

const RequestsPage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const toDisplay = useSelector(
    (bigPie) => bigPie.displaySlice.display.requests
  );
  const numberOfRequest = useNumberOfRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let qparams = useQueryParams();

  useEffect(() => {
    axios
      .get("/VAR/From-Outside/false")
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

  const handleDeleteFromInitialCarsArr = async (id) => {
    try {
      await axios.delete("/VAR/" + id);
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
      numberOfRequest();
    } catch (err) {
      toast.error("error when deleting car to publish", err.response.data);
    }
  };

  const handleLikesFromInitialCarsArr = async (id) => {
    try {
      await axios.patch("/VAR/" + id);
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
      numberOfRequest();
    } catch (err) {
      toast.error("error when liking car", err.response.data);
    }
  };
  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?VARId=${id}`);
  };
  const handleGetDisplayName = (nameOfDispaly) => {
    dispatch(displayActions.setDisplayPage("requests"));
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
    <Box mt={3}>
      <Typography mb={3} variant="h3" align="center" color="blue">
        All Requests
      </Typography>
      <ControlledOpenSpeedDial getDisplayName={handleGetDisplayName} />
      {toDisplay === false ? (
        <Tabs
          carsArrFromHome={carsArr}
          handleOnClick={handleOnClick}
          pageName={"RequestsPage"}
        />
      ) : (
        <Tables
          carsArrFromHome={carsArr}
          handleOnClick={handleOnClick}
          pageName={"RequestsPage"}
          // handleDeleteFromInitialCarsArr
          // handleEditFromInitialCarsArr
        />
      )}
      {/* <Grid container spacing={2}>
        {carsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <RequestsComponent
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
              onDelete={handleDeleteFromInitialCarsArr}
              onLike={handleLikesFromInitialCarsArr}
            />
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
};
export default RequestsPage;
