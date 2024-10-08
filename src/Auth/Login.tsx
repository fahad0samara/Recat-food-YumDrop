// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect } from "react";

import {useDispatch, useSelector} from "react-redux";

import {Link, useNavigate} from "react-router-dom";
import {
  FaCoffee,
  FaGoogle,
  FaHamburger,
  FaPepperHot,
  FaUtensils,
} from "react-icons/fa";
import {RiUserSettingsFill, RiGitRepositoryPrivateFill} from "react-icons/ri";
import {AiOutlineWarning} from "react-icons/ai";
import {login} from "../Redux/Auth/authThunks";
import { useDarkMode } from "../hook/useDarkMode";
import {clearError} from "../Redux/Auth/authSlice";
import { toast } from "react-toastify";

interface data {
  email: string;
  password: string;
}
const LoginForm = () => {
  const isDarkMode = useDarkMode();

  const [formData, setFormData] = useState<data>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated, error, loading, isAdmin} = useSelector(
    (state: any) => state.auth
  );

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    await dispatch(login(formData) as unknown);

    //remove the error after 5s
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/"); // Redirect admin to the admin dashboard
      } else {
        navigate("/Menu"); // Redirect regular user to the menu
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <section
      className={`bg-${isDarkMode ? "black" : "white"} text-${
        isDarkMode ? "white" : "gray-900"
      }`}
    >
      <div className={"grid grid-cols-1 lg:grid-cols-2"}>
        <div
          className={
            "relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 0 sm:px-6 lg:px-8"
          }
        >
          <div className="absolute inset-0">
            <img
              className="object-cover object-top w-full h-full"
              src="https://images.unsplash.com/photo-1518675219903-c682c4b16b1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div
              className={
                "w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl"
              }
            >
              <h3 className="text-4xl font-bold text-white">
                Welcome back
                <br className={"hidden xl:block"} />
                Discover a Variety of Mouthwatering Cuisines
              </h3>

              <ul
                className={
                  "grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4"
                }
              >
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaUtensils className={"w-3.5 h-3.5 text-white"} />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Experience New and Exciting Flavors{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaHamburger className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Enjoy a Wide Range of Menu Choices{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaPepperHot className={"w-3.5 h-3.5 text-white"} />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Savor the Spicy and Tasty Delights{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaCoffee className={"w-3.5 h-3.5 text-white"} />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Relax and Unwind in a Cozy Atmosphere{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={
            "flex items-center justify-center px-4 py-10 h-screen  sm:px-6 lg:px-8 sm:py-16 lg:py-24"
          }
        >
          <div className={"xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto"}>
            <h2 className={"text-3xl font-bold leading-tight  sm:text-4xl"}>
              Sign in to your account
            </h2>
            <p
              className={`
            text-${isDarkMode ? "gray-400/20" : "gray-500"} mt-4 text-base`}
            >
              Don’t have an account?{" "}
              <Link
                to="/Register"
                title=""
                className={
                  "font-medium text-green-500 transition-all duration-200 hover:text-green-700 focus:text-green-700 hover:underline"
                }
              >
                Create a free account
              </Link>
            </p>
            {error && (
              <div className="mt-4">
                <div className="flex items-center justify-between w-full p-4 mb-4 text-sm font-bold text-white bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red">
                  <div className="flex items-center">
                    <AiOutlineWarning className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    className={`text-${
                      isDarkMode ? "gray-300" : "gray-900"
                    } text-base font-medium`}
                    htmlFor="email"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div
                    className={
                      "mt-2.5 relative text-gray-400 focus-within:text-gray-600"
                    }
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiUserSettingsFill className="w-5 h-5" />
                    </div>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      placeholder="Enter email to get started"
                      className={
                        "block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className={`text-${
                        isDarkMode ? "gray-300" : "gray-900"
                      } text-base font-medium`}
                    >
                      {" "}
                      Password{" "}
                    </label>

                    <a
                      href="#"
                      title=""
                      className={`text-sm font-medium text-green-500 transition-all duration-200 hover:text-green-500
                        focus:text-green-500 hover:underline`}
                    >
                      {" "}
                      Forgot password?{" "}
                    </a>
                  </div>
                  <div
                    className={
                      "mt-2.5 relative text-gray-400 focus-within:text-gray-600"
                    }
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiGitRepositoryPrivateFill className="w-5 h-5" />
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={
                        "block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                      }
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-green-300 to-green-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 mr-2 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </button>
                </div>
              </div>
            </form>

       
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
