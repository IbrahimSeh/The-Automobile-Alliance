import { Button, Fade, TableCell, Tooltip } from "@mui/material";
import { Fragment } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const acceptOrRejectVisibleRows = (handelThumpDownClick, handelThumpUpClick, rowId) => {
    return (
        <Fragment>
            <TableCell align="right">
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Disagree"
                    placement="bottom-end"
                >
                    <Button onClick={(event) => handelThumpDownClick(event, rowId)}>
                        <ThumbDownAltIcon />
                    </Button>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Agree"
                    placement="bottom-end"
                >
                    <Button onClick={(event) => handelThumpUpClick(event, rowId)}>
                        <ThumbUpAltIcon />
                    </Button>
                </Tooltip>
            </TableCell>
        </Fragment>
    );
}
export default acceptOrRejectVisibleRows;