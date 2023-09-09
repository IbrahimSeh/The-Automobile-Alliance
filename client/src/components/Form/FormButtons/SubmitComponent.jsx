import { Button } from "@mui/material";
import { Fragment } from "react";

const SubmitComponent = ({ onClick, disablebtn, from }) => {
  const handleBtnSubmitClick = (ev) => {
    onClick(ev);
  };
  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: "#673ab7" }}
        onClick={handleBtnSubmitClick}
        disabled={from === "createcar" ? !disablebtn : disablebtn}
      >
        SUBMIT
      </Button>
    </Fragment>
  );
};
export default SubmitComponent;
