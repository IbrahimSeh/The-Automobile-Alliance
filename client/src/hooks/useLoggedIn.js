import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";
import jwt_decode from "jwt-decode";
const useLoggedIn = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const { data } = await axios.get("/users/" + jwt_decode(token)._id);
            const payload = jwt_decode(token);
            dispatch(authActions.login(payload));
            return data;
        } catch (err) {
            console.log('error from useLoggedIn !! ' + err.message);
        }
    };
};

export default useLoggedIn;
