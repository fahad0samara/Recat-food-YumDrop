import {Route, Routes} from "react-router-dom";
import Hero from "../Home/Hero";
import AddMenuItem from "../Menu/AddMenuItem";
import Menu from "../Home/Menu";
import MenuItemsByCategory from "../Home/MenuItemsByCategory";
import NotFound from "../Home/NotFound";
import Header from "../Home/Header";

const Router = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/Menuhh" element={<AddMenuItem />} /> */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:categoryId" element={<MenuItemsByCategory />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
