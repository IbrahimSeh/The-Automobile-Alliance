import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

const DatePickerOpenTo = ({
  passSelectedFromChildToParent,
  inputValue,
  label,
  year = "2022",
}) => {
  const [YearOfProduction, setYearOfProduction] = React.useState(
    dayjs(`${year}-04-17`)
  );

  const handleChange = (event) => {
    setYearOfProduction(event);
    passSelectedFromChildToParent(event);
  };

  return (
    <Box sx={{ mt: -1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={label}
            openTo="year"
            views={["year"]}
            value={
              inputValue !== undefined ? dayjs(inputValue) : YearOfProduction
            }
            onChange={handleChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerOpenTo;
