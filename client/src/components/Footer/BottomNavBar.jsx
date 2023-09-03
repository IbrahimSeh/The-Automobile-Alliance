import * as React from "react";
import { useSelector } from "react-redux";
import { AppBar, Container, Box, Toolbar } from "@mui/material";

import ROUTES from "../../routes/ROUTES";
import FooterNavLink from "../Footer/FooterNavLink";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FaceIcon from "@mui/icons-material/Face";

// access to all
const pages = [
  {
    label: "About",
    url: ROUTES.ABOUT,
    icon: <InfoTwoToneIcon />,
  },
];

//logged in any users
const anyUserConnected = [
  {
    label: "FAV CARS",
    url: ROUTES.FAVCARS,
    icon: <FavoriteBorderIcon />,
  },
];

// access to all
const pages2 = [
  {
    label: "Sellers From Outside",
    url: ROUTES.SELLERSFROMOUTSIDE,
    icon: <FaceIcon />,
  },
];

const navbarstyle = {
  backgroundColor: "#0f0d35",
};

const BottomNavBar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigState) => bigState.authSlice.payload);

  return (
    <AppBar style={navbarstyle} position="static">
      <Container maxWidth="sm">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {pages
              .filter((page) => page.label !== "Home")
              .map((page) => (
                <FooterNavLink key={page.url} {...page} />
              ))}
            {isLoggedIn
              ? anyUserConnected.map((page) => (
                  <FooterNavLink key={page.url} {...page} />
                ))
              : ""}
            {pages2.map((page) => (
              <FooterNavLink key={page.url} {...page} />
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BottomNavBar;
