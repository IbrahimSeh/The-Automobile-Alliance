import PropTypes from "prop-types";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Fragment } from "react";
import { Button, Fade } from "@mui/material";
import { useSelector } from "react-redux";

const EnhancedTableToolbar = ({
  numSelected,
  carArrayId,
  onDelete,
  candelete,
  onEdit,
  canEdit,
  onLike,
  disLike,
  collection,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  let apiCollection;
  if (collection === undefined) apiCollection = "cars/car";
  if (collection === "VAR") apiCollection = "VAR/VAR";

  const handleEditBtnClick = (event) => {
    event.stopPropagation();
    onEdit(carArrayId[0]);
  };

  const handleDeleteBtnClick = (event) => {
    event.stopPropagation();
    for (const carId of carArrayId) {
      onDelete(carId);
    }
  };

  const handleLikeBtnClick = async (event) => {
    event.stopPropagation();
    try {
      await axios.patch("/" + apiCollection + "-like/" + carArrayId); // /cars/:id
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
    onLike(carArrayId);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Automobile Alliance Cars
        </Typography>
      )}

      {numSelected > 0 ? (
        <Fragment>
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
          {canEdit && numSelected < 2 ? (
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Edit One Selected"
              placement="bottom-end"
            >
              <Button sx={{ color: "#008e24" }} onClick={handleEditBtnClick}>
                <EditRoundedIcon />
              </Button>
            </Tooltip>
          ) : (
            ""
          )}
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
        </Fragment>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
