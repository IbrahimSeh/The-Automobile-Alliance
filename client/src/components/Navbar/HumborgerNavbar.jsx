import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DropDownNavLink from "./DropDownNavLink";

const HumborgerNavbar = ({ humgorgerItem }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log("on handleCloseNavMenu");
    setAnchorElNav(null);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        flex: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {humgorgerItem.map((page) => (
          <MenuItem key={"miniLinks" + page.url} onClick={handleCloseNavMenu}>
            <NavLink to={page.url}>
              {/* if the current page and the link is the same then it will change the color of the link */}
              {({ isActive }) => (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: `${isActive ? "warning.main" : "#9453a6"}`,
                  }}
                >
                  {page.label}
                </Typography>
              )}
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem>
          <DropDownNavLink onCloseNavMenw={handleCloseNavMenu} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HumborgerNavbar;
