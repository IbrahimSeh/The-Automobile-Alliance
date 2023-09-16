import { useDispatch } from "react-redux";
import { timerActions } from "../redux/timer";
import { toast } from "react-toastify";



const useTimer = () => {
    const dispatch = useDispatch();
    //dispatch(timerActions.initTimer());
    return () => {
        try {
            dispatch(timerActions.initTimer());
        } catch (err) {
            console.log("err from axios", err);
            toast.error("Oops");
        }
    };
};

export default useTimer;
