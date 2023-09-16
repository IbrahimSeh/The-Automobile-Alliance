import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "./auth";

const Logout = () => {
    //const dispatch = useDispatch();
    //check if user not loggin
    const token = localStorage.getItem("token");
    if (!token) {
        console.log('in if not loggin'); return;
    }
    //localStorage.removeItem("token");
    //dispatch(authActions.logout());
    //toast.warning("Delayed for 3 second you are logged out automatically.");
    console.log('Delayed for 3 second you are logged out automatically.');
}

export default Logout;