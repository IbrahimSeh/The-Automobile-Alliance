import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ROUTES from "../routes/ROUTES";
import CardComponent from "../components/Card/CardComponent";
import useQueryParams from "../hooks/useQueryParams";

const FavCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
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
      .get("/cards/get-my-fav-cards")
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
      <Typography m={3} variant="h3" color="blue">
        sorry ! ,you'r Collection of favorite cards is empty.
      </Typography>
    );
  }

  return (
    <Box className="myCardBox" mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        Collection of my favorite cards
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
              candelete={
                (payload && payload.isAdmin) ||
                (item.user_id === userID && payload && payload.biz)
              }
              // payload.isAdmin
              onEdit={handleEditFromInitialCardsArr}
              canEdit={item.user_id === userID && payload && payload.biz}
              onLike={handleLikesFromInitialCardsArr}
              disLike={false}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default FavCardsPage;
