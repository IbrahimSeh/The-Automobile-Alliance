import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { Fragment } from "react";
import arrPaginationComponent from "./arrayOfPages";

const PaginationComponent = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => setPage(value);

  return (
    <Fragment>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {arrPaginationComponent[page - 1]}
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <Pagination
          sx={{ mt: 3 }}
          count={arrPaginationComponent.length}
          page={page}
          siblingCount={0}
          onChange={handleChange}
        />
      </Box>
    </Fragment>
  );
};
export default PaginationComponent;
