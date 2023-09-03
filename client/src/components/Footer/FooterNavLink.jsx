import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
const FooterNavLink = ({ url, label, icon, ...rest }) => {
  return (
    <NavLink to={url} {...rest}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          variant="h6"
          // color={isActive ? "warning.main" : "#9453a6"}
        >
          {icon}

          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default FooterNavLink;
