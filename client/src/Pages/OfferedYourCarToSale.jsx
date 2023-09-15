import { Typography } from "@mui/material";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import MouseOverPopover from "../components/Popover/MouseOverPopover";

const OfferedYourCarToSale = () => {
  return (
    <div>
      <Typography mt={3} variant="h3" align="center" color="blue">
        OFFERED YOU'R CAR TO SALE
      </Typography>
      <MouseOverPopover />
      <PaginationComponent />
    </div>
  );
};
export default OfferedYourCarToSale;
