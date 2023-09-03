import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const IsLoginPR = ({ element }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return element;
  } else {
    toast.warning("you must login first");
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default IsLoginPR;
