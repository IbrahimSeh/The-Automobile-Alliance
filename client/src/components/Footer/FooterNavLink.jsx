import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

/* <NavLinkComponent url="http://......" label="something" onClick={handleOnClick} className="red-back-ground" />
   url, label, onClick, className

  rest = {
    onCLick,
    className
  }
*/

const FooterNavLink = ({ url, label, icon, ...rest }) => {
  return (
    // <NavLink to={url} onClick={onClick} className={className}>
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
