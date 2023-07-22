//Cancel Reset  buttons
import { Button, Grid } from "@mui/material";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { Fragment } from "react";

const CRComponent = ({ cancelBtn, resetBtn }) => {
  const handleBtnCancelClick = (ev) => {
    cancelBtn(ev);
  };

  const handleBtnResetClick = (ev) => {
    resetBtn(ev);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleBtnCancelClick}
        >
          CANCEL
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleBtnResetClick}
        >
          <RotateLeftRoundedIcon />
        </Button>
      </Grid>
    </Fragment>
  );
};
export default CRComponent;
