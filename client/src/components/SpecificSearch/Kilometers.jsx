import { TextField } from "@mui/material";
import { useState } from "react";

const Kilometers = ({ passSelectedFromChildToParent, label }) => {
  const [Km, setKm] = useState(0);

  const handleChange = (event) => {
    setKm(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };

  return (
    <TextField
      sx={{ maxWidth: 246 }}
      autoComplete={"given-"}
      name={"Km"}
      fullWidth
      label={label}
      value={Km}
      type="number"
      onChange={handleChange}
      InputProps={{ inputProps: { min: 0, max: 2000000 } }}
    />
  );
};
export default Kilometers;
