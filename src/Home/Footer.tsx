// import {Link} from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-b from-green-400 to-green-500 rounded-lg shadow-lg p-8 relative">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 1440 320"
//         className="absolute bottom-0 left-0 right-0"
//       >
//         <path
//           fill="#fff"
//           d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,240C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//         ></path>
//       </svg>
//       <div className="max-w-screen-xl mx-auto relative z-10">
//         <div className="flex items-center justify-between mb-8">
//           <Link to="/" className="flex items-center">
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="h-8 mr-3"
//               alt="Flowbite Logo"
//             />
//             <span className="text-xl font-semibold text-white">
//               Taste the World
//             </span>
//           </Link>
//           <ul className="flex flex-wrap items-center space-x-4 text-sm font-medium text-gray-800">
//             <li>
//               <Link to="/" className="hover:underline">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 Menu
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <hr className="border-green-50 mb-8" />

//         <div className="flex justify-center mt-8">
//           <span className="text-gray-800">
//             © 2023{" "}
//             <Link to="/" className="hover:underline text-blue-700">
//               Taste the World
//             </Link>
//             . All Rights Reserved.
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-400 to-green-500 rounded-lg shadow-lg p-8 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 right-0"
      >
        <path
          fill="#fff"
          d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,240C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="text-xl font-semibold text-white">
              Taste the World
            </span>
          </Link>
          <ul className="flex flex-wrap items-center space-x-4 text-sm font-medium text-gray-800">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-green-50 mb-8" />

        <div className="flex justify-center mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-12 w-12 text-green-100"
          >
            <path
              fill="currentColor"
              d="M372 64c0-35.346-28.654-64-64-64H88C52.654 0 24 28.654 24 64c0 6.627 5.373 12 12 12s12-5.373 12-12c0-23.196 18.804-42 42-42h220c23.196 0 42 18.804 42 42 0 6.627 5.373 12 12 12s12-5.373 12-12zm116 80H348c-5.523 0-10 4.477-10 10v180c0 39.701-32.299 72-72 72h-84c-39.701 0-72-32.299-72-72V154c0-5.523-4.477-10-10-10H24c-13.255 0-24 10.745-24 24v188c0 39.701 32.299 72 72 72h184c8.822 0 16 7.178 16 16s-7.178 16-16 16H72c-57.897 0-105-47.103-105-105V138c0-57.897 47.103-105 105-105h404c57.897 0 105 47.103 105 105v188c0 57.897-47.103 105-105 105z"
            />
          </svg>
          <span className="text-gray-800 ml-2">
            Explore the diverse flavors from around the world. Indulge in our
            delicious recipes and discover new culinary experiences. Bon
            appétit!
          </span>
        </div>
        <div className="flex justify-center mt-8">
          <span className="text-gray-800">
            © 2023{" "}
            <Link to="/" className="hover:underline text-blue-700">
              Taste the World
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
