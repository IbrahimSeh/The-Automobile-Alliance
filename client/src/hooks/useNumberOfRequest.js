import axios from "axios";
import { useDispatch } from "react-redux";
import { requestActions } from "../redux/requests";
//import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const useNumberOfRequest = () => {
    const dispatch = useDispatch();
    return async () => {
        axios
            .get("/VAR/From-Outside/false")
            .then(({ data }) => {
                dispatch(requestActions.setNumOfReq(data.length));
                return data.length;
            })
            .catch((err) => {
                console.log("err from axios", err);
                toast.error("Oops");
            });
    };
};

export default useNumberOfRequest;
