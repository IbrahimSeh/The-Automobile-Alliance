import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const useGetImgUser = () => {
    const isLoggedIn = useSelector(
        (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
    );
    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            axios
                .get("/users/" + jwt_decode(token)._id)
                .then(({ data }) => {
                    console.log('data.image.url = ', data.image.url);
                    return (data.image.url);
                })
                .catch((err) => {
                    console.log("err from axioas", err);
                    toast.error("Oops");
                });
        }
    }, [isLoggedIn]);

};

export default useGetImgUser;