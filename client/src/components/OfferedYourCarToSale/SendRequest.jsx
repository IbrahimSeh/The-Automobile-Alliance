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
import AlertDialogSlide from "../Dialog(Popup)/AlertDialogSlide";
import validateCarSchemaGroup1 from "../../validation/CreateCarValidation/Group1";
import validateCarSchemaGroup3 from "../../validation/CreateCarValidation/Group3";
import useNumberOfRequest from "../../hooks/useNumberOfRequest";
import createMsgDialog from "./createMsg";

const SendRequest = () => {
  const [save, setSave] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogErrMsg, setDialogErrMsg] = useState([]);
  const navigate = useNavigate();
  const numberOfRequest = useNumberOfRequest();

  const handelClose = () => setOpenDialog(false);

  const handelClickSaveData = async () => {
    let resultfromGroup1 = validateCarSchemaGroup1({
      subType: manufacturerData.subType,
      engineType: engineData.engineType,
      phone: communicationsData.phone,
      email: communicationsData.email,
      state: addressData.state,
      country: addressData.country,
      city: addressData.city,
      street: addressData.street,
    });
    //validate manufacturer, type & fuelType
    let resultfromGroup3 = validateCarSchemaGroup3(
      manufacturerData.manufacturer,
      manufacturerData.type,
      engineData.fuelType
    );
    if (resultfromGroup3.length !== 0 || resultfromGroup1 !== null) {
      setDialogErrMsg(createMsgDialog(resultfromGroup3, resultfromGroup1));
      setOpenDialog(true);
      return;
    }

    try {
      await axios.post("/VAR/", {
        // VAR = Vehicle Advertising Requests
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
      setTimeout(() => {
        toast.success("A new vehicle advertising requests has been created");
        navigate(ROUTES.HOME);
      }, "3000");
      setSave(true);
    } catch (err) {
      console.log("error from axios", err.response);
      toast.error("the car has been not created");
    }
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
      <AlertDialogSlide
        falgToOpen={openDialog}
        closeFromCreateCar={handelClose}
        information={dialogErrMsg}
      />
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
