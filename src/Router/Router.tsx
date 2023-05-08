import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Hero from "../Home/Hero";
import AddMenuItem from "../Menu/AddMenuItem";
import Menu from "../User/Menu";
import NotFound from "../Home/NotFound";
import Header from "../Home/Header";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Dashboard from "../Home/Dashboard";

const Router = (): JSX.Element => {
  const {error, loading, isAuthenticated, isAdmin} = useSelector(
    (state: any) => state.auth
  );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />

        {isAuthenticated && (
          <>
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:categoryId" element={<Menu />} />
          </>
        )}

        {isAuthenticated && isAdmin && (
          <Route path="/AddMenuItem" element={<AddMenuItem />} />
        )}

        <Route
          path="*"
          element={isAuthenticated ? <NotFound /> : <Navigate to="/Login" />}
        />
      </Routes>
    </>
  );
};

export default Router;
