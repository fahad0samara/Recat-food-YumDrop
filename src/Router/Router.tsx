import {Route, Routes} from "react-router-dom";
import NotFound from "../Home/NotFound";
import Hero from "../Home/Hero";
import Menu from "../Menu/Menu";
import Header from "../Home/Header";

const Router = (): JSX.Element => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Menu" element={<Menu />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
