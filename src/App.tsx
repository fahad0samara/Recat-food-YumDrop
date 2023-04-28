import {Link} from "react-router-dom";
import Swiper from "./Swiper";
import SVGComponent from "./SVg/SVGComponent";
import SVGComponent0 from "./SVg/SVGComponent0";
const App = () => {
  return (
    <>
      <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center">
        <a
          href="#"
          className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="mr-2 text-4xl text-green-500">20</span>
          the future
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          fff
        </label>
        <nav
          aria-label="Header Navigation"
          className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="font-bold md:mr-12">
              <a href="#">Home</a>
            </li>
            <li className="md:mr-12">
              <a href="#">Menu</a>
            </li>
            <li className="md:mr-12">
              <a href="#">About Us</a>
            </li>
            <li className="md:mr-12">
              <button className="rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div
        className="relative  pt-10 mx-7
 
        md:pt-16 lg:pt-8 lg:pb-14 lg:px-8

      
      "
      >
        <div className="grid md:grid-cols-2">
          <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
            <div className="mb-6 max-w-xl mt-20">
              <div>
                <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-green-200 px-3 py-px text-sm font-semibold tracking-wider text-green-900">
                  Taste the World
                </p>
              </div>
              <h2 className="mb-6 max-w-lg font-sans text-xl font-bold tracking-tight sm:text-4xl sm:leading-snug">
                The #1 Food Marketplace <br />
                in
                <span className="inline-block text-green-500 ml-3">
                  the World
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Craving something delicious? Look no further! With Taste the
                World, you can find restaurants, food trucks, and more in your
                area. We have over
                <span className="relative inline-flex justify-center whitespace-nowrap font-bold mx-2">
                  <SVGComponent />
                  100,000
                </span>
                restaurants in over 100 countries around the world.{" "}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
              <Link
                to="/ Order"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green-500 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-green-400 focus:ring sm:w-auto"
              >
                <span className="relative inline-flex justify-center whitespace-nowrap font-bold mx-2">
                  <SVGComponent0 />
                  Order Now
                </span>
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-green-500 px-4 font-semibold text-green-600 transition-colors duration-200 hover:border-y-green-400 hover:text-green-400 sm:w-auto"
              >
                View Our Menu
              </Link>
            </div>
          </div>
          <div className=" hidden md:flex items-center justify-start -mt-10">
            <Swiper />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
