import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SliderImages from "./SliderImages";

const ExtendedCarComponent = ({
  manufacturer,
  type,
  subType,
  engineType,
  fuelType,
  yearOfProduction,
  previousOwners,
  kilometers,
  state,
  country,
  city,
  street,
  phone,
  email,
  url,
  alt,
  cardNumber,
  userCreated,
  favoritUsers,
  bizNumber,
  CardCreationDate,
}) => {
  return (
    <Card square raised sx={{ borderRadius: 2 }}>
      <SliderImages sliderImages={url} alt={alt} />
      <CardActionArea>
        <CardHeader
          title={manufacturer}
          subheader={type + " " + subType}
        ></CardHeader>
      </CardActionArea>
      <Divider variant="middle" />
      <CardContent>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            alt :
          </Box>{" "}
          {alt}
        </Typography>
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
            street}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            engine :
          </Box>{" "}
          {engineType}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            fuel :
          </Box>{" "}
          {fuelType}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            year of production :
          </Box>{" "}
          {yearOfProduction}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            previous Owners :
          </Box>{" "}
          {previousOwners + " hands"}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            K"M :
          </Box>{" "}
          {kilometers}
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
      </CardContent>
    </Card>
  );
};

ExtendedCarComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  url: "",
  alt: "",
  state: "",
};

export default ExtendedCarComponent;
