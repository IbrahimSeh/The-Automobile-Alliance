import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const GetNumberOfRequest = () => {
    // useEffect(() => {
    axios
        .get("/VAR/false")
        .then(({ data }) => {
            return data.length;
        })
        .catch((err) => {
            console.log("err from axios", err);
            toast.error("Oops");
        });
    // }, []);
}
export default GetNumberOfRequest