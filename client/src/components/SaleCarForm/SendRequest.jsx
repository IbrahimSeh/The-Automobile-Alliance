import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import axios from "axios";
import {
  manufacturerData,
  communicationsData,
  engineData,
  addressData,
  imageData,
  restData,
} from "../Pagination/arrayOfPages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import useNumberOfRequest from "../../hooks/useNumberOfRequest";

const SendRequest = () => {
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const numberOfRequest = useNumberOfRequest();

  const handelClickSaveData = async () => {
    try {
      await axios.post("/VAR/", {
        // VAR = VehicleAdvertisingRequests
        manufacturerData: {
          manufacturer: manufacturerData.manufacturer,
          type: manufacturerData.type,
          subType: manufacturerData.subType,
        },
        yearOfProduction: restData.yearOfProduction,
        previousOwners: restData.previousOwners,
        kilometers: restData.kilometers,
        engine: {
          engineType: engineData.engineType,
          fuelType: engineData.fuelType,
        },
        image: { url: imageData.src, alt: imageData.alt },
        address: {
          state: addressData.state,
          country: addressData.country,
          city: addressData.city,
          street: addressData.street,
        },
        communications: {
          phone: communicationsData.phone,
          email: communicationsData.email,
        },
      });
      numberOfRequest();
      toast.success("A new vehicle advertising requests has been created");
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response);
      toast.error("the car has been not created");
    }
    //setSave(true);
  };
  // console.log("manufacturerData in SendReq = ", manufacturerData);
  // console.log("communicationsData in SenReq", communicationsData);
  // console.log("engineData in SenReq", engineData);
  // console.log("returnAddressData in SenReq = ", addressData);
  // console.log("imageData in SenReq = ", imageData);
  // console.log("restData in SenReq = ", restData);
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
