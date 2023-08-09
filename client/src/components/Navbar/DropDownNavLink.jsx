import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavLinkComponent from "./NavLinkComponent";
import ROUTES from "../../routes/ROUTES";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const servicesPages = [
  {
    label: "purchasecar",
    url: ROUTES.PURCHASECAR,
  },
  {
    label: "salecar",
    url: ROUTES.SALECAR,
  },
];

const DropDownNavLink = ({ onCloseNavMenw }) => {
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
      <NavLink
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
          variant="h5"
          color={"#9453a6"}
        >
          Services
          {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Typography>
      </NavLink>
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
        <NavLinkComponent
          key={servicesPages[1].url}
          onClose={handleClose}
          {...servicesPages[1]}
        />
      </Menu>
    </div>
  );
};

export default DropDownNavLink;
