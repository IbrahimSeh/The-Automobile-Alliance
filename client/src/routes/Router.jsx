import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";

import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";
import UserProfilePage from "../Pages/UserProfilePage";
import FavCarsPage from "../Pages/FavCarsPage";
import SellersFromOutside from "../Pages/SellersFromOutside";
import RequestsPage from "../Pages/RequestsPage";
import CreateCar from "../components/Car/CreateCar";
import PageNotFound from "../Pages/PageNotFound";
import IsLoginPR from "../components/ProtectedRoute/IsLoginPR";
import IsBizPR from "../components/ProtectedRoute/IsSubscriptionPR";
import IsAdminPR from "../components/ProtectedRoute/IsAdminPR";
import CarSpecification from "../components/Car/CarSpecification";
import CarEdit from "../components/Car/CarEdit";
import IsNotLoginPR from "../components/ProtectedRoute/isNotLoginPR";
import PurchaseCar from "../Pages/PurchaseCar";
import SaleCar from "../Pages/SaleCar";
import AdminLogInPage from "../Pages/AdminLogInPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.PURCHASECAR} element={<PurchaseCar />} />
      <Route path={ROUTES.SALECAR} element={<SaleCar />} />
      <Route
        path={ROUTES.LOGIN}
        element={<IsNotLoginPR element={<LogInPage />} />}
      />
      <Route
        path={ROUTES.ADMINLOGIN}
        element={<IsNotLoginPR element={<AdminLogInPage />} />}
      />
      <Route
        path={ROUTES.SIGNUP}
        element={<IsNotLoginPR element={<SignUpPage />} />}
      />
      <Route path={ROUTES.PROFILE} element={<UserProfilePage />} />
      <Route path={ROUTES.LOGOUT} element={<HomePage />} />
      <Route
        path={ROUTES.FAVCARS}
        element={<IsLoginPR element={<FavCarsPage />} />}
      />
      <Route
        path={ROUTES.SELLERSFROMOUTSIDE}
        element={
          <IsLoginPR element={<IsAdminPR element={<SellersFromOutside />} />} />
        }
      ></Route>
      <Route path={ROUTES.CREATECAR} element={<CreateCar />} />
      <Route
        path={ROUTES.REQUESTS}
        element={
          <IsLoginPR
            element={
              <IsBizPR element={<IsAdminPR element={<RequestsPage />} />} />
            }
          />
        }
      />
      <Route path={ROUTES.CARSPECIFICATION} element={<CarSpecification />} />
      <Route path={ROUTES.CAREDIT} element={<CarEdit />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
