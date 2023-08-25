import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Communications = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePhone = (event) => setPhone(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  return (
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
            required
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
  );
};

export default Communications;
