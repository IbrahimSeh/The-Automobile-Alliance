import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, useNavigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
import CardComponent from "../components/Card/CardComponent";

const MyCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cards/my-cards")
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
    if (!originalCardsArr && !data) {
      return;
    }

    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }

    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(
        data.filter(
          (card) => card.title.startsWith(filter) || card._id.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) => card.title.startsWith(filter) || card._id.startsWith(filter)
        )
      );
    }
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleLikesFromInitialCardsArr = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id); // /cards/:id
      window.location.reload();
    } catch (err) {
      console.log("error when liking card", err.response.data);
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`${ROUTES.CARDEDIT}/?cardId=${id}`);
  };

  const handleOnClick = (id) => {
    navigate(`${ROUTES.CARDSPECIFICATION}/?cardId=${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  if (cardsArr.length === 0) {
    return (
      <Box className="myCardBox" mt={3}>
        <Typography m={3} variant="h3" color="blue">
          sorry ! ,you'r Collection of bussiness cards is empty.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <NavLink mt={3} to={ROUTES.CREATECARD}>
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
        Collection of my cards
      </Typography>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              img={item.image ? item.image.url : ""}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={
                item.country +
                ", " +
                item.city +
                ", " +
                item.street +
                ", " +
                item.houseNumber
              }
              id={item._id}
              clickOnCard={handleOnClick}
              bizNumber={item.bizNumber}
              userId={item.user_id}
              onDelete={handleDeleteFromInitialCardsArr}
              candelete={payload && payload.biz}
              // payload.isAdmin
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && payload.biz}
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
        <NavLink mt={3} to={ROUTES.CREATECARD}>
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
export default MyCardsPage;
