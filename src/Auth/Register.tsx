import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register, UserData} from "../Redux/Auth/authThunks";
import {RootState} from "../Redux/store";
import {FaCheck, FaGoogle} from "react-icons/fa";
import {RiGitRepositoryPrivateFill} from "react-icons/ri";
import {RiUserFill} from "react-icons/ri";

import {MdAlternateEmail} from "react-icons/md";
import {AiOutlineWarning} from "react-icons/ai";
import {Link} from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    email: "",
    password: "",
    role: "user",
  });

  const dispatch = useDispatch();
  const {error, loading} = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    dispatch(register(formData) as any);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <section className="bg-white">
      <div className={"grid grid-cols-1 lg:grid-cols-2"}>
        <div
          className={
            "relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8"
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
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Discover Exquisite Cuisine <br className="hidden xl:block" />
                From Around the World
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Experience Delicious Flavors{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Wide Range of Menu Options{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Exquisite Culinary Creations{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
                    <FaCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Cozy and Welcoming Ambiance{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up to Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/Login"
                title=""
                className="font-medium text-green-600 transition-all duration-200 hover:text-green-700 focus:text-green-700 hover:underline"
              >
                Login
              </Link>
            </p>
            {error ? (
              <div className="mt-4">
                <div className="flex items-center justify-between w-full p-4 mb-4 text-sm font-bold text-white bg-red-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red">
                  <div className="flex items-center">
                    <AiOutlineWarning className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Fast & Last name{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiUserFill className="w-5 h-5" />
                    </div>

                    <input
                      type="text"
                      name="firstName"
                      id="full-name"
                      placeholder="Enter your full name"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MdAlternateEmail className="w-5 h-5" />
                    </div>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email to get started"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>

                    <a
                      href="#"
                      title=""
                      className="text-sm font-medium text-green-600 transition-all duration-200 hover:text-green-700 focus:text-green-700 hover:underline"
                    >
                      {" "}
                      Forgot password?{" "}
                    </a>
                  </div>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiGitRepositoryPrivateFill className="w-5 h-5" />
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-green-600 focus:bg-white caret-green-600"
                      required
                      onChange={handleChange}
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
                        <span>Signing up...</span>
                      </div>
                    ) : (
                      <span>Sign up</span>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <div className="absolute inset-y-0 left-0 p-4">
                  <FaGoogle className="w-6 h-6 text-rose-500" />
                </div>
                Sign in with Google
              </button>
            </div>
            <p className="mt-5 text-sm text-gray-600">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="#"
                title=""
                className="text-green-600 transition-all duration-200 hover:underline hover:text-green-700"
              >
                Privacy Policy
              </a>{" "}
              &
              <a
                href="#"
                title=""
                className="text-green-600 transition-all duration-200 hover:underline hover:text-green-700"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;


