import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ROUTES from "../routes/ROUTES";
import CarComponent from "../components/Car/CarComponent/CarComponent";
import useQueryParams from "../hooks/useQueryParams";
import DviderLine from "../components/Home/DviderLine";

const FavVarsPage = () => {
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

  const handleLikesFromInitialCarsArr = async (id) => {
    setCarsArr((newCarsArr) => newCarsArr.filter((item) => item._id != id));
  };

  const handleEditFromInitialCarsArr = (id) => {};

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?VARId=${id}`);
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
                  candelete={
                    (payload && payload.isAdmin) ||
                    (item.user_id === userID &&
                      payload &&
                      payload.isSubscription)
                  }
                  onEdit={handleEditFromInitialCarsArr}
                  canEdit={false}
                  onLike={handleLikesFromInitialCarsArr}
                  disLike={true}
                  collection={"VAR"}
                />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      )}
    </Box>
  );
};
export default FavVarsPage;
