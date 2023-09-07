import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Divider, List, ListItem, ListItemText } from "@mui/material";
import { validateRegisterPasswordSchema } from "../../validation/userValidation";
import { toast } from "react-toastify";

const information = [
  "A strong password is: At least 12 characters long but 14 or more is better.",
  "A combination of uppercase letters, lowercase letters, numbers, and symbols.",
  "Not a word that can be found in a dictionary or the name of a person, character, product, or organization. Significantly different from your previous passwords.",
  "Easy for you to remember but difficult for others to guess.",
  "Consider using a memorable phrase like 6MonkeysRLooking^.",
];

const PasswordFormDialog = ({
  falgToOpen,
  closeFromUserProfilePage,
  userId,
}) => {
  const [password, setPassword] = React.useState("");
  const [inputsErrorsState, setInputsErrorsState] = React.useState(null);
  let joiResponse;

  const handleClose = () => closeFromUserProfilePage();
  const handleSave = async () => {
    try {
      await axios.put("/users/setpassword/" + userId, {
        password: password,
      });
      toast.success("password has been updated");
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("password has been not updated");
    }
    closeFromUserProfilePage();
  };
  const handleInputChange = (ev) => setPassword(ev.target.value);

  const handelBlurChange = () => {
    joiResponse = validateRegisterPasswordSchema({ password: password });
    setInputsErrorsState(joiResponse);
  };

  return (
    <div>
      <Dialog open={falgToOpen} onClose={handleClose}>
        <DialogTitle>
          Reset Password <Divider />
          Password security starts with creating a strong password.
          <Divider />
        </DialogTitle>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {information &&
              information.map((value, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={`${value}`} />
                </ListItem>
              ))}
          </List>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Enter New Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handleInputChange}
            onBlur={handelBlurChange}
          />
          {inputsErrorsState && inputsErrorsState["password"] && (
            <Alert severity="warning">
              {inputsErrorsState["password"].map((item) => (
                <div key={`${"password"}-errors` + item}>
                  {item.includes("pattern:")
                    ? item.split("pattern:")[0] + "pattern"
                    : item}
                </div>
              ))}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordFormDialog;
