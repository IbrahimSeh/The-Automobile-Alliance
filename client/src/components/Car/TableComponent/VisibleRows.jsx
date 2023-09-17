import React, { Fragment } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {
  Button,
  Checkbox,
  Fade,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import stableSort from "./helpers/stableSort";
import getComparator from "./helpers/getComparator";
import acceptOrRejectVisibleRows from "./helpers/acceptOrRejectVisibleRows";

const VisibleRows = ({
  rows,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  clickOnCar,
  getIsLike,
  onLike,
  handleClickFromTables,
  isLoggedIn,
  handleLikeBtnClick,
  pageName,
  onAccept,
  onReject,
}) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleClick = (event, id) => {
    handleClickFromTables(event, id);
  };

  const handelThumpUpClick = async (event, id) => {
    event.stopPropagation();
    onAccept(id);
  };

  const handelThumpDownClick = async (event, id) => {
    event.stopPropagation();
    onReject(id);
  };

  return (
    <Fragment>
      {visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        const isLike = row.likes.includes(payload && payload._id)
          ? true
          : false;
        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {index}
            </TableCell>
            <TableCell align="right">{row.manufacturer}</TableCell>
            <TableCell align="right">{row.type}</TableCell>
            <TableCell align="right">{row.yearOfProduction}</TableCell>
            <TableCell align="right">{row.previousOwners}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            {pageName === "RequestsPage" ? (
              acceptOrRejectVisibleRows(
                handelThumpDownClick,
                handelThumpUpClick,
                row.id
              )
            ) : (
              <TableCell align="right">
                {getIsLike(isLike, row.id, isLoggedIn, handleLikeBtnClick)}
              </TableCell>
            )}

            <TableCell align="right">
              {
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="take a closer look"
                  placement="bottom-end"
                >
                  <Button
                    sx={{ color: "#008e24" }}
                    onClick={(event) => clickOnCar(event, row.id)}
                  >
                    <AdsClickIcon />
                  </Button>
                </Tooltip>
              }
            </TableCell>
          </TableRow>
        );
      })}
    </Fragment>
  );
};
export default VisibleRows;
