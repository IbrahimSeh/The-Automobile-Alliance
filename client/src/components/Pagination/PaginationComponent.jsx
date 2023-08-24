import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { Fragment } from "react";
import ManufacturerData from "../SaleCarForm/ManufacturerData";
import CountrySelect from "../Form/GridComponent/OtherTextField/CountrySelect";
import DatePickerOpenTo from "../Form/GridComponent/OtherTextField/DatePicker";

const arrPaginationComponent = [];
arrPaginationComponent[0] = <ManufacturerData />;
arrPaginationComponent[1] = <DatePickerOpenTo />;
arrPaginationComponent[2] = <CountrySelect />;

const PaginationComponent = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    console.log("value = ", value);
    console.log("arr = ", arrPaginationComponent[value]);
    setPage(value);
  };

  return (
    <Fragment>
      <Box
        sx={{
          margin: "auto",
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <Typography fontSize={32} align="center">
          Page: {page}
        </Typography>
        {arrPaginationComponent[page - 1]}
        <Pagination
          sx={{ mt: 3 }}
          count={3}
          page={page}
          siblingCount={0}
          onChange={handleChange}
        />
      </Box>
    </Fragment>
  );
};
export default PaginationComponent;
