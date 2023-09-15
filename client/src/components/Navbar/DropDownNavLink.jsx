import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavLinkComponent from "./NavLinkComponent";
import ROUTES from "../../routes/ROUTES";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const servicesPages = [
  {
    label: "specific search",
    url: ROUTES.SPECIFICSEARCH,
  },
  {
    label: "Offered a car for sale",
    url: ROUTES.OFFEREDYOURCARTOSALE,
  },
  {
    label: "add car",
    url: ROUTES.CREATECAR,
  },
];

const DropDownNavLink = ({ onCloseNavMenw }) => {
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (ev) => {
    setAnchorEl(null);
    if (window.innerWidth < 900) {
      handelOnCloseNavMenw(ev); //problem when the screen is not on mobile size(not humburger navbar)
    }
  };
  const handelOnCloseNavMenw = (ev) => {
    onCloseNavMenw(ev);
  };
  return (
    <div>
      <Button
        sx={{ mt: -1 }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          variant="h6"
          color={"#9453a6"}
        >
          Services
          {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NavLinkComponent
          key={servicesPages[0].url}
          onClose={handleClose}
          {...servicesPages[0]}
        />
        {payload && payload.isSubscription ? (
          <NavLinkComponent
            key={servicesPages[1].url}
            onClose={handleClose}
            {...servicesPages[1]}
          />
        ) : (
          ""
        )}

        {payload && payload.isAdmin ? (
          <NavLinkComponent
            key={servicesPages[2].url}
            onClose={handleClose}
            {...servicesPages[2]}
          />
        ) : (
          ""
        )}
      </Menu>
    </div>
  );
};

export default DropDownNavLink;
