import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
import CardComponent from "../components/Car/CarComponent/CarComponent";
import DviderLine from "../components/Home/DviderLine";

const SellersFromOutside = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  let qparams = useQueryParams();

  useEffect(() => {
    axios
      .get("/VAR/true")
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
    } catch (err) {
      toast.error("error when deleting car to publish", err.response.data);
    }
  };

  const handleEditFromInitialCarsArr = (id) => {
    navigate(`${ROUTES.CAREDIT}/?carId=${id}`);
  };

  const handleLikesFromInitialCarsArr = async (id) => {
    try {
      await axios.patch("/VAR/" + id);
      setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
    } catch (err) {
      toast.error("error when liking car", err.response.data);
    }
  };
  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?carId=${id}`);
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
      <Grid container spacing={2}>
        {carsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
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
              // payload.isAdmin
              onEdit={handleEditFromInitialCarsArr}
              canEdit={payload && payload.isAdmin}
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
export default SellersFromOutside;
