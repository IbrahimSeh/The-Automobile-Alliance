import { TextField } from "@mui/material";
import { useState } from "react";

const PrevOwners = ({ passSelectedFromChildToParent, label }) => {
  const [prvOwn, setPrvOwn] = useState(0);

  const handleChange = (event) => {
    setPrvOwn(event.target.value);
    passSelectedFromChildToParent(event.target.value);
  };

  return (
    <TextField
      sx={{ maxWidth: 246 }}
      autoComplete={"given-"}
      name={"PrvOwn"}
      fullWidth
      label={label}
      value={prvOwn}
      type="number"
      onChange={handleChange}
      InputProps={{ inputProps: { min: 0, max: 300 } }}
    />
  );
};
export default PrevOwners;
