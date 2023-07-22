import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

const ExtendedCardComponent = ({
  title,
  subTitle,
  description,
  state,
  country,
  city,
  houseNumber,
  street,
  zipCode,
  phone,
  email,
  web,
  url,
  alt,
  cardNumber,
  userCreated,
  favoritUsers,
  bizNumber,
  CardCreationDate,
}) => {
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={url} />
      </CardActionArea>
      <CardActionArea>
        <CardHeader title={title} subheader={subTitle} alt={alt}></CardHeader>
      </CardActionArea>
      <Divider variant="middle" />
      <CardContent>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Phone :
          </Box>{" "}
          {phone}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Email :
          </Box>{" "}
          {email}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Address :
          </Box>{" "}
          {" Country: " +
            country +
            " ,State: " +
            state +
            " ,City: " +
            city +
            " ,Street: " +
            street +
            " ,HN: " +
            houseNumber}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            zipCode :
          </Box>{" "}
          {zipCode}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Card Number :
          </Box>{" "}
          {cardNumber}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            User Created Number :
          </Box>{" "}
          {userCreated}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Web :
          </Box>{" "}
          {web}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Favorit Users id:
          </Box>{" "}
          <List>
            {favoritUsers.map((item, i) => (
              <ListItem
                disablePadding
                key={Math.floor(Math.random() * 100) + Date.now()}
              >
                <ListItemText primary={i + 1 + " : " + item} />
              </ListItem>
            ))}
          </List>
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Bussiness Number :
          </Box>{" "}
          {bizNumber}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Card Creation Date :
          </Box>{" "}
          {CardCreationDate}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Card Description :
          </Box>{" "}
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

ExtendedCardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  houseNumber: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  userCreated: PropTypes.string.isRequired,
  bizNumber: PropTypes.string.isRequired,
  CardCreationDate: PropTypes.string.isRequired,
};

ExtendedCardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  url: "",
  alt: "",
  state: "",
  web: "",
};

export default ExtendedCardComponent;
