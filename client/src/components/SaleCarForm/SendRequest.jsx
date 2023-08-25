import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import {
  manufacturerData,
  communicationsData,
  engineData,
} from "../Pagination/arrayOfPages";
const SendRequest = () => {
  const [save, setSave] = useState(false);
  const handelClickSaveData = () => {
    setSave(true);
    console.log("in save data");
  };
  console.log("manufacturerData in SendReq = ", manufacturerData);
  console.log("communicationsData in SenReq", communicationsData);
  console.log("engineData in SenReq", engineData);
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
          Now you can send the information about your car to the webmaster to
          publish it
        </Typography>
        <Box
          sx={{
            margin: "auto",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <LoadingButton
            loading={save}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={handelClickSaveData}
          >
            Save
          </LoadingButton>
        </Box>
      </div>
    </Box>
  );
};
export default SendRequest;
