import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "../redux/auth";

const useLogout = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            //check if user not loggin
            const token = localStorage.getItem("token");
            if (!token)
                return;

            localStorage.removeItem("token");
            dispatch(authActions.logout());
            toast.warning("Delayed for 10 second you are logged out automatically.");
            console.log('Delayed for 3 second you are logged out automatically.');
        } catch (err) {
            console.log('error from useLogout !! ' + err.message);
        }
    };



}

export default useLogout;