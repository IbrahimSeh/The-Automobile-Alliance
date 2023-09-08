import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import getTypeSelectionStringArr from "./helpers/getTypeSelectionStringArr";
import checkIfManufacturerExist from "./helpers/checkIfManufacturerExist";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectType = ({
  passSelectedFromChildToParent,
  manufacturerArr,
}) => {
  const theme = useTheme();
  const [typeArr, setTypeArr] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTypeArr(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    passSelectedFromChildToParent(event.target.value);
  };

  const getValue = () => {
    if (typeArr.length !== 0)
      return checkIfManufacturerExist(manufacturerArr, typeArr);
    else return typeArr;
  };
  return (
    <div>
      <FormControl sx={{ minWidth: 246, maxWidth: 300 }}>
        <InputLabel id="demo-multiple-Type-label">Car Type</InputLabel>
        <Select
          labelId="demo-multiple-Type-label"
          id="demo-multiple-Type"
          multiple
          value={getValue()}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-Type" label="Type" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {getTypeSelectionStringArr(manufacturerArr).map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, typeArr, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectType;
