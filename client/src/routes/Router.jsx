import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";

import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";
import UserProfilePage from "../Pages/UserProfilePage";
import FavCardsPage from "../Pages/FavCardsPage";
import MyCardsPage from "../Pages/MyCardsPage";
import SandBoxPage from "../Pages/SandBoxPage";
import CreateCard from "../components/Card/CreateCard";
import PageNotFound from "../Pages/PageNotFound";
import IsLoginPR from "../components/ProtectedRoute/IsLoginPR";
import IsBizPR from "../components/ProtectedRoute/IsBizPR";
import IsAdminPR from "../components/ProtectedRoute/IsAdminPR";
import CardSpecification from "../components/Card/CardSpecification";
import CardEdit from "../components/Card/CardEdit";
import IsNotLoginPR from "../components/ProtectedRoute/isNotLoginPR";
import PurchaseCar from "../Pages/PurchaseCar";
import SaleCar from "../Pages/SaleCar";

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
        path={ROUTES.SIGNUP}
        element={<IsNotLoginPR element={<SignUpPage />} />}
      />
      <Route path={ROUTES.PROFILE} element={<UserProfilePage />} />
      <Route path={ROUTES.LOGOUT} element={<HomePage />} />
      <Route
        path={ROUTES.FAVCARDS}
        element={<IsLoginPR element={<FavCardsPage />} />}
      />
      <Route
        path={ROUTES.MYCARDS}
        element={<IsLoginPR element={<IsBizPR element={<MyCardsPage />} />} />}
      ></Route>
      <Route path={ROUTES.CREATECARD} element={<CreateCard />} />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <IsLoginPR
            element={
              <IsBizPR element={<IsAdminPR element={<SandBoxPage />} />} />
            }
          />
        }
      />
      <Route path={ROUTES.CARDSPECIFICATION} element={<CardSpecification />} />
      <Route path={ROUTES.CARDEDIT} element={<CardEdit />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
