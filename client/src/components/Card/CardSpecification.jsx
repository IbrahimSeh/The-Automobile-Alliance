import { Box, Typography } from "@mui/material";
import useQueryParams from "../../hooks/useQueryParams";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExtendedCardComponent from "./ExtendedCardComponent";

const CardSpecification = () => {
  let qparams = useQueryParams();
  const [inputState] = useState({});
  const [userlikeId, setuserlikeId] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios
      .get("/cards/card/" + qparams.cardId)
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
  }, [inputState, qparams.cardId]);

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
        title={inputState.title ? inputState.title : ""}
        subTitle={inputState.subTitle ? inputState.subTitle : ""}
        description={inputState.description ? inputState.description : ""}
        state={inputState.state}
        country={inputState.country ? inputState.country : ""}
        city={inputState.city ? inputState.city : ""}
        houseNumber={inputState.houseNumber ? inputState.houseNumber : ""}
        street={inputState.street ? inputState.street : ""}
        zipCode={inputState.zipcode ? inputState.zipcode : ""}
        phone={inputState.phone ? inputState.phone : ""}
        email={inputState.email ? inputState.email : ""}
        web={inputState.web}
        url={inputState.image ? inputState.image.url : ""}
        alt={inputState.image ? inputState.image.alt : ""}
        cardNumber={inputState._id ? inputState._id : ""}
        userCreated={inputState.user_id ? inputState.user_id : ""}
        favoritUsers={userlikeId}
        bizNumber={inputState.bizNumber ? inputState.bizNumber : ""}
        CardCreationDate={inputState.createdAt ? inputState.createdAt : ""}
      />
    </Box>
  );
};
export default CardSpecification;
