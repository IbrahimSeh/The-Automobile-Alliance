import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
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
import GridItemComponent from "../components/Form/GridComponent/GridItemComponent";
import CRComponent from "../components/Form/CRComponent";
import SubmitComponent from "../components/Form/SubmitComponent";
import CheckboxComponent from "../components/Form/CheckboxComponent";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";

const UserProfilePage = () => {
  const [inputstate] = useState({});
  const userId = jwt_decode(localStorage.getItem("token"))._id;
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [flagIfCheckBoxUpdated, setFlagIfCheckBoxUpdated] = useState(false);
  const [btnDisable, setbtnDisable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/users/" + userId)
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          console.log("key = ", key);
          inputstate[key] = data[key];
        }

        setChecked(inputstate.isSubscription);
        inputstate.firstName = inputstate.name.first;
        inputstate.middleName = inputstate.name.middle;
        inputstate.lastName = inputstate.name.last;
        delete inputstate.name;
        inputstate.state = inputstate.address.state;
        inputstate.country = inputstate.address.country;
        inputstate.city = inputstate.address.city;
        inputstate.street = inputstate.address.street;
        inputstate.houseNumber = inputstate.address.houseNumber;
        inputstate.zipCode = inputstate.address.zip;
        delete inputstate.address;
        inputstate.url = inputstate.image.url;
        inputstate.alt = inputstate.image.alt;
        delete inputstate.image;
        // inputstate.phone = inputstate.phone + "";
        // inputstate.email = inputstate.email + "";
        // inputstate.password = inputstate.password + "";
        delete inputstate.isAdmin;
        delete inputstate.isSubscription;
        delete inputstate._id;
        delete inputstate.__v;
        delete inputstate.createdAt;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputstate, userId]);
  console.log("inputstate = ", inputstate);
  const handleBtnSubmitClick = async (ev) => {
    try {
      await axios.put("/users/" + userId, {
        name: {
          first: inputstate.firstName,
          middle: inputstate.middleName,
          last: inputstate.lastName,
        },
        phone: inputstate.phone,
        email: inputstate.email,
        password: inputstate.password,
        image: {
          url: inputstate.imageUrl,
          alt: inputstate.imageAlt,
        },
        address: {
          state: inputstate.state,
          country: inputstate.country,
          city: inputstate.city,
          street: inputstate.street,
          houseNumber: inputstate.houseNumber,
          zip: +inputstate.zipCode,
        },
        isSubscription: checked,
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

  const handleBtnCancelClick = () => navigate(ROUTES.HOME);
  const handleBtnResetClick = () => window.location.reload();
  const updateState = (key, value) => (inputstate[key] = value);
  const onBlurHandel = (submitLock) => setbtnDisable(submitLock);
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
