import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { communicationsData } from "../Pagination/arrayOfPages";

const Communications = ({ passData }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //first useEffect when page load
  useEffect(() => {
    if (communicationsData.phone !== "") setPhone(communicationsData.phone);
    if (communicationsData.email !== "") setEmail(communicationsData.email);
  }, []);

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
    passData("phone", event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    passData("email", event.target.value);
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
          COMMUNICATION DATA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="phone"
              required
              fullWidth
              helperText=""
              id="phone"
              label="phone"
              autoComplete="Currect Phone"
              value={phone}
              onChange={handleChangePhone}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="email"
              fullWidth
              helperText=""
              id="email"
              label="email"
              autoComplete="Currect Email"
              value={email}
              onChange={handleChangeEmail}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Communications;
