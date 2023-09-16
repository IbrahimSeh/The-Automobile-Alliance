import {
  Alert,
  Box,
  Grid,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { carManufacturer } from "../Form/GridComponent/helper/carManufacturerSelection";
import typeSelection from "../Form/GridComponent/helper/typeSelection";
import { useEffect, useState } from "react";
import { manufacturerData } from "../Pagination/arrayOfPages";
import validateManufacturerDataSchema from "../../validation/OfferedCarToSale/ManufacturerData";

const ManufacturerData = ({ passData }) => {
  const [manufacturer, setManufacturer] = useState("ALL");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  //validate
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;

  //Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  //first useEffect when page load
  useEffect(() => {
    if (manufacturerData.manufacturer !== "")
      setManufacturer(manufacturerData.manufacturer);
    if (manufacturerData.type !== "") setType(manufacturerData.type);
    if (manufacturerData.subType !== "") {
      setSubType(manufacturerData.subType);
      handleBlurSubType();
    }
  }, []);

  const handleChangeManufacturer = (event) => {
    if (manufacturer !== "ALL" && type !== "") setType("");
    setManufacturer(event.target.value);
    passData("manufacturer", event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    passData("type", event.target.value);
  };
  const handleChangeSubType = (event) => {
    setSubType(event.target.value);
    passData("subType", event.target.value);
  };
  const handleBlurSubType = () => {
    joiResponse = validateManufacturerDataSchema({ subType });
    setInputsErrorsState(joiResponse);
  };
  const getDisable = () => {
    if (manufacturer === "ALL") return true;
    return false;
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Typography mb={3} variant="h3" align="center" color="blue">
          MANUFACTURER DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="manufacturer"
              label=""
              name="given-manufacturer"
              helperText="Please select your manufacturer *"
              select
              required
              fullWidth
              value={manufacturer === "ALL" ? "" : manufacturer}
              onChange={handleChangeManufacturer}
            >
              {carManufacturer.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            {manufacturer === "ALL" ? (
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  first of all select manufacturer.
                </Typography>
              </Popover>
            ) : (
              ""
            )}
            <TextField
              aria-owns="mouse-over-popover"
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              id="type"
              name="given-type"
              select
              label=""
              helperText="Please select your type *"
              fullWidth
              required
              value={type}
              onChange={handleChangeType}
              disabled={getDisable()}
            >
              {typeSelection[manufacturer].map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="subType"
              name="given-subtype"
              label="sub type"
              fullWidth
              value={subType}
              onChange={handleChangeSubType}
              onBlur={handleBlurSubType}
            />
            {inputsErrorsState && inputsErrorsState["subType"] && (
              <Alert severity="warning">
                {inputsErrorsState["subType"].map((item) => (
                  <div key={`${"subType"}-errors` + item}>
                    {item.includes("pattern:")
                      ? item.split("pattern:")[0] + "pattern"
                      : item}
                  </div>
                ))}
              </Alert>
            )}
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default ManufacturerData;
