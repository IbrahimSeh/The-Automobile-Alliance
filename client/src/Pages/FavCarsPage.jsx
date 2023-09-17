import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { displayActions } from "../redux/display";
import useQueryParams from "../hooks/useQueryParams";
import FavVarsPage from "./FavVarsPage";
import DviderLine from "../components/Home/DviderLine";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import Tabs from "../components/Home/Display/Tabs";
import Tables from "../components/Home/Display/Tables";

const commonStyles = {
  bgcolor: "#b39ddb",
  m: 1,
  p: 1,
  border: 3,
  borderColor: "secondary.main",
  borderRadius: 1,
};

const FavCarsPage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const dispatch = useDispatch();
  const toDisplay = useSelector((bigPie) => bigPie.displaySlice.display.favCar);
  let userID = "";

  if (localStorage.getItem("token")) {
    userID = jwt_decode(localStorage.getItem("token"))._id;
  }

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cars/get-my-fav-cars")
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
      filter = qparams.filter;
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
      await axios.delete("/cars/" + id); // /cars/:id
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleLikeFromInitialCarsArr = (id) => {
    //check if id-user exist in like array of id(car) -yes remove ide-user, else add id-user
    let index = 0;
    let tempCarsArr = carsArr;

    for (const tempCar of tempCarsArr) {
      if (tempCar._id === id) {
        if (tempCar.likes.includes(userID)) {
          //userID exsit in likes -> user like car -> convert to dislike
          index = tempCar.likes.indexOf(userID);
          delete tempCar.likes[index];
        } else {
          //userID does not exsit in likes -> add userID -> convert to like
          tempCar.likes.push(userID);
        }
      }
    }
    setCarsArr(tempCarsArr);
    setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
  };

  const handleEditFromInitialCarsArr = (id) => {
    navigate(`${ROUTES.CAREDIT}/?carId=${id}`);
  };

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?carId=${id}`);
  };
  if (!carsArr) {
    return <CircularProgress />;
  }

  const handleGetDisplayName = (nameOfDispaly) => {
    dispatch(displayActions.setDisplayPage("favCar"));
  };

  return (
    <Box mt={3}>
      <DviderLine text={"Collection of you'r favorite cars"} />
      {carsArr.length === 0 ? (
        <DviderLine
          text={
            "Collection of favorite cars from Automobile Alliance is empty."
          }
        />
      ) : (
        <Fragment>
          <Typography mb={3} variant="h3" color="blue">
            Collection of you'r favorite Vehicle from Automobile Alliance
          </Typography>
          <ControlledOpenSpeedDial getDisplayName={handleGetDisplayName} />
          {toDisplay === false ? (
            <Tabs
              carsArrFromHome={carsArr}
              handleOnClick={handleOnClick}
              handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
              handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
              handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
            />
          ) : (
            <Tables
              carsArrFromHome={carsArr}
              handleOnClick={handleOnClick}
              handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
              handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
              handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
            />
          )}
        </Fragment>
      )}
      <FavVarsPage />
    </Box>
  );
};
export default FavCarsPage;
