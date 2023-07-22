import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridItemComponent";
import useQueryParams from "../../hooks/useQueryParams";

const CardEdit = () => {
  let qparams = useQueryParams();
  const [value, setValue] = useState(0); // integer state

  const [inputState] = useState({
    title: "",
    subTitle: "",
    description: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
  });

  const [btnDisable, setbtnDisable] = useState(false);
  const navigate = useNavigate();

  // /cards/card/:id
  useEffect(() => {
    axios
      .get("/cards/card/" + qparams.cardId)
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputState[key] = data[key];
        }
        inputState.url = inputState.image.url;
        inputState.alt = inputState.image.alt;
        inputState.zipCode += "";
        delete inputState._id;
        delete inputState.image;
        delete inputState.createdAt;
        delete inputState.likes;
        delete inputState.bizNumber;
        delete inputState.__v;
        delete inputState.user_id;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputState, qparams.cardId]);

  const handleBtnSubmitClick = async (ev) => {
    try {
      await axios.put("/cards/" + qparams.cardId, {
        title: inputState.title,
        subTitle: inputState.subTitle,
        description: inputState.description,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        email: inputState.email,
        zipCode: inputState.zipCode,
        phone: inputState.phone,
        web: inputState.web,
        url: inputState.url,
        alt: inputState.alt,
      });

      toast.success("the card has been edited");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the card has been not edited");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.MYCARDS);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inputState.zipCode += "";
      setValue(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputState, setValue]);

  const updateState = (key, value) => {
    inputState[key] = value;
  };

  const onBlurHandel = (submitLock) => {
    console.log("onBlurHandel");
    setbtnDisable(submitLock);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          CARD UPDATE
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputState).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={inputState[key] + ""}
                  onChange={updateState}
                  onBlur={onBlurHandel}
                  prevState={inputState}
                  schema={"card"}
                />
              </Grid>
            ))}
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CardEdit;
