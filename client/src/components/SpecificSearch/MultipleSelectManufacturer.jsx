import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import carManufacturerStringArr from "./helpers/manufacturerSelectionStringArr";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectManufacturer = ({ passSelectedFromChildToParent }) => {
  const [manufacturerArr, setManufacturerArr] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setManufacturerArr(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    passSelectedFromChildToParent(event.target.value);
  };
  //820-600
  return (
    <div>
      <FormControl
        sx={{
          minWidth:
            window.innerWidth < 820 && window.innerWidth > 600 ? 175 : 246,
          maxWidth: 246,
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label">
          Car Manufacturer
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          //value={manufacturerArr.length === 0 ? inputValue : manufacturerArr}
          value={manufacturerArr}
          onChange={handleChange}
          input={<OutlinedInput label="Car manufacturer" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {carManufacturerStringArr.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={manufacturerArr.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectManufacturer;
