import { Button, Fade, Tooltip } from "@mui/material";
import { Fragment } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const requestButtons = (handelThumpDownClick, handelThumpUpClick) => {
    return (
        <Fragment>
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Disagree"
                placement="bottom-end"
            >
                <Button onClick={handelThumpDownClick}>
                    <ThumbDownAltIcon />
                </Button>
            </Tooltip>
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Agree"
                placement="bottom-end"
            >
                <Button onClick={handelThumpUpClick}>
                    <ThumbUpAltIcon />
                </Button>
            </Tooltip>
        </Fragment>
    );
}
export default requestButtons;