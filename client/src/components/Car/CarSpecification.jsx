import { Box, Typography } from "@mui/material";
import useQueryParams from "../../hooks/useQueryParams";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExtendedCardComponent from "./ExtendedCarComponent/ExtendedCarComponent";

const CarSpecification = () => {
  let qparams = useQueryParams();
  const [inputState] = useState({});
  const [userlikeId, setuserlikeId] = useState([]);
  const [value, setValue] = useState(0);
  //console.log("qparams.carId = ", qparams.carId);
  useEffect(() => {
    axios
      .get("/cars/" + qparams.carId)
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputState[key] = data[key];
        }
        setuserlikeId(inputState.likes);
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputState, qparams.carId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputState.zipCode += "";
      setValue(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [setValue, inputState]);

  return (
    <Box mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        Card Specification Page
      </Typography>
      <ExtendedCardComponent
        manufacturer={
          inputState.manufacturerData
            ? inputState.manufacturerData.manufacturer
            : ""
        }
        type={
          inputState.manufacturerData ? inputState.manufacturerData.type : ""
        }
        subType={
          inputState.manufacturerData ? inputState.manufacturerData.subType : ""
        }
        engineType={inputState.engine ? inputState.engine.engineType : ""}
        fuelType={inputState.engine ? inputState.engine.fuelType : ""}
        yearOfProduction={
          inputState.yearOfProduction ? inputState.yearOfProduction : ""
        }
        previousOwners={inputState.previousOwners}
        kilometers={inputState.kilometers}
        state={inputState.address ? inputState.address.state : ""}
        country={inputState.address ? inputState.address.country : ""}
        city={inputState.address ? inputState.address.city : ""}
        street={inputState.address ? inputState.address.street : ""}
        phone={inputState.communications ? inputState.communications.phone : ""}
        email={inputState.communications ? inputState.communications.email : ""}
        url={inputState.image ? inputState.image.url : ""}
        alt={inputState.image ? inputState.image.alt[0] : ""}
        cardNumber={inputState._id}
        userCreated={inputState.user_id}
        favoritUsers={userlikeId}
        bizNumber={inputState.bizNumber}
        CardCreationDate={inputState.createdAt}
      />
    </Box>
  );
};
export default CarSpecification;
