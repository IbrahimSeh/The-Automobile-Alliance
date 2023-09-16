import { Avatar, Fade, Tooltip } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import logoutAvatar from "../../assets/images/logout.png";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";

const pages = [
    {
        label: "Home",
        url: ROUTES.HOME,
    },
    {
        label: "About",
        url: ROUTES.ABOUT,
    },
];

//not logged in users
const notAuthPages = [
    {
        label: "Signup",
        url: ROUTES.SIGNUP,
    },
    {
        label: "Login",
        url: ROUTES.LOGIN,
    },
];

//logged in users
let authedPages = [
    {
        label: (
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="LogOut"
                placement="bottom-end"
            >
                <Avatar alt="logout Avatar" src={logoutAvatar} />
            </Tooltip>
        ),
        url: ROUTES.LOGOUT,
    },
    {
        label: "",
        url: ROUTES.PROFILE,
    },
];

//logged in user for humborger item
const authedPagesHumborger = [
    {
        label: "Logout",
        url: ROUTES.LOGOUT,
    },
    {
        label: "Profile",
        url: ROUTES.PROFILE,
    },
];

const userLoggedInLogo = [
    {
        label: (
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Favorite Cars"
                placement="bottom-end"
            >
                <FavoriteBorderTwoToneIcon fontSize="large" />
            </Tooltip>
        ),
        url: ROUTES.FAVCARS,
    },
];

const userLoggedIn = [
    {
        label: "Favorite Cars",
        url: ROUTES.FAVCARS,
    },
];
const userAsAdmin = [
    {
        label: "",
        url: ROUTES.REQUESTS,
    },
];


export { userAsAdmin, userLoggedIn, userLoggedInLogo, authedPagesHumborger, authedPages, notAuthPages, pages };