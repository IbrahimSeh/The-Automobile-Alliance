import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import GridItemComponent from "../components/Form/GridItemComponent";
import CRComponent from "../components/Form/CRComponent";
import SubmitComponent from "../components/Form/SubmitComponent";
import CheckboxComponent from "../components/Form/CheckboxComponent";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";

const UserProfilePage = () => {
  const [inputstate] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgAlt: "",
    imgUrl: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [flagIfCheckBoxUpdated, setFlagIfCheckBoxUpdated] = useState(false);
  const [btnDisable, setbtnDisable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputstate[key] = data[key];
        }
        inputstate.zipCode += "";
        inputstate.imgUrl = inputstate.imageUrl;
        inputstate.imgAlt = inputstate.imageAlt;
        setChecked(inputstate.biz);
        delete inputstate.password;
        delete inputstate.isAdmin;
        delete inputstate.biz;
        delete inputstate._id;
        delete inputstate.imageUrl;
        delete inputstate.imageAlt;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputstate]);

  const handleBtnSubmitClick = async (ev) => {
    try {
      await axios.put("/users/userInfo/", {
        firstName: inputstate.firstName,
        middleName: inputstate.middleName,
        lastName: inputstate.lastName,
        phone: inputstate.phone,
        email: inputstate.email,
        imageUrl: inputstate.imgUrl,
        imageAlt: inputstate.imgAlt,
        state: inputstate.state,
        country: inputstate.country,
        city: inputstate.city,
        street: inputstate.street,
        houseNumber: inputstate.houseNumber,
        zipCode: inputstate.zipCode,
        biz: checked,
      });
      toast.success("the user information has been updated");
      if (flagIfCheckBoxUpdated === true) {
        toast.success("Please login agin to update the application buttons");
        localStorage.removeItem("token");
        dispatch(authActions.logout());
        navigate(ROUTES.LOGIN);
      }
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the user has been not updated");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(1);
    }, 100);
    return () => clearTimeout(timer);
  }, [inputstate, setValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(2);
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputstate, setValue]);

  const handleBtnCancelClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputstate[key] = value;
  };

  const onBlurHandel = (submitLock) => {
    setbtnDisable(submitLock);
  };

  const updatecheckBoxState = (value) => {
    setFlagIfCheckBoxUpdated(!flagIfCheckBoxUpdated);
    setChecked(value);
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
        <Avatar sx={{ m: 1, bgcolor: "#945a61" }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          USER PROFILE EDIT
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputstate).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={inputstate[key] + ""}
                  onChange={updateState}
                  onBlur={onBlurHandel}
                  prevState={inputstate}
                  schema={"user"}
                />
              </Grid>
            ))}

            <CheckboxComponent
              isChecked={checked}
              passCheckBoxFromChildToParent={updatecheckBoxState}
            />
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
export default UserProfilePage;
