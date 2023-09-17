import { Button, Fade, Tooltip } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const getIsLike = (isLike, id, isLoggedIn, handleLikeBtnClick) => {
    if (!isLoggedIn) return "";
    if (!isLike)
        return (
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Like Car"
                placement="bottom-end"
            >
                <Button
                    sx={{ color: "red" }}
                    onClick={(event) => handleLikeBtnClick(event, id)}
                >
                    <FavoriteRoundedIcon />
                </Button>
            </Tooltip>
        );
    if (isLike)
        return (
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Dislike Car"
                placement="bottom-end"
            >
                <Button
                    sx={{ color: "brown" }}
                    onClick={(event) => handleLikeBtnClick(event, id)}
                >
                    <ThumbDownIcon />
                </Button>
            </Tooltip>
        );
};

export default getIsLike;