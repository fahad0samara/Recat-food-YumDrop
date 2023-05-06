import {Route, Routes} from "react-router-dom";
import Hero from "../Home/Hero";
import AddMenuItem from "../Menu/AddMenuItem";
import Menu from "../User/Menu";

import NotFound from "../Home/NotFound";
import Header from "../Home/Header";
import Register from "../Auth/Register";
import Login from "../Auth/Login";

const Router = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/AddMenuItem" element={<AddMenuItem />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categoryId" element={<Menu />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
