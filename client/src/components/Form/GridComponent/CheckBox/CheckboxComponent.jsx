import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

const CheckboxComponent = ({ isChecked, passCheckBoxFromChildToParent }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(isChecked);
    }, 300);
    return () => clearTimeout(timer);
  }, [isChecked]);

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
    passCheckBoxFromChildToParent(event.target.checked);
  };
  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            name="isSubscription"
            id="isSubscription"
            checked={checked}
            onChange={handleCheckBoxChange}
            inputProps={{ "aria-label": "controlled" }}
            color="primary"
          />
        }
        label="Sign Up as Subscription ?"
      />
    </Fragment>
  );
};
export default CheckboxComponent;

CheckboxComponent.defaultProps = {
  isChecked: false,
};
