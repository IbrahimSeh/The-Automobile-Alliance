import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Toolbar, Container, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../redux/auth";
import logoutAvatar from "../../assets/images/logout.png";
import HumborgerNavbar from "./HumborgerNavbar";
import ToggleColorMode from "./ToggleColorMode";
import SearchNavBar from "./SearchNavBar";
import logo from "../../assets/images/car-showroom.png";
import DropDownNavLink from "./DropDownNavLink";

import "../../css/Navbar.css";
// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Signup",
    url: ROUTES.SIGNUP,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: <Avatar alt="logout Avatar" src={logoutAvatar} />,
    url: ROUTES.LOGOUT,
  },
  {
    label: "",
    url: ROUTES.PROFILE,
  },
];

//logged in user for humborger item
const authedPagesHumborger = [
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
];

//logged in any users
const anyUserConnected = [
  {
    label: "FAV CARDS",
    url: ROUTES.FAVCARDS,
  },
];

// logged in as biz
const userAsBiz = [
  {
    label: "MY CARDS",
    url: ROUTES.MYCARDS,
  },
];

const userAsAdmin = [
  {
    label: "SANDBOX",
    url: ROUTES.SANDBOX,
  },
];

const Navbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [imgUser, setimgUser] = React.useState("");
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      axios
        .get("/users/" + jwt_decode(token)._id)
        .then(({ data }) => {
          setimgUser(data.imageUrl);
        })
        .catch((err) => {
          console.log("err from axioas", err);
          toast.error("Oops");
        });
    }
  }, [isLoggedIn]);

  authedPages[1].label = <Avatar alt="user Avatar" src={imgUser} />;
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const dispatch = useDispatch();

  const logoutClick = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
  };

  const navbarstyle = {
    backgroundColor: "#0f0d35",
  };

  let humgorgerItem = [];
  humgorgerItem = humgorgerItem.concat(pages);

  if (isLoggedIn) {
    humgorgerItem = humgorgerItem.concat(
      anyUserConnected,
      authedPagesHumborger
    );
  } else {
    humgorgerItem = humgorgerItem.concat(notAuthPages);
  }

  if (payload && payload.biz) {
    humgorgerItem = humgorgerItem.concat(userAsBiz);
  }
  if (payload && payload.isAdmin) {
    humgorgerItem = humgorgerItem.concat(userAsAdmin);
  }

  return (
    <AppBar
      style={navbarstyle}
      className="the-NavBar"
      sx={{ width: "103%", ml: -1.5 }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar>
          <NavLink activeclassname="is-active" to="/Home">
            <Avatar alt="Logo" src={logo} />
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter((page) => page.label !== "Home")
              .map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
            {isLoggedIn
              ? anyUserConnected.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {payload && payload.biz
              ? userAsBiz.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {payload && payload.isAdmin
              ? userAsAdmin.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            <DropDownNavLink />
          </Box>
          <SearchNavBar />
          <Box sx={{ my: 2, p: 1 }}>
            <ToggleColorMode />
          </Box>

          {/* signin/notSignin navbar */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>

          <HumborgerNavbar humgorgerItem={humgorgerItem} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
