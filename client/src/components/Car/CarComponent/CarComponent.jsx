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
import PropTypes from "prop-types";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector } from "react-redux";
import DEFAULTCARIMAGE from "./helpers/DefaultCarImage";

const CarComponent = ({
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
  candelete,
  onEdit,
  canEdit,
  onLike,
  disLike,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );

  const handleDeleteBtnClick = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleEditBtnClick = (event) => {
    event.stopPropagation();
    onEdit(id);
  };

  const handleLikeBtnClick = (event) => {
    event.stopPropagation();
    onLike(id);
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
            Card Number :
          </Box>{" "}
          {bizNumber}
        </Typography>
      </CardContent>
      <CardActions>
        {candelete ? (
          <Button sx={{ color: "#1b1b00" }} onClick={handleDeleteBtnClick}>
            <DeleteRoundedIcon />
          </Button>
        ) : (
          ""
        )}
        {canEdit ? (
          <Button sx={{ color: "#008e24" }} onClick={handleEditBtnClick}>
            <EditRoundedIcon />
          </Button>
        ) : (
          ""
        )}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button sx={{ color: "#2196f3" }}>
            <LocalPhoneRoundedIcon />
          </Button>
          {isLoggedIn ? (
            disLike ? (
              <Button sx={{ color: "#e91616" }} onClick={handleLikeBtnClick}>
                <FavoriteRoundedIcon />
              </Button>
            ) : (
              <Button>
                {" "}
                <ThumbDownIcon
                  sx={{ color: "#606060" }}
                  onClick={handleLikeBtnClick}
                />
              </Button>
            )
          ) : (
            ""
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

CarComponent.propTypes = {
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

CarComponent.defaultProps = {
  img: DEFAULTCARIMAGE,
  title: "example title",
  subTitle: "example subtitle",
  phone: "0501234567",
  address: "Country: C, State: ST, City: CT, Street: STR, houseNumber: HN",
  id: "100000000000000000000000",
  canEdit: false,
  disLike: true,
};

export default CarComponent;