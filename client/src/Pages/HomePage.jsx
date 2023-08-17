import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import CarComponent from "../components/Car/CarComponent";
import useQueryParams from "../hooks/useQueryParams";
import ROUTES from "../routes/ROUTES";
import InterfaceImage from "../components/Home/InterfaceImage";
import DviderLine from "../components/Home/DviderLine";

const HomePage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
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
            car.manufacturerData.manufacturer.startsWith(filter) ||
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
            car.manufacturerData.manufacturer.startsWith(filter) ||
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

  const handleEditFromInitialCarsArr = (id) => {
    navigate(`${ROUTES.CAREDIT}/?carId=${id}`);
  };

  const handleLikesFromInitialCarsArr = async (id) => {
    try {
      await axios.patch("/cars/car-like/" + id); // /cards/:id
      window.location.reload();
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
  };
  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?carId=${id}`);
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
      <Grid container spacing={2}>
        {carsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CarComponent
              img={item.image ? item.image.url : ""}
              manufacturer={
                item.manufacturerData ? item.manufacturerData.manufacturer : ""
              }
              type={item.manufacturerData ? item.manufacturerData.type : ""}
              subType={
                item.manufacturerData ? item.manufacturerData.subType : ""
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
              candelete={
                (payload && payload.isAdmin) ||
                (item.user_id === userID && payload && payload.isSubscription)
              }
              onEdit={handleEditFromInitialCarsArr}
              canEdit={
                item.user_id === userID && payload && payload.isSubscription
              }
              onLike={handleLikesFromInitialCarsArr}
              disLike={
                item.likes.includes(payload && payload._id) ? false : true
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
