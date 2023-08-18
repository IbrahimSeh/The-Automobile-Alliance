import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, useNavigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
import CardComponent from "../components/Car/CarComponent";

const MyCarsPage = () => {
  const [originalCarsArr, setOriginalCarsArr] = useState(null);
  const [carsArr, setCarsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cars/my-cars")
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
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCarsArr));
      setCarsArr(
        newOriginalCardsArr.filter(
          (car) =>
            car.manufacturerData.manufacturer.startsWith(filter) ||
            car._id.startsWith(filter)
        )
      );
    }
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cars/" + id); // /cards/:id
      setCarsArr((newCardsArr) => newCardsArr.filter((item) => item._id != id));
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleLikesFromInitialCardsArr = async (id) => {
    try {
      await axios.patch("/cars/car-like/" + id); // /cards/:id
      window.location.reload();
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`${ROUTES.CAREDIT}/?carId=${id}`);
  };

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARSPECIFICATION}/?carId=${id}`);
  };

  if (!carsArr) {
    return <CircularProgress />;
  }

  if (carsArr.length === 0) {
    return (
      <Box className="myCardBox" mt={3}>
        <Typography m={3} variant="h3" color="blue">
          sorry ! ,you'r Collection cars is empty.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <NavLink mt={3} to={ROUTES.CREATECAR}>
            <AddCircleIcon
              sx={{
                color: "blue",
                borderRadius: "50%",
                "&:hover": { color: "#673ab7" },
                fontSize: "80px",
              }}
            />
          </NavLink>
        </Grid>
      </Box>
    );
  }

  return (
    <Box className="myCardBox" mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        Collection of my cars
      </Typography>
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
              onDelete={handleDeleteFromInitialCardsArr}
              candelete={payload && payload.isAdmin}
              // payload.isAdmin
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && payload.isAdmin}
              onLike={handleLikesFromInitialCardsArr}
              disLike={
                item.likes.includes(payload && payload._id) ? false : true
              }
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <NavLink mt={3} to={ROUTES.CREATECAR}>
          <AddCircleIcon
            sx={{
              color: "blue",
              borderRadius: "50%",
              "&:hover": { color: "#673ab7" },
              fontSize: "80px",
            }}
          />
        </NavLink>
      </Grid>
    </Box>
  );
};
export default MyCarsPage;
