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
import CRComponent from "../components/Form/FormButtons/CRComponent";
import SubmitComponent from "../components/Form/FormButtons/SubmitComponent";
import CheckboxComponent from "../components/Form/GridComponent/CheckBox/CheckboxComponent";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Button, Fade, Tooltip } from "@mui/material";
import PasswordFormDialog from "../components/Dialog(Popup)/PasswordFormDialog";

const UserProfilePage = () => {
  const [inputstate] = useState({});
  const userId = jwt_decode(localStorage.getItem("token"))._id;
  const [openDialog, setOpenDialog] = useState(false);
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
          inputstate[key] = data[key];
        }

        setChecked(inputstate.isSubscription);
        inputstate.firstName = inputstate.name.first;
        inputstate.middleName = inputstate.name.middle;
        inputstate.lastName = inputstate.name.last;
        delete inputstate.name;
        inputstate.phone1 = inputstate.phone;
        inputstate.email1 = inputstate.email;
        delete inputstate.phone;
        delete inputstate.email;
        delete inputstate.password;
        inputstate.phone = inputstate.phone1;
        inputstate.email = inputstate.email1;
        delete inputstate.phone1;
        delete inputstate.email1;
        inputstate.state = inputstate.address.state;
        inputstate.country = inputstate.address.country;
        inputstate.city = inputstate.address.city;
        inputstate.street = inputstate.address.street;
        inputstate.houseNumber = inputstate.address.houseNumber;
        inputstate.zip = inputstate.address.zip;
        delete inputstate.address;
        inputstate.url = inputstate.image.url;
        inputstate.alt = inputstate.image.alt;
        delete inputstate.image;
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
        image: {
          url: inputstate.url,
          alt: inputstate.alt,
        },
        address: {
          state: inputstate.state,
          country: inputstate.country,
          city: inputstate.city,
          street: inputstate.street,
          houseNumber: inputstate.houseNumber,
          zip: +inputstate.zip,
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

  const handleBtnCancelClick = () => navigate(ROUTES.HOME);
  const handleBtnResetClick = () => window.location.reload();
  const updateState = (key, value) => (inputstate[key] = value);
  const onBlurHandel = (submitLock) => {
    console.log("submitLock = ", submitLock);
    setbtnDisable(submitLock);
  };
  const handelOpenDialog = () => setOpenDialog(true);
  const handelClose = () => setOpenDialog(false);
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
        <PasswordFormDialog
          falgToOpen={openDialog}
          closeFromUserProfilePage={handelClose}
          userId={userId}
        />
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

            <Grid item xs={12} sm={11}>
              <CheckboxComponent
                isChecked={checked}
                passCheckBoxFromChildToParent={updatecheckBoxState}
              />
            </Grid>
            <Grid item xs={12} sm={1} sx={{ mt: -1 }}>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Reset Password"
                placement="bottom-end"
              >
                <Button onClick={handelOpenDialog}>
                  <LockResetIcon fontSize="large" />
                </Button>
              </Tooltip>
            </Grid>

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
