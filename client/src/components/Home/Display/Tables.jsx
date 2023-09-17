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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableToolbar from "../../Car/TableComponent/EnhancedTableToolbar";
import EnhancedTableHead from "../../Car/TableComponent/EnhancedTableHead";
import createData from "../../Car/TableComponent/helpers/createDataAsRows";
import { useSelector } from "react-redux";
import VisibleRows from "../../Car/TableComponent/VisibleRows";
import getIsLike from "../../Car/TableComponent/helpers/getIsLike";

const Tables = ({
  carsArrFromHome,
  handleOnClick,
  handleDeleteFromInitialCarsArr,
  handleEditFromInitialCarsArr,
  handleLikeFromInitialCarsArr,
  pageName,
  collection,
  onAccept,
  onReject,
  from,
}) => {
  let apiCollection;
  let rows = createData(carsArrFromHome);
  if (collection === undefined) apiCollection = "cars/car";
  if (collection === "VAR") apiCollection = "VAR/VAR";
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const clickOnCar = (event, id) => {
    event.stopPropagation();
    handleOnClick(id);
  };
  const onDelete = (id) => {
    console.log("here");
    setSelected([]);
    let lenAfterDeleteItems = rows.length - selected.length;
    let newpage = lenAfterDeleteItems % rowsPerPage;
    if (lenAfterDeleteItems < rowsPerPage || newpage === 0) {
      if (page === 0) setPage(0);
      setPage(page - 1);
    }
    handleDeleteFromInitialCarsArr(id);
  };
  const onEdit = (id) => {
    setSelected([]);
    handleEditFromInitialCarsArr(id);
  };

  const onLike = (id) => handleLikeFromInitialCarsArr(id);

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
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleLikeBtnClick = async (event, id) => {
    event.stopPropagation();
    try {
      await axios.patch("/" + apiCollection + "-like/" + id); // /cars/:id
      handleLikeFromInitialCarsArr(id);
    } catch (err) {
      console.log("error when liking car", err.response.data);
    }
  };

  const canEdit = () => {
    if (from === "SellersFromOutSide") return false;
    if (payload && payload.isAdmin) return true;
    return false;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {pageName === "RequestsPage" ? (
          ""
        ) : (
          <EnhancedTableToolbar
            numSelected={selected.length}
            carArrayId={selected}
            onDelete={onDelete}
            candelete={payload && payload.isAdmin}
            onEdit={onEdit}
            canEdit={canEdit()}
          />
        )}

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
              pageName={pageName}
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
                onLike={onLike}
                handleClickFromTables={handleClick}
                isLoggedIn={isLoggedIn}
                handleLikeBtnClick={handleLikeBtnClick}
                pageName={pageName}
                onAccept={onAccept}
                onReject={onReject}
              />
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
