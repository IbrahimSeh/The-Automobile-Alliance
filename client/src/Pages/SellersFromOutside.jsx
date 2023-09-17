import { Box, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { displayActions } from "../redux/display";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
import DviderLine from "../components/Home/DviderLine";
import ControlledOpenSpeedDial from "../components/Home/ControlledOpenSpeedDial";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../components/Home/Display/Tabs";
import Tables from "../components/Home/Display/Tables";

const SellersFromOutside = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const [render, setRender] = useState(0);
  const toDisplay = useSelector(
    (bigPie) => bigPie.displaySlice.display.sellers
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let qparams = useQueryParams();

  let userID = "";

  if (localStorage.getItem("token")) {
    userID = jwt_decode(localStorage.getItem("token"))._id;
  }

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
          handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
          from={"SellersFromOutSide"}
          collection={"VAR"}
        />
      ) : (
        <Tables
          carsArrFromHome={carsArr}
          handleOnClick={handleOnClick}
          handleDeleteFromInitialCarsArr={handleDeleteFromInitialCarsArr}
          handleLikeFromInitialCarsArr={handleLikeFromInitialCarsArr}
          from={"SellersFromOutSide"}
          collection={"VAR"}
        />
      )}
    </Box>
  );
};
export default SellersFromOutside;
