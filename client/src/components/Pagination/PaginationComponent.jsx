import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { Fragment } from "react";
import { arrPaginationComponent } from "./arrayOfPages";

const PaginationComponent = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => setPage(value);

  return (
    <Fragment>
      {arrPaginationComponent[page - 1]}
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
