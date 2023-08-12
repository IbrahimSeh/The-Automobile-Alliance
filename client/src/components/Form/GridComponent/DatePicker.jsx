import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerOpenTo = ({ passSelectedFromChildToParent }) => {
  const [YearOfProduction, setYearOfProduction] = React.useState(
    dayjs("2022-04-17")
  );
  const handleChange = (event) => {
    setYearOfProduction(event);
    passSelectedFromChildToParent(event);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={'"year of production"'}
          openTo="year"
          views={["year"]}
          value={YearOfProduction}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerOpenTo;
