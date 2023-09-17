import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { displayActions } from "../redux/display";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import useQueryParams from "../hooks/useQueryParams";
import DviderLine from "../components/Home/DviderLine";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import Tabs from "../components/Home/Display/Tabs";
import Tables from "../components/Home/Display/Tables";

const FavVarsPage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const toDisplay = useSelector((bigPie) => bigPie.displaySlice.display.favVAR);
  const dispatch = useDispatch();

  let userID = "";

  if (localStorage.getItem("token")) {
    userID = jwt_decode(localStorage.getItem("token"))._id;
  }

  useEffect(() => {
    axios
      .get("/VAR/get-my-fav-vars")
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
      await axios.delete("/VAR/" + id); // /cars/:id
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

  const handleEditFromInitialCarsArr = (id) => {};

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?VARId=${id}`);
  };

  const handleGetDisplayName = (nameOfDispaly) => {
    dispatch(displayActions.setDisplayPage("favVAR"));
  };

  if (!carsArr) {
    return <CircularProgress />;
  }

  return (
    <Box mt={3}>
      {carsArr.length === 0 ? (
        <DviderLine
          text={"Collection of favorite Vehicle from other sellers is empty."}
        />
      ) : (
        <Fragment>
          <Typography mb={3} variant="h3" color="blue">
            Collection of you'r favorite Vehicle from other sellers
          </Typography>
          <ControlledOpenSpeedDial getDisplayName={handleGetDisplayName} />
          {toDisplay === false ? (
            <Tabs
              carsArrFromHome={carsArr}
              handleOnClick={handleOnClick}
              handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
              handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
              handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
              from={"SellersFromOutSide"}
              collection={"VAR"}
            />
          ) : (
            <Tables
              carsArrFromHome={carsArr}
              handleOnClick={handleOnClick}
              handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
              handleEditFromInitialCarsArr={handleEditFromInitialCarsArr}
              handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
              from={"SellersFromOutSide"}
              collection={"VAR"}
            />
          )}
        </Fragment>
      )}
    </Box>
  );
};
export default FavVarsPage;
