import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import TabIcon from "@mui/icons-material/Tab";
import TocIcon from "@mui/icons-material/Toc";
import { Fade, Tooltip } from "@mui/material";

const actions = [
  { icon: <TabIcon />, name: "tabs" },
  { icon: <TocIcon />, name: "table" },
];

const ControlledOpenSpeedDial = ({ getDisplayName }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => setOpen(true);
  const handleClose = (event) => setOpen(false);

  const handleClickIcon = (event, name) => {
    getDisplayName(name);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: 50,
        transform: "translateY(0px)",
        flexGrow: 1,
        mb: 2,
      }}
    >
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Display"
        placement="bottom-end"
      >
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SmartDisplayIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(event) => handleClickIcon(event, action.name)}
            />
          ))}
        </SpeedDial>
      </Tooltip>
    </Box>
  );
};
export default ControlledOpenSpeedDial;
