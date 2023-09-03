import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const IsNotLoginPR = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return element;
  } else {
    toast.warning("Sorry! ,you allready logged in");
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default IsNotLoginPR;
