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

const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  id,
  clickOnCard,
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

  const handleClickCard = () => {
    clickOnCard(id);
  };

  return (
    <Card square raised onClick={handleClickCard} sx={{ borderRadius: 2 }}>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardActionArea>
        <CardHeader title={title} subheader={subTitle}></CardHeader>
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

CardComponent.propTypes = {
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

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  title: "example title",
  subTitle: "example subtitle",
  phone: "0501234567",
  address: "Country: C, State: ST, City: CT, Street: STR, houseNumber: HN",
  id: "100000000000000000000000",
  canEdit: false,
  disLike: true,
};

export default CardComponent;
