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
  Tooltip,
  Fade,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector } from "react-redux";
import DEFAULTCARIMAGE from "./helpers/DefaultCarImage";
//import ControlledOpenSpeedDial from "./ControlledOpenSpeedDial";

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
  disLike,
  onLike,
  collection,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  //const [likeFlag, setLikeFlag] = useState(disLike);
  let apiCollection;
  if (collection === undefined) apiCollection = "cars/car";
  if (collection === "VAR") apiCollection = "VAR/VAR";

  const handleDeleteBtnClick = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleEditBtnClick = (event) => {
    event.stopPropagation();
    onEdit(id);
  };

  const handleLikeBtnClick = async (event) => {
    event.stopPropagation();
    try {
      await axios.patch("/" + apiCollection + "-like/" + id); // /cars/:id
      onLike(id);
      //window.location.reload();
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
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
        {candelete ? (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Delete car"
            placement="bottom-end"
          >
            <Button sx={{ color: "#1b1b00" }} onClick={handleDeleteBtnClick}>
              <DeleteRoundedIcon />
            </Button>
          </Tooltip>
        ) : (
          ""
        )}
        {canEdit ? (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Edit car"
            placement="bottom-end"
          >
            <Button sx={{ color: "#008e24" }} onClick={handleEditBtnClick}>
              <EditRoundedIcon />
            </Button>
          </Tooltip>
        ) : (
          ""
        )}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Call seller"
            placement="bottom-end"
          >
            <Button
              sx={{ color: "#2196f3" }}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
            >
              <LocalPhoneRoundedIcon />
            </Button>
          </Tooltip>
          {isLoggedIn ? (
            disLike ? (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Dislike"
                placement="bottom-end"
              >
                <Button>
                  {" "}
                  <ThumbDownIcon
                    sx={{ color: "#606060" }}
                    onClick={handleLikeBtnClick}
                  />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Like"
                placement="bottom-end"
              >
                <Button sx={{ color: "#e91616" }} onClick={handleLikeBtnClick}>
                  <FavoriteRoundedIcon />
                </Button>
              </Tooltip>
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
