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
import IsSubscriptionPR from "../components/ProtectedRoute/IsSubscriptionPR";
import IsAdminPR from "../components/ProtectedRoute/IsAdminPR";
import CarSpecification from "../components/Car/CarSpecification";
import CarEdit from "../components/Car/CarEdit";
import IsNotLoginPR from "../components/ProtectedRoute/isNotLoginPR";
import SpecificSearch from "../Pages/SpecificSearch";
import OfferedYourCarToSale from "../Pages/OfferedYourCarToSale";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SPECIFICSEARCH} element={<SpecificSearch />} />
      <Route
        path={ROUTES.OFFEREDYOURCARTOSALE}
        element={
          <IsLoginPR
            element={<IsSubscriptionPR element={<OfferedYourCarToSale />} />}
          />
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={<IsNotLoginPR element={<LogInPage />} />}
      />
      <Route
        path={ROUTES.SIGNUP}
        element={<IsNotLoginPR element={<SignUpPage />} />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={<IsLoginPR element={<UserProfilePage />} />}
      />
      <Route path={ROUTES.LOGOUT} element={<HomePage />} />
      <Route
        path={ROUTES.FAVCARS}
        element={<IsLoginPR element={<FavCarsPage />} />}
      />
      <Route
        path={ROUTES.SELLERSFROMOUTSIDE}
        element={<SellersFromOutside />}
      />
      <Route
        path={ROUTES.CREATECAR}
        element={<IsLoginPR element={<IsAdminPR element={<CreateCar />} />} />}
      />
      <Route
        path={ROUTES.REQUESTS}
        element={
          <IsLoginPR element={<IsAdminPR element={<RequestsPage />} />} />
        }
      />
      <Route path={ROUTES.CARSPECIFICATION} element={<CarSpecification />} />
      <Route
        path={ROUTES.CAREDIT}
        element={<IsLoginPR element={<IsAdminPR element={<CarEdit />} />} />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
