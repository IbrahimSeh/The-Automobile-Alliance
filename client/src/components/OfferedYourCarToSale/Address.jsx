import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addressData } from "../Pagination/arrayOfPages";

const Address = ({ passData }) => {
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  //first useEffect when page load
  useEffect(() => {
    if (addressData.state !== "") setState(addressData.state);
    if (addressData.country !== "") setCountry(addressData.country);
    if (addressData.city !== "") setCity(addressData.city);
    if (addressData.street !== "") setStreet(addressData.street);
  }, []);

  const handleChangeState = (event) => {
    setState(event.target.value);
    passData("state", event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    passData("country", event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
    passData("city", event.target.value);
  };
  const handleChangestreet = (event) => {
    setStreet(event.target.value);
    passData("street", event.target.value);
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
          ADDRESS DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"state"}
              fullWidth
              helperText=""
              id={"state"}
              label={"state"}
              value={state}
              onChange={handleChangeState}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"country"}
              required
              fullWidth
              helperText=""
              id={"country"}
              label={"country"}
              autoComplete="Currect Country"
              value={country}
              onChange={handleChangeCountry}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"city"}
              required
              fullWidth
              helperText=""
              id={"city"}
              label={"city"}
              value={city}
              onChange={handleChangeCity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name={"street"}
              required
              fullWidth
              helperText=""
              id={"street"}
              label={"street"}
              value={street}
              onChange={handleChangestreet}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Address;
