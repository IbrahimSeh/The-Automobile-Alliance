import PropTypes from "prop-types";
import FilterListIcon from "@mui/icons-material/FilterList";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Fragment } from "react";
import { Button, Fade } from "@mui/material";

const EnhancedTableToolbar = ({
  numSelected,
  carArrayId,
  onDelete,
  candelete,
  onEdit,
  canEdit,
}) => {
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
