import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import jwt_decode from "jwt-decode";

const IsAdminPR = ({ element }) => {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  if (decodeToken.isAdmin) {
    return element;
  } else {
    toast.warning("you must login as admin user first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsAdminPR;
