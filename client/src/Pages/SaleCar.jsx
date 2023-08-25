import { Typography } from "@mui/material";
import PaginationComponent from "../components/Pagination/PaginationComponent";

const SaleCar = () => {
  return (
    <div>
      <Typography mt={3} variant="h3" align="center" color="blue">
        OFFERED A CAR FOR SALE
      </Typography>
      <PaginationComponent />
    </div>
  );
};
export default SaleCar;
