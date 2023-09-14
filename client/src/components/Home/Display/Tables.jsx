import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Switch from "@mui/material/Switch";
import EnhancedTableToolbar from "../../Car/TableComponent/EnhancedTableToolbar";
import EnhancedTableHead from "../../Car/TableComponent/EnhancedTableHead";
import createData from "../../Car/TableComponent/helpers/createDataAsRows";
import stableSort from "../../Car/TableComponent/helpers/stableSort";
import getComparator from "../../Car/TableComponent/helpers/getComparator";
import { Button, Fade, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import VisibleRows from "../../Car/TableComponent/VisibleRows";

const Tables = ({
  carsArrFromHome,
  handleOnClick,
  handleDeleteFromInitialCarsArr,
  handleEditFromInitialCarsArr,
  handelOnLike,
  collection,
}) => {
  let apiCollection;
  if (collection === undefined) apiCollection = "cars/car";
  if (collection === "VAR") apiCollection = "VAR/VAR";
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );

  let rows = createData(carsArrFromHome);

  const clickOnCar = (event, id) => {
    event.stopPropagation();
    handleOnClick(id);
  };
  const onDelete = (id) => handleDeleteFromInitialCarsArr(id);
  const onEdit = (id) => handleEditFromInitialCarsArr(id);
  const onLike = (id) => handelOnLike(id);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeDense = (event) => setDense(event.target.checked);
  //const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleLikeBtnClick = async (event, id) => {
    event.stopPropagation();
    try {
      await axios.patch("/" + apiCollection + "-like/" + id); // /cars/:id
      window.location.reload();
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
  };

  const getIsLike = (isLike, id) => {
    if (!isLoggedIn) return "";
    if (isLike)
      return (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="Dislike Car"
          placement="bottom-end"
        >
          <Button
            sx={{ color: "red" }}
            onClick={(event) => handleLikeBtnClick(event, id)}
          >
            <FavoriteRoundedIcon />
          </Button>
        </Tooltip>
      );
    if (!isLike)
      return (
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="Like Car"
          placement="bottom-end"
        >
          <Button
            sx={{ color: "brown" }}
            onClick={(event) => handleLikeBtnClick(event, id)}
          >
            <ThumbDownIcon />
          </Button>
        </Tooltip>
      );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          carArrayId={selected}
          onDelete={onDelete}
          candelete
          onEdit={onEdit}
          canEdit
          onLike={onLike}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              <VisibleRows
                rows={rows}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={selected}
                clickOnCar={clickOnCar}
                getIsLike={getIsLike}
                handleClickFromTables={handleClick}
              />
              {/* {visibleRows.map((row, index) => {
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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.manufacturer}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.yearOfProduction}</TableCell>
                    <TableCell align="right">{row.previousOwners}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      {getIsLike(isLike, row.id)}
                    </TableCell>
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
              })} */}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
export default Tables;
