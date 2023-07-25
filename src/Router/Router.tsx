import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {lazy, Suspense} from "react";
import NotFound from "../Home/NotFound";
import Header from "../Home/Header";

const Hero = lazy(() => import("../Home/Hero"));
const AddMenuItem = lazy(() => import("../Menu/AddMenuItem"));
const Menu = lazy(() => import("../User/Menu"));
const Register = lazy(() => import("../Auth/Register"));
const Login = lazy(() => import("../Auth/Login"));
const Cart = lazy(() => import("../User/Cart/Cart"));
const Success = lazy(() => import("../User/Cart/Success"));
const Checkout = lazy(() => import("../User/Cart/Checkout"));

interface RootState {
  auth: {
    error: any;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
  };
}

const Router = (): JSX.Element => {
  const { isAuthenticated, isAdmin} = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  const shouldShowHeader = !(
    location.pathname === "/Login" || location.pathname === "/Register"
  );

  return (
    <>
      {shouldShowHeader && <Header />}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          {isAuthenticated && (
            <>
              <Route path="/Checkout" element={<Checkout totalPrice={0} />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/success" element={<Success />} />
              <Route path="/menu/:categoryId" element={<Menu />} />
            </>
          )}

          {isAuthenticated && isAdmin && (
            <Route path="/AddMenuItem" element={<AddMenuItem />} />
          )}

          <Route
            path="*"
            element={
              isAuthenticated ? <NotFound /> : <Navigate to="/Login" replace />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
