import { List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const PageNotFound = () => {
  return (
    <div>
      <Typography variant="h3" color="initial">
        Oops! You seem to be lost
      </Typography>
      <Typography variant="h5" color="initial">
        Here are some helpful links:
      </Typography>

      <List>
        <ListItem disablePadding>
          <NavLink to={ROUTES.HOME}>Home</NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink to={ROUTES.ABOUT}>About</NavLink>
        </ListItem>
        <ListItem disablePadding>
          <NavLink to={ROUTES.LOGIN}>LogIn</NavLink>
        </ListItem>
      </List>
    </div>
  );
};

export default PageNotFound;
