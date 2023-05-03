import {Route, Routes} from "react-router-dom";
import Hero from "../Home/Hero";
import AddMenuItem from "../Menu/AddMenuItem";
import Menu from "../User/Menu";
import MenuItemsByCategory from "../User/MenuItemsByCategory";
import NotFound from "../Home/NotFound";
import Header from "../Home/Header";

const Router = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/AddMenuItem" element={<AddMenuItem />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categoryId" element={<MenuItemsByCategory />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
