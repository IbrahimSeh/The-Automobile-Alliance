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
      <Grid item xs={12}>
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
      </Grid>
    </Fragment>
  );
};
export default CheckboxComponent;

CheckboxComponent.defaultProps = {
  isChecked: false,
};
