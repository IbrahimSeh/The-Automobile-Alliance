import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import jwt_decode from "jwt-decode";

const IsSubscriptionPR = ({ element }) => {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  if (decodeToken.isSubscription) {
    return element;
  } else {
    toast.warning("you must login as Subscription user first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsSubscriptionPR;
