import {Link} from "react-router-dom";
import Swiper from "./Swiper";
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

      <div className="relative mx-auto  pt-10 sm:max-w-xl md:max-w-full px-14">
        <div className="grid grid-cols-2">
          <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
            <div className="mb-6 max-w-xl">
              <div>
                <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-green-200 px-3 py-px text-sm font-semibold tracking-wider text-green-900">
                  Taste the World
                </p>
              </div>
              <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
                The #1 Food Marketplace <br />
                in
                <span className="inline-block text-green-500">the World</span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Craving something delicious? Look no further! With Taste the
                World, you can find restaurants, food trucks, and more in your
                area. We have over 100,000 restaurants in over 100 countries
                around the world.{" "}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
              <Link
                to="/ Order"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green-500 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-green-400 focus:ring sm:w-auto"
              >
                Order Now{" "}
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-green-500 px-4 font-semibold text-green-600 transition-colors duration-200 hover:border-y-green-400 hover:text-green-400 sm:w-auto"
              >
                View Our Menu
              </Link>
            </div>

            <div className="mt-6 flex justify-center -space-x-4 lg:justify-start">
              <img
                alt="aa"
                className="h-12 w-12 rounded-full ring ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
              <img
                alt="aa"
                className="h-12 w-12 rounded-full ring ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
              <img
                alt="aa"
                className="h-12 w-12 rounded-full ring ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              />
              <div className="">
                <span className="pl-8 font-semibold">Customer Reviews</span>
                <div className="flex w-auto items-center justify-center space-x-1 pl-8">
                  <svg
                    className="h-auto w-5 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-400">
                    {" "}
                    4.9 •{" "}
                    <a href="#" className="text-sm font-normal underline">
                      129 reviews
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-44">
            <Swiper />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
