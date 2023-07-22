import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import jwt_decode from "jwt-decode";

const IsAdminPR = ({ element }) => {
  //* html section
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const isAdmin =
    String(
      JSON.stringify(decodeToken).split(":")[3].split(",")[0]
    ).toLowerCase() === "true";

  if (isAdmin) {
    return element;
  } else {
    toast.warning("you must login as admin user first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsAdminPR;
