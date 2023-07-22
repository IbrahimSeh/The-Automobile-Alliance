import * as React from "react";
import { useSelector } from "react-redux";
import { AppBar, Container, Box, Toolbar } from "@mui/material";

import ROUTES from "../../routes/ROUTES";
import FooterNavLink from "../Footer/FooterNavLink";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";

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
    label: "FAV CARDS",
    url: ROUTES.FAVCARDS,
    icon: <FavoriteBorderIcon />,
  },
];

//logged in as biz user
const bizUserConnected = [
  {
    label: "MY CARDS",
    url: ROUTES.MYCARDS,
    icon: <PortraitRoundedIcon />,
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
            {payload && payload.biz
              ? bizUserConnected.map((page) => (
                  <FooterNavLink key={page.url} {...page} />
                ))
              : ""}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BottomNavBar;
