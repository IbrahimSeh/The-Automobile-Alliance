import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

const NavLinkComponent = ({ url, label, onClose, ...rest }) => {
  return (
    <NavLink to={url} onClick={onClose} {...rest}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          variant="h5"
          color={isActive ? "warning.main" : "#9453a6"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
