import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import useQueryParams from "../hooks/useQueryParams";
import InterfaceImage from "../components/Home/InterfaceImage";
import DviderLine from "../components/Home/DviderLine";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import Tabs from "../components/Home/Display/Tabs";
import Tables from "../components/Home/Display/Tables";
import { useDispatch, useSelector } from "react-redux";
import { displayActions } from "../redux/display";

const HomePage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  const toDisplay = useSelector((bigPie) => bigPie.displaySlice.display.home);
  const dispatch = useDispatch();
  let qparams = useQueryParams();
  let userID = "";

  if (localStorage.getItem("token")) {
    userID = jwt_decode(localStorage.getItem("token"))._id;
  }

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cars")
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
      await axios.delete("/cars/" + id);
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
    setRender(render + 1);
  };

  const handleEditFromInitialCarsArr = (id) => {
    navigate(`${ROUTES.CAREDIT}/?carId=${id}`);
  };

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?carId=${id}`);
  };

  const handleGetDisplayName = (nameOfDispaly) => {
    dispatch(displayActions.setDisplayPage("home"));
  };

  if (!carsArr) {
    return <CircularProgress />;
  }

  return (
    <Box mt={3}>
      <Typography mb={3} variant="h3" align="center" color="blue">
        THE AUTOMOBILE ALLIANCE
      </Typography>

      <Typography mb={3} variant="h5" color="blue">
        The most innovative and technological place to buy and sale cars on the
        market, Which vehicle you are looking for you can find on our website
        with the best and fair prices in the market
      </Typography>
      <InterfaceImage />
      <DviderLine text={"ALL THE CAR IN OUR ALLIANCE"} />
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
    </Box>
  );
};

export default HomePage;
