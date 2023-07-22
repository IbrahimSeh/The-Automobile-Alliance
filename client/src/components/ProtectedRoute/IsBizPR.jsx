import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import jwt_decode from "jwt-decode";

const IsBizPR = ({ element }) => {
  //* html section
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const isBiz =
    String(
      JSON.stringify(decodeToken).split(":")[2].split(",")[0]
    ).toLowerCase() === "true";

  if (isBiz) {
    return element;
  } else {
    toast.warning("you must login as bussiness user first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsBizPR;
