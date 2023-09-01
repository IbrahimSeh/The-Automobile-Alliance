import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DEFAULTCARIMAGE from "../Car/CarComponent/helpers/DefaultCarImage";
import { toast } from "react-toastify";

const RequestsComponent = ({
  img,
  manufacturer,
  type,
  subType,
  yearOfProduction,
  phone,
  address,
  id,
  clickOnCar,
  bizNumber,
  onDelete,
  onLike,
}) => {
  const handelThumpUpClick = async (event) => {
    event.stopPropagation();
    onLike(id);
  };

  const handelThumpDownClick = async (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleClickCar = () => {
    clickOnCar(id);
  };

  return (
    <Card square raised onClick={handleClickCar} sx={{ borderRadius: 2 }}>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardActionArea>
        <CardHeader
          title={manufacturer}
          subheader={type + "   " + subType + "   " + yearOfProduction}
        ></CardHeader>
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
            Address :
          </Box>{" "}
          {address}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Car Number :
          </Box>{" "}
          {bizNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handelThumpDownClick}>
          <ThumbDownAltIcon />
        </Button>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button onClick={handelThumpUpClick}>
            <ThumbUpAltIcon />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

RequestsComponent.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  candelete: PropTypes.bool,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  clickOnCard: PropTypes.func,
  onLike: PropTypes.func,
};

RequestsComponent.defaultProps = {
  img: DEFAULTCARIMAGE,
  title: "example title",
  subTitle: "example subtitle",
  phone: "0501234567",
  address: "Country: C, State: ST, City: CT, Street: STR, houseNumber: HN",
  id: "100000000000000000000000",
  canEdit: false,
  disLike: true,
};

export default RequestsComponent;
