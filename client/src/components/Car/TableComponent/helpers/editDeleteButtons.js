import { Button, Fade, Tooltip } from "@mui/material";
import { Fragment } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const editDeleteButtons = (candelete, canEdit, numSelected, handleDeleteBtnClick, handleEditBtnClick) => {

    return (
        <Fragment>
            {candelete ? (
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Delete car"
                    placement="bottom-end"
                >
                    <Button sx={{ color: "#1b1b00" }} onClick={handleDeleteBtnClick}>
                        <DeleteRoundedIcon />
                    </Button>
                </Tooltip>
            ) : (
                ""
            )}
            {canEdit && numSelected < 2 ? (
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Edit One Selected"
                    placement="bottom-end"
                >
                    <Button sx={{ color: "#008e24" }} onClick={handleEditBtnClick}>
                        <EditRoundedIcon />
                    </Button>
                </Tooltip>
            ) : (
                ""
            )}
        </Fragment>);
}
export default editDeleteButtons;
